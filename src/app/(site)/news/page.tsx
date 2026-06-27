import type { Metadata } from "next";
import { getStudio } from "@/lib/cms";
import { PageIntro } from "@/components/common/PageIntro";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Reveal } from "@/components/primitives/Reveal";
import { EnquiryBand } from "@/components/common/EnquiryBand";

export const metadata: Metadata = {
  title: "News",
  description:
    "News from Madane Design Workshop — milestones, recognition and notes from the studio across architecture, interiors and turnkey work.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  const studio = getStudio();

  return (
    <>
      <PageIntro
        label="News"
        title="From the studio."
        lead="Milestones, recognition and the occasional note from the workshop."
      />

      <section className="bg-paper">
        <div className="shell-wide pb-section">
          <SectionHeader index="01" label="Timeline" title="How the practice has grown." />
          <ol className="mt-12 border-t border-hairline">
            {studio.milestones.map((m, i) => (
              <Reveal as="li" key={m.year} delay={(i % 4) * 0.05} className="grid grid-cols-1 gap-3 border-b border-hairline py-8 md:grid-cols-12 md:gap-8">
                <span className="font-display text-3xl leading-none tracking-tight text-ink/70 md:col-span-3 md:text-4xl">{m.year}</span>
                <p className="max-w-prose text-base leading-relaxed text-ink-muted md:col-span-9 md:text-lead md:leading-relaxed">{m.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-stone/40">
        <div className="shell-wide py-section">
          <SectionHeader index="02" label="Recognition" title="Accredited, and trusted." />
          <Reveal className="mt-12 flex flex-wrap items-center gap-x-12 gap-y-5 border-t border-hairline pt-8">
            {studio.accreditations.map((a) => (
              <span key={a} className="font-display text-xl tracking-tight text-ink/65 md:text-2xl">{a}</span>
            ))}
          </Reveal>
        </div>
      </section>

      <EnquiryBand headline="Want to be our next story?" />
    </>
  );
}
