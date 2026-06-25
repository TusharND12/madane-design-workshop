import type { Metadata } from "next";
import { LegalPage } from "@/components/common/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Madane Design Workshop collects, uses and protects the information you share through this website.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      label="Legal · Privacy"
      title="Privacy Policy"
      updated="June 2026"
      sections={[
        {
          heading: "What we collect",
          body: [
            "When you submit an enquiry we collect the details you provide — your name, contact details, and what you tell us about your project. We also collect basic, anonymised analytics about how the site is used so we can improve it.",
            "We do not collect sensitive personal data, and we never sell or rent your information to anyone.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "Enquiry details are used solely to respond to you and, if we work together, to deliver your project. Analytics are used in aggregate to understand traffic and performance.",
          ],
        },
        {
          heading: "Where it goes",
          body: [
            `Enquiries are routed to the studio by email and, where relevant, WhatsApp. They may be stored in our customer records. You can ask us to delete your information at any time by writing to ${site.contact.email}.`,
          ],
        },
        {
          heading: "Cookies",
          body: [
            "This site uses only the cookies required to function and to measure aggregate usage. You can block cookies in your browser; the site will continue to work.",
          ],
        },
        {
          heading: "Contact",
          body: [
            `For any privacy question, write to ${site.contact.email}. This policy may be updated; the date above reflects the latest revision.`,
          ],
        },
      ]}
    />
  );
}
