import type { Metadata } from "next";
import { PageIntro } from "@/components/common/PageIntro";
import { EnquiryBand } from "@/components/common/EnquiryBand";
import { InsightsList } from "@/components/insights/InsightsList";
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
          <InsightsList posts={insights} />
        </div>
      </section>

      <EnquiryBand headline="Want to talk through an idea? Start a conversation." />
    </>
  );
}
