import type { Metadata } from "next";
import { PageIntro } from "@/components/common/PageIntro";
import { Reveal } from "@/components/primitives/Reveal";
import { EnquiryBand } from "@/components/common/EnquiryBand";
import { insights } from "@/content/insights";

export const metadata: Metadata = {
  title: "News & Insights",
  description:
    "News, perspectives and field notes from Madane Design Workshop, on architecture, interiors, turnkey delivery and building sustainably for Bharat and beyond.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageIntro
        label="News & Insights"
        title="Notes from the workshop."
        lead="Perspectives on how we design and build, and what we are learning along the way, written for clients, peers and the curious."
        meta="Journal · press · field notes"
      />

      <section className="bg-paper">
        <div className="shell-wide pb-section">
          <ul>
            {insights.map((post, i) => (
              <Reveal
                as="li"
                key={post.title}
                delay={(i % 3) * 0.06}
                className="group grid grid-cols-1 gap-4 border-t border-hairline py-9 md:grid-cols-12 md:gap-8"
              >
                <div className="flex items-center gap-4 font-mono text-2xs uppercase tracking-label text-ink-muted md:col-span-3 md:flex-col md:items-start md:gap-2">
                  <span className="text-ink/70">{post.kind}</span>
                  <span>{post.date}</span>
                </div>
                <div className="md:col-span-9">
                  <h2 className="max-w-[24ch] font-display text-2xl leading-[1.08] tracking-tight text-ink md:text-3xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-prose text-base leading-relaxed text-ink-muted">{post.excerpt}</p>
                  <span className="mt-4 block font-mono text-2xs uppercase tracking-label text-ink/40">
                    {post.readTime} read
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <EnquiryBand headline="Want to talk through an idea? Start a conversation." />
    </>
  );
}
