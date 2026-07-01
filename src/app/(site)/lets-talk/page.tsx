import { Suspense } from "react";
import type { Metadata } from "next";
import { PageIntro } from "@/components/common/PageIntro";
import { Bracket } from "@/components/primitives/Bracket";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactRail } from "@/components/contact/ContactRail";

export const metadata: Metadata = {
  title: "Let's talk",
  description:
    "Start a project with Madane Design Workshop. Tell us about the space, architecture, interiors or turnkey, and we'll shape it with you.",
  alternates: { canonical: "/lets-talk" },
};

export default function LetsTalkPage() {
  return (
    <>
      <PageIntro label="Let's talk · Enquire" title="Start a project." />

      <section className="bg-paper">
        <div className="shell-wide grid gap-16 pb-section md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Bracket>Send an enquiry</Bracket>
            <div className="mt-8">
              <Suspense fallback={<div className="font-mono text-2xs uppercase tracking-label text-ink-muted">Loading form…</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <ContactRail />
          </div>
        </div>
      </section>
    </>
  );
}
