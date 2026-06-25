import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Service, Project } from "@/lib/schema";
import { Bracket } from "@/components/primitives/Bracket";
import { Reveal } from "@/components/primitives/Reveal";
import { Button } from "@/components/primitives/Button";

/** Immersive per-service section, deep-linking to a filtered archive (PRD §8.5). */
export function ServiceSection({ service, projects, flip }: { service: Service; projects: Project[]; flip: boolean }) {
  return (
    <section id={service.slug} className="scroll-mt-[var(--header-h)] border-t border-hairline bg-paper">
      <div className="shell-wide py-section">
        <div className={cn("grid items-center gap-12 md:grid-cols-12 md:gap-8", flip && "md:[direction:rtl]")}>
          {/* Image */}
          <div className="md:col-span-6 md:[direction:ltr]">
            <Reveal className="relative aspect-[4/3] w-full overflow-hidden bg-mount">
              <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
              <span className="absolute left-5 top-5 font-mono text-2xs tracking-label text-ink mix-blend-difference">{service.index}</span>
            </Reveal>
          </div>

          {/* Copy */}
          <div className="md:col-span-5 md:col-start-8 md:[direction:ltr]">
            <Reveal>
              <Bracket>{service.title}</Bracket>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-3xl leading-tight tracking-tight md:text-4xl">{service.tagline}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-muted">{service.summary}</p>
            </Reveal>

            <Reveal delay={0.14} className="mt-8">
              <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">Includes</span>
              <ul className="mt-4 flex flex-wrap gap-2">
                {service.includes.map((inc) => (
                  <li key={inc} className="rounded-none border border-hairline px-3 py-1.5 text-xs text-ink-muted">{inc}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.18} className="mt-8 flex flex-col gap-2">
              <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">For whom</span>
              <p className="max-w-prose text-sm text-ink">{service.forWhom}</p>
            </Reveal>

            <Reveal delay={0.22} className="mt-10">
              <Button href={`/projects?type=${service.filterType}`} variant="tertiary" arrow>
                See {service.title.toLowerCase()} projects
              </Button>
            </Reveal>
          </div>
        </div>

        {/* Representative projects */}
        {projects.length > 0 && (
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-3">
            {projects.map((p) => (
              <Reveal key={p.slug}>
                <Link href={`/projects/${p.slug}`} data-cursor-view className="group block">
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-mount">
                    <Image src={p.cover} alt={p.coverAlt} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]" />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="font-display text-lead tracking-tight">{p.name}</span>
                    <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">{p.city}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
