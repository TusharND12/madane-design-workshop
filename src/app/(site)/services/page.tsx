import type { Metadata } from "next";
import { getServices } from "@/lib/cms";
import { PageIntro } from "@/components/common/PageIntro";
import { ServiceSection } from "@/components/services/ServiceSection";
import { EnquiryBand } from "@/components/common/EnquiryBand";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Architecture, Interior, Exterior and Turnkey — four ways Madane Design Workshop works, from a single room to a whole building, designed and delivered.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const services = getServices();

  return (
    <>
      <PageIntro
        label="Services"
        title="Four ways we work."
        lead="From ground-up architecture to a finished, photograph-ready handover — each discipline is a way into the same standard of work."
      />
      {services.map((service, i) => (
        <ServiceSection key={service.slug} service={service} flip={i % 2 === 1} />
      ))}
      <EnquiryBand headline="Not sure which you need? Start with a conversation." />
    </>
  );
}
