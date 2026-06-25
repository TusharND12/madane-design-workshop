import { Suspense } from "react";
import type { Metadata } from "next";
import { PageIntro } from "@/components/common/PageIntro";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactRail } from "@/components/contact/ContactRail";
import { MapReveal } from "@/components/contact/MapReveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start an enquiry with Madane Design Workshop — architecture, interiors and turnkey for homes and workspaces. WhatsApp, call or email the studio directly.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        label="Contact · Enquire"
        title="Tell us about the space."
        lead="A line or two is enough to begin. We read every enquiry ourselves and reply within one working day."
      />

      <section className="bg-paper">
        <div className="shell-wide grid gap-16 pb-section md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Suspense fallback={<div className="font-mono text-2xs uppercase tracking-label text-ink-muted">Loading form…</div>}>
              <ContactForm />
            </Suspense>
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
