import type { Metadata } from "next";
import Image from "next/image";
import { getStudio, getTeam } from "@/lib/cms";
import { site } from "@/content/site";
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
      <PageIntro
        label="Studio · About"
        title="The frame that disappears."
        lead={studio.philosophyLead}
        meta={
          <span>
            {site.contact.city} · since 2008
            <br />
            Architecture · Interiors · Turnkey
          </span>
        }
      />

      {/* Philosophy — oversized lead statement beside the running narrative */}
      <section className="bg-paper">
        <div className="shell-wide grid gap-12 pb-section md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-4">
            <Reveal className="md:sticky md:top-[calc(var(--header-h)+2.5rem)]">
              <Bracket>Philosophy</Bracket>
              <p className="mt-6 font-mono text-2xs uppercase tracking-label text-ink-muted">01 — How we think</p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal>
              <p className="max-w-[22ch] font-display text-[clamp(1.9rem,4.4vw,3.5rem)] font-light leading-[1.05] tracking-tight">
                {studio.philosophy[0]}
              </p>
            </Reveal>
            <div className="mt-12 grid gap-9 md:mt-16 md:grid-cols-2">
              {studio.philosophy.slice(1).map((p, i) => (
                <Reveal key={i} delay={i * 0.06} className="border-t border-hairline pt-6">
                  <p className="max-w-prose text-base leading-relaxed text-ink-muted md:text-lead md:leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Practice in numbers — editorial stat band */}
      <section className="bg-paper">
        <div className="shell-wide pb-section">
          <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-hairline bg-hairline md:grid-cols-4">
            {studio.stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-3 bg-mount p-7 md:p-9">
                <span className="font-display text-[clamp(2.5rem,6vw,4.25rem)] leading-none tracking-tighter">{s.value}</span>
                <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Full-bleed studio image */}
      <section className="bg-paper">
        <Reveal className="relative aspect-[21/9] w-full overflow-hidden bg-mount">
          <Image src={studio.image} alt={studio.imageAlt} fill sizes="100vw" className="object-cover" />
        </Reveal>
      </section>

      {/* Vision — centred pull-quote */}
      <section className="bg-stone">
        <div className="shell-wide flex flex-col items-center py-section text-center">
          <Reveal>
            <Bracket>Vision</Bracket>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mx-auto mt-9 max-w-4xl font-display text-[clamp(1.9rem,5vw,3.75rem)] font-light leading-[1.06] tracking-tight">
              “{studio.vision}”
            </p>
          </Reveal>
        </div>
      </section>

      <Milestones items={studio.milestones} />
      <TeamGrid team={team} />

      {/* Accreditations */}
      <section className="bg-paper">
        <div className="shell-wide flex flex-col items-center gap-7 border-t border-hairline py-section-sm text-center">
          <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">Accreditations &amp; memberships</span>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
            {studio.accreditations.map((a) => (
              <span key={a} className="font-display text-xl tracking-tight text-ink/65 md:text-2xl">
                {a}
              </span>
            ))}
          </div>
          <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">
            IGBC &amp; USGBC Platinum / Gold certified projects
          </span>
        </div>
      </section>

      <EnquiryBand headline="Work with a studio that finishes what it starts." />
    </>
  );
}
