import type { Metadata } from "next";
import { getProcess } from "@/lib/cms";
import { PageIntro } from "@/components/common/PageIntro";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";
import { EnquiryBand } from "@/components/common/EnquiryBand";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How Madane Design Workshop works, Discovery, Concept, Design Development, Execution and Handover. A clear sequence with no surprises.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  const steps = getProcess();
  return (
    <>
      <PageIntro
        label="Process"
        title="How a project actually goes."
        lead="Five steps from first conversation to a snag-free handover. The same method whether it's a private home or a corporate floor."
      />
      <ProcessTimeline steps={steps} />
      <EnquiryBand headline="Know the steps. Now let's take the first one." />
    </>
  );
}
