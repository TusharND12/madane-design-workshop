import type { Metadata } from "next";
import { getStudio, getClients } from "@/lib/cms";
import { site } from "@/content/site";
import { PageIntro } from "@/components/common/PageIntro";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Reveal } from "@/components/primitives/Reveal";
import { LeadershipShowcase } from "@/components/studio/LeadershipShowcase";
import { TeamShowcase } from "@/components/studio/TeamShowcase";
import { PageZoom } from "@/components/common/PageZoom";
import { EnquiryBand } from "@/components/common/EnquiryBand";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Madane Design Workshop is a Mumbai-based, full-service architecture and design-build studio founded in 2008, leadership, capabilities, principles and accreditations.",
  alternates: { canonical: "/studio" },
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function StudioPage() {
  const studio = getStudio();
  const clients = getClients();

  return (
    <>
      <PageZoom value={0.9} />
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

      {/* 01, Who we are */}
      <section className="bg-paper">
        <div className="shell-wide pb-section">
          <SectionHeader index="01" label="Who we are" title="A full-service design-build studio." align="between" intro={studio.philosophy[0]} />
          <div className="mt-12 grid gap-9 md:mt-14 md:grid-cols-2 md:gap-x-10">
            {studio.philosophy.slice(1).map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="max-w-prose text-base leading-relaxed text-ink-muted md:text-lead md:leading-relaxed">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 02, Numbers */}
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

      {/* 03, Leadership */}
      <LeadershipShowcase
        items={studio.leadership}
        socials={[
          ...site.socials.filter((s) => s.label === "Instagram" || s.label === "LinkedIn"),
          { label: "Email", href: `mailto:${site.contact.email}` },
        ]}
        header={
          <SectionHeader
            index="02"
            label="Leadership"
            title="The partners behind the practice."
            align="between"
            intro="A multidisciplinary leadership team with deep roots in architecture, design, contracts and strategy. Scroll to meet each partner."
          />
        }
      />

      {/* 03b, The crew */}
      <TeamShowcase />

      {/* 04, What we design & build */}
      <section className="bg-paper">
        <div className="shell-wide py-section">
          <SectionHeader index="04" label="Capabilities" title="What we design & build." align="between" intro="From a single working floor to a whole building, across sectors, in India and internationally." />
          <div className="mt-12 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {studio.capabilities.map((c, i) => (
              <Reveal as="div" key={c} delay={(i % 3) * 0.04} className="flex items-baseline gap-4 border-t border-hairline py-5">
                <span className="font-mono text-2xs tracking-label text-ink-muted">{pad(i + 1)}</span>
                <span className="text-base leading-snug md:text-lead">{c}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05, Principles */}
      <section className="bg-stone/40">
        <div className="shell-wide py-section">
          <SectionHeader index="05" label="Principles" title="Five things we hold to." />
          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-5">
            {studio.principles.map((p, i) => (
              <Reveal key={p.en} delay={(i % 5) * 0.05} className="border-t border-hairline pt-6">
                <span className="block text-xl leading-none text-ink/60">{p.sa}</span>
                <span className="mt-3 block font-display text-2xl tracking-tight">{p.en}</span>
                <p className="mt-2.5 text-sm leading-snug text-ink-muted">{p.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06, Accreditations & Clients */}
      <section className="bg-paper">
        <div className="shell-wide py-section">
          <SectionHeader index="06" label="Recognition" title="Accredited, and trusted." align="between" intro="IGBC & USGBC Platinum / Gold certified projects for the majority of our clients." />

          <div className="mt-12 flex flex-wrap items-center gap-x-12 gap-y-5 border-t border-hairline pt-8">
            {studio.accreditations.map((a) => (
              <span key={a} className="font-display text-xl tracking-tight text-ink/65 md:text-2xl">{a}</span>
            ))}
          </div>

          <div className="mt-12 border-t border-hairline pt-8">
            <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">Selected clients</span>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {clients.map((c) => (
                <span key={c.name} className="font-mono text-2xs uppercase tracking-label text-ink/55 transition-colors duration-300 hover:text-ink">
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EnquiryBand headline="Work with a studio that finishes what it starts." />
    </>
  );
}
