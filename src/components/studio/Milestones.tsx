import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Reveal } from "@/components/primitives/Reveal";

type Milestone = { year: string; body: string };

/** A quiet practice timeline (PRD §8.4 milestones/recognition). */
export function Milestones({ items }: { items: Milestone[] }) {
  return (
    <section className="bg-stone/50">
      <div className="shell-wide grid gap-12 py-section md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <SectionHeader index="03" label="Timeline" title="Eleven years, quietly." />
        </div>
        <ol className="md:col-span-7 md:col-start-6">
          {items.map((m, i) => (
            <Reveal as="li" key={m.year} delay={i * 0.05} className="grid grid-cols-[5rem_1fr] gap-6 border-t border-ink/10 py-7">
              <span className="font-mono text-2xs tracking-label text-ink-muted">{m.year}</span>
              <p className="max-w-prose text-lead font-light leading-relaxed">{m.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
