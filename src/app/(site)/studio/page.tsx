import type { Metadata } from "next";
import { getStudio, getClients } from "@/lib/cms";
import { Reveal } from "@/components/primitives/Reveal";
import { ScrollVideo } from "@/components/studio/ScrollVideo";
import { TeamShowcase } from "@/components/studio/TeamShowcase";
import { PageZoom } from "@/components/common/PageZoom";
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

      {/* Studio film — scroll-scrubbed, full-bleed */}
      <ScrollVideo src="/assets/video/studio-film.mp4" />

      {/* One bold statement, lots of air */}
      <section className="bg-paper">
        <div className="shell-wide py-[clamp(5rem,18vh,12rem)]">
          <Reveal>
            <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">Mumbai · since 2008</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-8 max-w-[15ch] font-display text-[clamp(2.4rem,7.5vw,6.5rem)] font-light leading-[1.0] tracking-tight">
              Giving the world things they haven&rsquo;t imagined before.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* The crew — scattered constellation */}
      <TeamShowcase />

      {/* Principles, words only */}
      <section className="bg-stone/40">
        <div className="shell-wide flex flex-wrap items-end justify-between gap-x-8 gap-y-12 py-[clamp(4.5rem,13vh,8.5rem)]">
          {studio.principles.map((p, i) => (
            <Reveal key={p.en} delay={(i % 5) * 0.05} className="text-center">
              <span className="block font-display text-[clamp(2.2rem,5.5vw,4rem)] font-light leading-none text-ink/75">{p.sa}</span>
              <span className="mt-3 block font-mono text-2xs uppercase tracking-label text-ink-muted">{p.en}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trust wall — accreditations + marquee clients */}
      <section className="bg-paper">
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

      <EnquiryBand headline="Work with a studio that finishes what it starts." />
    </>
  );
}
