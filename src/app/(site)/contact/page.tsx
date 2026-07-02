import type { Metadata } from "next";
import { PageIntro } from "@/components/common/PageIntro";
import { Button } from "@/components/primitives/Button";
import { Bracket } from "@/components/primitives/Bracket";
import { ContactRail } from "@/components/contact/ContactRail";
import { StudioLocations } from "@/components/contact/StudioLocations";
import { MapReveal } from "@/components/contact/MapReveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Madane Design Workshop, the studio address, hours, phone, email and WhatsApp. Or start a project enquiry directly.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageIntro label="Contact" title="Get in touch." />

      <StudioLocations />

      <section className="bg-paper">
        <div className="shell-wide grid gap-16 pb-section md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Bracket>Start a project</Bracket>
            <p className="mt-8 max-w-prose text-lead font-light leading-relaxed text-ink-muted">
              Have a space in mind? Tell us about it and we&rsquo;ll shape it with you, architecture, interiors or turnkey.
            </p>
            <div className="mt-8">
              <Button href="/lets-talk" variant="tertiary" arrow>
                Let&rsquo;s talk
              </Button>
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <ContactRail />
          </div>
        </div>
      </section>

      <MapReveal />
    </>
  );
}
