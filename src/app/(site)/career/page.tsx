import type { Metadata } from "next";
import { Reveal } from "@/components/primitives/Reveal";
import { EnquiryBand } from "@/components/common/EnquiryBand";
import { CareerHero } from "@/components/career/CareerHero";
import { CareerRoles } from "@/components/career/CareerRoles";

export const metadata: Metadata = {
  title: "Career",
  description:
    "Build with Madane Design Workshop — open roles across architecture, interiors, project management, business development and more, based in Mumbai.",
  alternates: { canonical: "/career" },
};

const CAREERS_EMAIL = "careers@madane.in";

export default function CareerPage() {
  return (
    <>
      <CareerHero />

      {/* Vacancies — centered roles */}
      <div className="bg-paper pb-section pt-[clamp(2rem,6vh,4rem)]">
        <Reveal className="shell-wide text-center">
          <h2 className="mx-auto max-w-[18ch] font-display text-[clamp(2rem,6vw,4.75rem)] font-medium uppercase leading-[0.95] tracking-tight">
            Looking for you to join the team
          </h2>
          <p className="mt-6 font-mono text-2xs uppercase tracking-label text-ink-muted">All roles based in Mumbai · {CAREERS_EMAIL}</p>
        </Reveal>
        <div className="mt-12">
          <CareerRoles />
        </div>
      </div>

      <EnquiryBand headline="Didn't find the position that works for you? Let's talk." />
    </>
  );
}
