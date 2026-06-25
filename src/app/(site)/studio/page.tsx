import type { Metadata } from "next";
import Image from "next/image";
import { getStudio, getTeam } from "@/lib/cms";
import { PageIntro } from "@/components/common/PageIntro";
import { Reveal } from "@/components/primitives/Reveal";
import { Bracket } from "@/components/primitives/Bracket";
import { TeamGrid } from "@/components/studio/TeamGrid";
import { Milestones } from "@/components/studio/Milestones";
import { EnquiryBand } from "@/components/common/EnquiryBand";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Madane Design Workshop is a studio of architecture, interiors and turnkey delivery — quiet on purpose, exacting by habit. Our philosophy, people and practice.",
  alternates: { canonical: "/studio" },
};

export default function StudioPage() {
  const studio = getStudio();
  const team = getTeam();

  return (
    <>
      <PageIntro label="Studio · About" title="The frame that disappears." lead={studio.philosophyLead} />

      {/* Philosophy long-form */}
      <section className="bg-paper">
        <div className="shell-wide grid gap-12 pb-section md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Bracket>Philosophy</Bracket>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <div className="flex flex-col gap-8">
              {studio.philosophy.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className={i === 0 ? "max-w-prose font-display text-2xl leading-[1.3] tracking-tight md:text-3xl" : "max-w-prose text-lead font-light leading-relaxed text-ink-muted"}>
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full-bleed studio image */}
      <section className="bg-paper">
        <Reveal className="relative aspect-[21/9] w-full overflow-hidden bg-mount">
          <Image src={studio.image} alt={studio.imageAlt} fill sizes="100vw" className="object-cover" />
        </Reveal>
      </section>

      <Milestones items={studio.milestones} />
      <TeamGrid team={team} />
      <EnquiryBand headline="Work with a studio that finishes what it starts." />
    </>
  );
}
