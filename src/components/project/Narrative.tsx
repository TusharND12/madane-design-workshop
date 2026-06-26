import type { Project } from "@/lib/schema";
import { Bracket } from "@/components/primitives/Bracket";
import { Reveal } from "@/components/primitives/Reveal";

/**
 * Overview, the architecture-studio case-study header: an oversized concept
 * statement and supporting narrative on the left, a sticky specification table
 * on the right.
 */
export function Narrative({ project }: { project: Project }) {
  const blocks = [
    { label: "The site", body: project.narrative.site },
    { label: "The response", body: project.narrative.response },
  ];

  const specs: { label: string; value: React.ReactNode }[] = [
    { label: "Discipline", value: project.type },
    { label: "Location", value: project.location },
    { label: "Year", value: project.year },
    { label: "Area", value: project.area },
    { label: "Status", value: project.status },
    ...(project.client ? [{ label: "Client", value: project.client }] : []),
    { label: "Scope", value: project.scope.join(", ") },
    { label: "Services", value: project.services.join(" · ") },
  ].filter((s) => s.value !== "" && s.value !== null && s.value !== undefined);

  return (
    <section className="bg-paper">
      <div className="shell-wide grid gap-12 py-section md:grid-cols-12 md:gap-x-10">
        {/* Concept + narrative */}
        <div className="md:col-span-7">
          <Bracket>Overview</Bracket>
          <Reveal>
            <p className="mt-8 max-w-[20ch] font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-light leading-[1.05] tracking-tight">
              {project.narrative.brief}
            </p>
          </Reveal>

          <div className="mt-12 flex flex-col gap-9 md:mt-16">
            {blocks.map((b, i) => (
              <Reveal key={b.label} delay={i * 0.06} className="border-t border-hairline pt-6">
                <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">{b.label}</span>
                <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-muted md:text-lead md:leading-relaxed">
                  {b.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Sticky spec table */}
        <div className="md:col-span-4 md:col-start-9">
          <Reveal className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
            <dl className="rounded-card border border-hairline bg-mount p-6 md:p-7">
              <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">Project facts</span>
              <div className="mt-5">
                {specs.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-baseline justify-between gap-4 border-t border-hairline py-3.5 first:border-t-0 first:pt-0"
                  >
                    <dt className="shrink-0 font-mono text-2xs uppercase tracking-label text-ink-muted">{s.label}</dt>
                    <dd className="text-right text-sm leading-snug text-ink">{s.value}</dd>
                  </div>
                ))}
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
