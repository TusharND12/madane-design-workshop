import type { Metadata } from "next";
import { LegalPage } from "@/components/common/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms governing your use of the Madane Design Workshop website.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      label="Legal · Terms"
      title="Terms of Use"
      updated="June 2026"
      sections={[
        {
          heading: "Using this site",
          body: [
            "This website is provided for information about Madane Design Workshop and its work. By using it you agree to these terms. If you do not agree, please do not use the site.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            "All photography, project content, text and design on this site belong to Madane Design Workshop or its clients and are protected by copyright. You may not reproduce or republish them without written permission.",
          ],
        },
        {
          heading: "Project content",
          body: [
            "Project descriptions, areas, dates and specifications are presented for illustration and may be simplified. They do not form part of any contract. Each engagement is governed by its own signed agreement.",
          ],
        },
        {
          heading: "No warranty",
          body: [
            "We work to keep the site accurate and available, but provide it “as is”, without warranties of any kind. We are not liable for any loss arising from reliance on the site.",
          ],
        },
        {
          heading: "Governing law",
          body: [
            "These terms are governed by the laws of India. Any dispute is subject to the exclusive jurisdiction of the courts of the studio's registered location.",
          ],
        },
      ]}
    />
  );
}
