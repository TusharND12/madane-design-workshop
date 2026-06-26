import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/schema";
import { Bracket } from "@/components/primitives/Bracket";
import { Reveal } from "@/components/primitives/Reveal";
import { Button } from "@/components/primitives/Button";

/** Immersive per-service section, deep-linking to a filtered archive (PRD §8.5). */
export function ServiceSection({ service, flip }: { service: Service; flip: boolean }) {
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
      </div>
    </section>
  );
}
