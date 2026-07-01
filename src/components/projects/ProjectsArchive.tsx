"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import type { Project, ProjectType } from "@/lib/schema";
import { EASE } from "@/lib/motion";
import { useProjectZoom, zoomClick } from "./ProjectZoom";

// A varied aspect cycle gives the grid a calm masonry rhythm without borders or
// chrome - images do all the talking (yodezeen.com/projects style).
const ASPECTS = ["4 / 3", "3 / 4", "1 / 1", "4 / 3", "3 / 4", "4 / 3", "1 / 1", "3 / 4"];

// Native <option>s can't take Tailwind classes; style them to the dark theme so
// the popup list stays legible.
const OPTION_STYLE: React.CSSProperties = { backgroundColor: "#181818", color: "#ECECE6" };

// Discipline filter: Architecture / Interior, and Interior's two sectors,
// Commercial / Residential (classified by category, not by the raw type field).
const RESIDENTIAL_CATEGORIES = new Set(["Residential", "Villas"]);
type Discipline = "All" | "Architecture" | "Interior";
type Kind = "All" | "Commercial" | "Residential";
const DISCIPLINE_KEYS: Discipline[] = ["All", "Architecture", "Interior"];
const KIND_KEYS: Kind[] = ["All", "Commercial", "Residential"];

export function ProjectsArchive({
  projects,
  locations,
  categories,
}: {
  projects: Project[];
  types: ProjectType[];
  locations: string[];
  categories: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const zoom = useProjectZoom();

  const [discipline, setDiscipline] = useState<Discipline>("All");
  const [kind, setKind] = useState<Kind>("All");
  const [location, setLocation] = useState<string | "All">("All");
  const [category, setCategory] = useState<string | "All">("All");

  useEffect(() => {
    const t = params.get("type") as Discipline | null;
    const k = params.get("kind") as Kind | null;
    const c = params.get("city") ?? "All";
    const s = params.get("sector") ?? "All";
    setDiscipline(t && DISCIPLINE_KEYS.includes(t) ? t : "All");
    setKind(k && KIND_KEYS.includes(k) ? k : "All");
    setLocation(locations.includes(c) ? c : "All");
    setCategory(categories.includes(s) ? s : "All");
  }, [params, locations, categories]);

  const sync = useCallback(
    (nd: Discipline, nk: Kind, nl: string | "All", nc: string | "All") => {
      const sp = new URLSearchParams();
      if (nd !== "All") sp.set("type", nd);
      if (nk !== "All") sp.set("kind", nk);
      if (nl !== "All") sp.set("city", nl);
      if (nc !== "All") sp.set("sector", nc);
      const qs = sp.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      if (typeof window !== "undefined") {
        const lenis = window.__lenis;
        if (lenis) lenis.scrollTo(0, { duration: 0.7 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [router, pathname]
  );

  const onDiscipline = (d: Discipline) => {
    setDiscipline(d);
    setKind("All"); // reset the Interior sub-filter whenever the discipline changes
    sync(d, "All", location, category);
  };
  const onKind = (k: Kind) => {
    setKind(k);
    sync(discipline, k, location, category);
  };
  const onLocation = (l: string | "All") => {
    setLocation(l);
    sync(discipline, kind, l, category);
  };
  const onCategory = (c: string | "All") => {
    setCategory(c);
    sync(discipline, kind, location, c);
  };

  // "Interior" covers any project with interior work (type OR services), so its
  // Residential sub-filter can surface villas/residences that are filed as
  // Architecture. Commercial/Residential are split by category.
  const isInterior = (p: Project) => p.type === "Interior" || (p.services?.includes("Interior") ?? false);
  const matchesFilters = (p: Project) => {
    if (discipline === "Architecture" && p.type !== "Architecture") return false;
    if (discipline === "Interior") {
      if (!isInterior(p)) return false;
      if (kind === "Commercial" && RESIDENTIAL_CATEGORIES.has(p.category)) return false;
      if (kind === "Residential" && !RESIDENTIAL_CATEGORIES.has(p.category)) return false;
    }
    if (location !== "All" && p.city !== location) return false;
    if (category !== "All" && p.category !== category) return false;
    return true;
  };

  const filtered = useMemo(
    () => projects.filter(matchesFilters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projects, discipline, kind, location, category]
  );

  const disciplineTab = (key: Discipline, label: string) => {
    const active = key === discipline;
    return (
      <button
        key={key}
        type="button"
        onClick={() => onDiscipline(key)}
        className={`relative pb-1.5 transition-colors duration-300 ${active ? "text-ink" : "text-ink-muted hover:text-ink"}`}
      >
        {label}
        {active && <motion.span layoutId="proj-tab" className="absolute inset-x-0 bottom-0 h-px bg-ink" />}
      </button>
    );
  };
  const kindTab = (key: Kind, label: string) => {
    const active = key === kind;
    return (
      <button
        key={key}
        type="button"
        onClick={() => onKind(key)}
        className={`relative pb-1.5 transition-colors duration-300 ${active ? "text-ink" : "text-ink-muted hover:text-ink"}`}
      >
        {label}
        {active && <motion.span layoutId="proj-kind" className="absolute inset-x-0 bottom-0 h-px bg-ink" />}
      </button>
    );
  };

  return (
    <div className="w-full pb-section">
      {/* Filter band - discipline tabs on the left, sector/city dropdowns on the right */}
      <div className="border-y border-hairline">
        <div className="shell-wide flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4 font-mono text-2xs uppercase tracking-label">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {disciplineTab("All", "All")}
            {disciplineTab("Architecture", "Architecture")}
            {disciplineTab("Interior", "Interior")}
            {discipline === "Interior" && (
              <>
                <span className="h-3 w-px bg-hairline" aria-hidden="true" />
                {kindTab("Commercial", "Commercial")}
                {kindTab("Residential", "Residential")}
              </>
            )}
          </div>
          <div className="flex items-center gap-x-7 gap-y-3">
            <Select allLabel="All sectors" value={category} options={categories} onChange={onCategory} ariaLabel="Filter by sector" />
            <Select allLabel="All cities" value={location} options={locations} onChange={onLocation} ariaLabel="Filter by city" />
          </div>
        </div>
      </div>

      {/* Clean masonry gallery */}
      <div className="px-3">
      {filtered.length === 0 ? (
        <p className="mt-20 text-center font-display text-2xl tracking-tight text-ink-muted">Nothing here yet.</p>
      ) : (
        <motion.div
          key={`${discipline}-${kind}-${location}-${category}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-10 columns-1 gap-3 sm:columns-2 lg:columns-3 xl:columns-4"
        >
          {filtered.map((p, i) => (
            <GalleryCard
              key={p.slug}
              project={p}
              aspect={ASPECTS[i % ASPECTS.length]}
              priority={i < 6}
              onOpen={zoom?.open}
            />
          ))}
        </motion.div>
      )}
      </div>
    </div>
  );
}

function Select({
  allLabel,
  value,
  options,
  onChange,
  ariaLabel,
}: {
  allLabel: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  ariaLabel: string;
}) {
  const active = value !== "All";
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        style={{ colorScheme: "dark" }}
        className={`max-w-[11rem] cursor-pointer appearance-none truncate bg-transparent pr-5 font-mono text-2xs uppercase tracking-label outline-none transition-colors duration-300 hover:text-ink focus:text-ink ${active ? "text-ink" : "text-ink-muted"}`}
      >
        <option value="All" style={OPTION_STYLE}>
          {allLabel}
        </option>
        {options.map((o) => (
          <option key={o} value={o} style={OPTION_STYLE}>
            {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[0.6rem] text-ink-muted" aria-hidden="true">
        ↓
      </span>
    </div>
  );
}

function GalleryCard({
  project,
  aspect,
  priority,
  onOpen,
}: {
  project: Project;
  aspect: string;
  priority: boolean;
  onOpen?: (a: { href: string; src: string; alt: string; rect: DOMRect }) => void;
}) {
  const imgRef = useRef<HTMLDivElement>(null);

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`${project.name}, ${project.type}, ${project.city}`}
      onClick={(e) => zoomClick(e, onOpen, project, imgRef.current)}
      className="group mb-3 block break-inside-avoid overflow-hidden bg-mount"
    >
      <div ref={imgRef} className="relative w-full overflow-hidden" style={{ aspectRatio: aspect }}>
        <Image
          src={project.gridCover ?? project.cover}
          alt={project.coverAlt}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
          priority={priority}
          className="object-cover transition-transform duration-[1.2s] ease-editorial group-hover:scale-[1.04]"
        />
        {/* Name reveals on hover - no permanent chrome */}
        <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="p-5">
            <h3 className="font-display text-lg leading-tight tracking-tight text-white md:text-xl">{project.name}</h3>
            <p className="mt-1 font-mono text-2xs uppercase tracking-label text-white/70">
              {project.type} · {project.city}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
