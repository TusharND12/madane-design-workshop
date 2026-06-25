import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SORTED = path.join(ROOT, "MADANE_SORTED", "MADANE_SORTED");
const JSON_PATH = path.join(SORTED, "_CATALOG", "projects.json");
const CAT_DIR = { "commercial-interior": "01_COMMERCIAL_INTERIORS", architecture: "02_ARCHITECTURE" };
const OUT_ASSETS = path.join(ROOT, "public", "assets", "projects");
const OUT_TS = path.join(ROOT, "src", "content", "projects.ts");

const data = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const RHYTHM = ["full", "half", "half", "wide", "half", "tall", "half", "wide", "full"];

// The 10 strongest, per the master catalogue, get featured on the home showcase.
const FEATURED = new Set([
  "rudra-villa",
  "sun-petrochemicals-pvt-ltd-corporate-office",
  "akasa-kolkata",
  "semac-consultants-pvt-ltd-office",
  "john-cockerill-office-aurum-parc-ghansoli",
  "kushal-wallstreet",
  "lodha-1-office",
  "raymond-office",
  "hero-electric-manufacturing-facility",
  "ufo-moviez-cinema-complex",
]);

// Plan-only / no usable hero — skip per catalogue §5.
const SKIP_FOLDERS = new Set(["FARMHOUSE_SANGLI", "GROVER_RESIDENCE_CALIFORNIA", "SHARMA_ LONAVALA"]);

const STATES = new Set([
  "maharashtra", "punjab", "karnataka", "gujarat", "odisha", "telangana", "haryana",
  "delhi", "kerala", "tamil nadu", "west bengal", "rajasthan", "goa", "usa", "california",
  "uttar pradesh", "madhya pradesh", "andhra pradesh", "bihar", "jharkhand", "uttarakhand",
]);

function cityFrom(location) {
  if (!location) return "India";
  let t = location.trim().replace(/\s*\(.*?\)\s*/g, ""); // drop parentheticals
  if (t === "—" || t === "-" || t === "") return "India";
  if (!t.includes(",")) return t;
  const parts = t.split(",").map((s) => s.trim());
  const last = parts[parts.length - 1];
  // "City, State" → the city is the first token; "Locality, City" → the last.
  if (STATES.has(last.toLowerCase())) return parts[0];
  return last;
}

function scopeArray(scope) {
  if (!scope) return ["Design"];
  return scope
    .split(/—|,|—/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .slice(0, 5);
}

function servicesFor(type, scope, status) {
  const txt = `${scope} ${status}`.toLowerCase();
  const out = [type];
  if (txt.includes("turnkey") || txt.includes("design-build") || txt.includes("fit-out") || txt.includes("build"))
    out.push("Turnkey");
  if (type === "Architecture" && (txt.includes("interior") || txt.includes("villa") || txt.includes("residence")))
    out.push("Interior");
  return [...new Set(out)];
}

const esc = (s) => String(s ?? "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');

fs.rmSync(OUT_ASSETS, { recursive: true, force: true });
fs.mkdirSync(OUT_ASSETS, { recursive: true });

const records = [];
let copied = 0;

for (const p of data) {
  if (SKIP_FOLDERS.has(p.folder)) continue;
  const type = p.category === "architecture" ? "Architecture" : "Interior";
  const slug = slugify(p.displayName);
  const srcDir = path.join(SORTED, CAT_DIR[p.category], p.folder);
  const destDir = path.join(OUT_ASSETS, slug);
  fs.mkdirSync(destDir, { recursive: true });

  const copy = (file, destName) => {
    const from = path.join(srcDir, file);
    if (!fs.existsSync(from)) return null;
    fs.copyFileSync(from, path.join(destDir, destName));
    copied++;
    return `/assets/projects/${slug}/${destName}`;
  };

  // Cover
  const coverSrc = copy(p.heroImage, "cover.jpg");
  if (!coverSrc) {
    // no hero on disk — skip the project entirely
    fs.rmSync(destDir, { recursive: true, force: true });
    continue;
  }
  const coverMeta = (p.images || []).find((im) => im.file === p.heroImage);

  // Gallery: top picks first, then remaining web-ready, excluding the hero.
  const order = [...new Set([...(p.topPicks || []), ...(p.images || []).filter((im) => im.webReady).map((im) => im.file)])];
  const galleryFiles = order.filter((f) => f !== p.heroImage);
  const gallery = [];
  let gi = 0;
  for (const f of galleryFiles) {
    if (gi >= 10) break;
    const meta = (p.images || []).find((im) => im.file === f);
    const dest = copy(f, `g${String(gi + 1).padStart(2, "0")}.jpg`);
    if (!dest) continue;
    gallery.push({
      src: dest,
      alt: meta?.caption || `${p.displayName} — ${meta?.space || "interior"}.`,
      span: RHYTHM[gi % RHYTHM.length],
    });
    gi++;
  }

  const name = p.displayName.replace(/—/g, "—");
  const city = cityFrom(p.location);
  const location = p.location && p.location !== "—" ? p.location : (p.category === "architecture" ? "India" : "India");
  const sector = p.sector ? p.sector.charAt(0).toUpperCase() + p.sector.slice(1) : "";
  const site =
    `${sector ? sector + " commission" : "A commission"}` +
    `${p.location && p.location !== "—" ? ` in ${p.location}` : ""}. ${p.status}.`;

  records.push({
    slug,
    name,
    type,
    client: p.client || undefined,
    location,
    city,
    area: p.area || "—",
    status: p.status || "Design / visualization",
    scope: scopeArray(p.scope),
    services: servicesFor(type, p.scope, p.status),
    cover: coverSrc,
    coverAlt: coverMeta?.caption || `${name} — ${type} by Madane Design Workshop.`,
    screenVideo: FEATURED.has(slug) && type !== "Architecture" ? undefined : undefined,
    brief: p.oneLiner || "",
    site,
    response: p.description || p.oneLiner || "",
    gallery,
    featured: FEATURED.has(slug),
    sector,
  });
}

// Stable order: featured first (in catalogue strength order), then the rest.
const featuredOrder = [
  "rudra-villa",
  "sun-petrochemicals-pvt-ltd-corporate-office",
  "akasa-kolkata",
  "semac-consultants-pvt-ltd-office",
  "john-cockerill-office-aurum-parc-ghansoli",
  "kushal-wallstreet",
  "lodha-1-office",
  "raymond-office",
  "hero-electric-manufacturing-facility",
  "ufo-moviez-cinema-complex",
];
records.sort((a, b) => {
  const ai = featuredOrder.indexOf(a.slug);
  const bi = featuredOrder.indexOf(b.slug);
  if (ai !== -1 || bi !== -1) return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  return a.name.localeCompare(b.name);
});

// Lead featured project gets the studio reel on the device showcase screen.
const lead = records.find((r) => r.featured);
if (lead) lead.screenVideo = "/assets/video/homepage-hero.mp4";

// Placeholder years — NOT in source data; spread plausibly, confirm with studio.
records.forEach((r, i) => {
  r.year = 2025 - (i % 9);
});

function tsLiteral(r) {
  const galleryStr = r.gallery
    .map((g) => `      { src: "${esc(g.src)}", alt: "${esc(g.alt)}", span: "${g.span}" },`)
    .join("\n");
  return `  {
    slug: "${esc(r.slug)}",
    name: "${esc(r.name)}",
    type: "${r.type}",${r.client ? `\n    client: "${esc(r.client)}",` : ""}
    location: "${esc(r.location)}",
    city: "${esc(r.city)}",
    year: ${r.year},
    area: "${esc(r.area)}",
    status: "${esc(r.status)}",
    scope: [${r.scope.map((s) => `"${esc(s)}"`).join(", ")}],
    services: [${r.services.map((s) => `"${s}"`).join(", ")}],
    cover: "${esc(r.cover)}",
    coverAlt: "${esc(r.coverAlt)}",${r.screenVideo ? `\n    screenVideo: "${esc(r.screenVideo)}",` : ""}
    narrative: {
      brief: "${esc(r.brief)}",
      site: "${esc(r.site)}",
      response: "${esc(r.response)}",
    },
    gallery: [
${galleryStr}
    ],
    featured: ${r.featured},
    order: ${r.order ?? 0},
    seo: { title: "${esc(r.name)} — ${r.type}", description: "${esc(r.brief.slice(0, 155))}" },
  },`;
}

records.forEach((r, i) => (r.order = i));

const header = `import type { Project } from "@/lib/schema";

/**
 * Real Madane Design Workshop portfolio — generated from the studio's project
 * catalogue (MADANE_SORTED/_CATALOG/projects.json). Images live under
 * /public/assets/projects/<slug>/. NOTE: \`year\` is a placeholder spread (not
 * present in the source data) — confirm with the studio before publishing.
 */
export const projects: Project[] = [
`;

fs.writeFileSync(OUT_TS, header + records.map(tsLiteral).join("\n") + "\n];\n", "utf8");

console.log(`Projects: ${records.length}`);
console.log(`Images copied: ${copied}`);
console.log(`Featured: ${records.filter((r) => r.featured).length}`);
