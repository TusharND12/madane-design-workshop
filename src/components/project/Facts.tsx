import type { Project } from "@/lib/schema";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Reveal } from "@/components/primitives/Reveal";

/** Specification list (PRD P4). */
export function Facts({ project }: { project: Project }) {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Discipline", value: project.type },
    { label: "Location", value: project.location },
    { label: "Year", value: project.year },
    { label: "Area", value: project.area },
    { label: "Status", value: project.status },
    { label: "Scope", value: project.scope.join(", ") },
    { label: "Services", value: project.services.join(" · ") },
    ...(project.client ? [{ label: "Client", value: project.client }] : []),
  ].filter((r) => r.value !== "" && r.value !== null && r.value !== undefined);

  return (
    <section className="bg-sand/50">
      <div className="shell-wide grid gap-12 py-section md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <SectionHeader index="02" label="Facts" />
        </div>
        <dl className="md:col-span-7 md:col-start-6">
          {rows.map((r, i) => (
            <Reveal as="div" key={r.label} delay={i * 0.04} className="flex flex-col gap-2 border-t border-ink/10 py-5 sm:flex-row sm:items-baseline sm:justify-between">
              <dt className="font-mono text-2xs uppercase tracking-label text-ink-muted sm:w-40 sm:shrink-0">{r.label}</dt>
              <dd className="text-base text-ink sm:flex-1 sm:text-right">{r.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
