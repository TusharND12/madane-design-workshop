import type { Metadata } from "next";
import { PageIntro } from "@/components/common/PageIntro";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Reveal } from "@/components/primitives/Reveal";
import { EnquiryBand } from "@/components/common/EnquiryBand";
import { CountUp } from "@/components/news/CountUp";
import { RoadmapScroll } from "@/components/news/RoadmapScroll";
import { TargetsWall } from "@/components/news/TargetsWall";
import { StandardsMarquee } from "@/components/news/StandardsMarquee";

export const metadata: Metadata = {
  title: "News",
  description:
    "Madane Design Workshop's environment & sustainability vision 2026-2030, a dharma-driven commitment to bharat's built future: net-zero targets, a five-year roadmap and four strategic pillars.",
  alternates: { canonical: "/news" },
};

const STATS = [
  { v: "2M+", l: "sq ft delivered" },
  { v: "38+", l: "cities across India" },
  { v: "52+", l: "creative team" },
  { v: "50%", l: "MNC / Fortune 500" },
  { v: "65%", l: "repeat clients" },
  { v: "₹51 Cr", l: "turnover FY24-25" },
];

const STRATEGY = [
  { year: "2026", title: "Measure, commit & quick wins", body: "Carbon / water / paper baseline · LED retrofit · renewable electricity switch · digital workflows." },
  { year: "2027", title: "Systems, standards & scale", body: "Rainwater harvesting · ISO 14001 · 90% paperless · EV travel policy · site waste protocols." },
  { year: "2028", title: "Certify, innovate & lead", body: "Third-party carbon audit · embodied carbon calcs · zero-landfill sites." },
  { year: "2029", title: "Optimise & publish impact", body: "First verified ESG report · peer-sharing via IIID & IIA · client carbon handover reports." },
  { year: "2030", title: "Carbon neutral. Circular. Exemplary.", body: "Net-zero HQ operations · MDW circular design standard · industry recognition." },
];

const TARGETS = [
  { v: "Net zero", l: "office carbon emissions by 2030" },
  { v: "−50%", l: "water consumption vs 2026 baseline" },
  { v: "<10%", l: "construction waste to landfill" },
  { v: "<500", l: "paper sheets / month by 2028" },
  { v: "25%", l: "renewable electricity at HQ" },
  { v: "0%", l: "e-waste to landfill" },
];

const PILLARS = [
  { n: "Water conservation", d: "Every drop designed: audits, rainwater harvesting and net water-positive operations by 2030." },
  { n: "Paperless systems", d: "Digital by default: BIM-first, under 500 sheets a month, cloud archives." },
  { n: "Recycling & circular design", d: "Circularity at every scale: zero-landfill sites and a circular design standard." },
  { n: "Carbon neutrality", d: "A net-zero future: renewable energy, embodied-carbon calcs and verified offsets." },
];

const STANDARDS = [
  "UN SDGs 11 · 12 · 13 · 17",
  "IGBC / LEED",
  "ISO 14001:2015",
  "GRI Standards",
  "BEE India",
  "MoEFCC E-Waste",
  "Smart Cities",
  "NAPCC / NDC",
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function NewsPage() {
  return (
    <>
      <PageIntro
        label="Sustainability · ESG"
        title="We design & build bharat, sustainably."
        lead="Every square foot we create serves not just our clients, but the land, the air, and the generations who will inhabit what we build."
        meta="Vision & strategy · 2026-2030"
      />

      {/* Why it matters */}
      <section className="bg-paper">
        <div className="shell-wide pb-section">
          <SectionHeader
            index="01"
            label="Why it matters"
            title="38-40% of global carbon comes from construction."
            align="between"
            intro="As architects of 2M+ sq ft across 38+ Indian cities, our decisions carry measurable consequence. Guided by dharma, design as stewardship, we commit to purposeful, measurable action."
          />
          <div className="mt-12 grid grid-cols-2 gap-y-12 md:mt-14 md:grid-cols-3 md:gap-y-14">
            {STATS.map((s, i) => (
              <Reveal key={s.l} delay={(i % 3) * 0.06}>
                <CountUp value={s.v} className="block font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.85] tracking-tighter" />
                <span className="mt-3 block font-mono text-2xs uppercase tracking-label text-ink-muted">{s.l}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Five-year roadmap - pinned horizontal scroll */}
      <RoadmapScroll items={STRATEGY} />

      {/* Six hard targets - hover-reveal wall */}
      <section className="bg-paper">
        <div className="shell-wide py-section">
          <SectionHeader index="03" label="Targets" title="Six hard targets by 2030." />
          <div className="mt-14">
            <TargetsWall items={TARGETS} />
          </div>
        </div>
      </section>

      {/* Four pillars */}
      <section className="bg-paper">
        <div className="shell-wide pb-section">
          <SectionHeader index="04" label="Pillars" title="Four strategic pillars." />
          <div className="mt-12 grid grid-cols-1 gap-x-10 md:grid-cols-2">
            {PILLARS.map((p, i) => (
              <Reveal as="div" key={p.n} delay={(i % 2) * 0.06} className="flex gap-5 border-t border-hairline py-7">
                <span className="font-mono text-2xs tracking-label text-ink-muted">{pad(i + 1)}</span>
                <div>
                  <h3 className="font-display text-2xl tracking-tight">{p.n}</h3>
                  <p className="mt-2 max-w-prose text-base leading-relaxed text-ink-muted">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dharma beat */}
      <section className="bg-paper">
        <div className="shell-wide py-[clamp(4rem,12vh,8rem)] text-center">
          <p className="font-display text-[clamp(1.75rem,5vw,3.5rem)] font-light leading-tight text-ink/70">
            ध्यानं कृत्वा सृजनशीलतायै
          </p>
          <p className="mt-5 font-mono text-2xs uppercase tracking-label text-ink-muted">
            Dhyānaṁ Kṛtvā Sṛjanashīlatāyai · think to innovate
          </p>
        </div>
      </section>

      {/* Standards & alignment - scrolling marquee */}
      <section className="bg-stone/40">
        <div className="py-section">
          <div className="shell-wide">
            <SectionHeader index="05" label="Standards" title="Global standards, India alignment." />
          </div>
          <div className="mt-12">
            <StandardsMarquee items={STANDARDS} />
          </div>
        </div>
      </section>

      <EnquiryBand headline="Build something that lasts, and treads lightly." />
    </>
  );
}
