import type { Metadata } from "next";
import { getStudio, getClients } from "@/lib/cms";
import { Reveal } from "@/components/primitives/Reveal";
import { ScrollVideo } from "@/components/studio/ScrollVideo";
import { StatementReveal } from "@/components/studio/StatementReveal";
import { TeamShowcase } from "@/components/studio/TeamShowcase";
import { PageZoom } from "@/components/common/PageZoom";
import { Button } from "@/components/primitives/Button";
import { EnquiryBand } from "@/components/common/EnquiryBand";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Madane Design Workshop is a Mumbai-based, full-service architecture and design-build studio founded in 2008, leadership, capabilities, principles and accreditations.",
  alternates: { canonical: "/studio" },
};

export default function StudioPage() {
  const studio = getStudio();
  const clients = getClients();

  return (
    <>
      <PageZoom value={0.9} />

      {/* Studio film - scroll-scrubbed, full-bleed */}
      <ScrollVideo src="/assets/video/studio-film.mp4" />

      {/* One bold statement - a vertical film grows over it on scroll */}
      <StatementReveal />

      {/* The crew - scattered constellation */}
      <TeamShowcase />

      {/* Principles, words only */}
      <section className="bg-black">
        <div className="shell-wide flex flex-wrap items-end justify-between gap-x-8 gap-y-12 py-[clamp(4.5rem,13vh,8.5rem)]">
          {studio.principles.map((p, i) => (
            <Reveal key={p.en} delay={(i % 5) * 0.05} className="text-center">
              <span className="block font-display text-[clamp(2.2rem,5.5vw,4rem)] font-light leading-none text-ink/75">{p.sa}</span>
              <span className="mt-3 block font-mono text-2xs uppercase tracking-label text-ink-muted">{p.en}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trust wall - accreditations + marquee clients */}
      <section className="bg-black">
        <div className="shell-wide py-[clamp(4.5rem,13vh,8.5rem)]">
          <Reveal className="flex flex-wrap items-center gap-x-10 gap-y-4">
            {studio.accreditations.map((a) => (
              <span key={a} className="font-display text-2xl tracking-tight text-ink/65 md:text-3xl">{a}</span>
            ))}
          </Reveal>

          <Reveal delay={0.08} className="mt-14 border-t border-hairline pt-10">
            <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">Trusted by</span>
            <div className="mt-7 flex flex-wrap gap-x-9 gap-y-3.5">
              {clients.map((c) => (
                <span key={c.name} className="font-display text-lg tracking-tight text-ink/45 transition-colors duration-300 hover:text-ink md:text-xl">
                  {c.name}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sustainability - the studio ethos, linking to the full vision */}
      <section className="bg-black">
        <div className="shell-wide flex flex-col gap-8 border-t border-hairline py-[clamp(4.5rem,13vh,8.5rem)] md:flex-row md:items-end md:justify-between">
          <div className="max-w-[28ch]">
            <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">Environment &amp; sustainability</span>
            <p className="mt-6 font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-light leading-[1.05] tracking-tight text-ink/80">
              Design as stewardship, a net-zero path to 2030.
            </p>
          </div>
          <Button href="/sustainability" variant="tertiary" arrow className="text-ink">
            Our sustainability vision
          </Button>
        </div>
      </section>

      <EnquiryBand headline="Work with a studio that finishes what it starts." />
    </>
  );
}
