import { getStudio } from "@/lib/cms";
import { Reveal } from "@/components/primitives/Reveal";
import { CardOutline } from "@/components/home/CardOutline";
import { cn } from "@/lib/cn";

/**
 * Trusted by — the real client roster grouped by sector into a bento grid
 * (reference layout: centered pill + title, then asymmetric tinted cards).
 */
type Card = {
  key: string;
  title: string;
  desc: string;
  clients: string[];
  span: string;
  big?: boolean;
  wide?: boolean;
};

const CARDS: Card[] = [
  {
    key: "retail",
    title: "Quick-commerce & retail",
    desc: "Dark stores, flagship retail and fast-moving brand environments, rolled out at pace across cities.",
    clients: ["Swiggy", "Zepto", "Urban Company", "Croma", "FirstCry", "Eatigo", "Akasa", "Boomlet"],
    span: "md:col-span-6",
    big: true,
  },
  {
    key: "finance",
    title: "Banking & finance",
    desc: "Corporate floors and branch experiences for banks and fintechs.",
    clients: ["IDFC First Bank", "Capital First Bank", "Fedbank", "Policy Bazaar", "PB Partners"],
    span: "md:col-span-3",
  },
  {
    key: "industrial",
    title: "Industrial & manufacturing",
    desc: "Plants, facilities and offices for makers and engineers.",
    clients: ["CEAT", "Hero Electric", "Sun Petrochemicals", "Reynaers Aluminium", "Insecticides India", "Umicore"],
    span: "md:col-span-3",
  },
  {
    key: "media",
    title: "Media & research",
    desc: "Studios, cinemas and analyst floors.",
    clients: ["UFO Digital Cinema", "Ipsos", "TimesPro", "Startek"],
    span: "md:col-span-3",
  },
  {
    key: "global",
    title: "Global & logistics",
    desc: "Cross-border offices and consultancies.",
    clients: ["Nippon Express", "Air Arabia", "TOTO", "Osource Global", "Semac Consultants", "Fox Mandal"],
    span: "md:col-span-3",
  },
  {
    key: "realestate",
    title: "Developers & real estate",
    desc: "Residential towers and landmark developments across the city.",
    clients: ["Swastik Developers", "Advait Developers", "Kushal Landmark"],
    span: "md:col-span-6",
    wide: true,
  },
];

export function Recognition() {
  const { accreditations } = getStudio();

  return (
    <section className="bg-stone">
      <div className="shell-wide py-section">
        {/* Header — centered pill + title */}
        <Reveal className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-mount px-4 py-1.5 font-mono text-2xs uppercase tracking-label text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-ink/60" aria-hidden="true" />
            Trusted by
          </span>
          <h2 className="mt-7 font-display text-[clamp(2rem,5.2vw,3.6rem)] font-light leading-[1.02] tracking-tight">
            Trusted across India.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted">
            Homes and workspaces delivered for families, founders and established institutions — 75+ clients, since 2008.
          </p>
        </Reveal>

        {/* Bento grid */}
        <div className="mt-14 grid grid-cols-1 gap-3 md:mt-16 md:grid-cols-12 md:gap-4">
          {CARDS.map((c, i) => (
            <Reveal
              key={c.key}
              delay={(i % 3) * 0.06}
              className={cn(
                "group relative flex flex-col rounded-card p-6 md:p-7",
                c.span,
              )}
            >
              <CardOutline delay={(i % 3) * 0.06} />
              <div className="relative flex h-full flex-col">
                <h3 className={cn("font-display tracking-tight text-ink", c.big ? "text-xl md:text-2xl" : "text-lg md:text-xl")}>
                  {c.title}
                </h3>
                <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink/70">{c.desc}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {c.clients.map((n) => (
                    <span
                      key={n}
                      className="rounded-full border border-hairline bg-paper/60 px-3 py-1.5 font-mono text-2xs uppercase tracking-label text-ink/80 transition-colors duration-300 group-hover:text-ink"
                    >
                      {n}
                    </span>
                  ))}
                </div>

                {c.wide && (
                  <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-hairline pt-6 md:pt-7">
                    <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">Accredited</span>
                    {accreditations.map((a) => (
                      <span key={a} className="font-display text-lg tracking-tight text-ink/65 md:text-xl">
                        {a}
                      </span>
                    ))}
                    <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">
                      · IGBC &amp; USGBC Platinum / Gold
                    </span>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
