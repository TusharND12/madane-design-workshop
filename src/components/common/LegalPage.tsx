import { PageIntro } from "@/components/common/PageIntro";
import { Reveal } from "@/components/primitives/Reveal";
import { EnquiryBand } from "@/components/common/EnquiryBand";

export type LegalSection = { heading: string; body: string[] };

/** Shared template for privacy / terms, inherits the design system (PRD §8.9). */
export function LegalPage({ label, title, updated, sections }: { label: string; title: string; updated: string; sections: LegalSection[] }) {
  return (
    <>
      <PageIntro label={label} title={title} meta={`Last updated · ${updated}`} />
      <section className="bg-paper">
        <div className="shell-wide grid gap-8 pb-section md:grid-cols-12">
          <div className="flex flex-col gap-12 md:col-span-8 md:col-start-3">
            {sections.map((s, i) => (
              <Reveal key={s.heading} delay={i * 0.03} className="border-t border-hairline pt-6">
                <h2 className="font-display text-2xl tracking-tight">{s.heading}</h2>
                <div className="mt-4 flex flex-col gap-4">
                  {s.body.map((p, j) => (
                    <p key={j} className="max-w-prose text-base leading-relaxed text-ink-muted">{p}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <EnquiryBand headline="Questions about any of this? Just ask." />
    </>
  );
}
