import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import { organizationSchema, localBusinessSchema } from "@/lib/seo";
import "./globals.css";

// ITC Avant Garde Gothic LT — the studio typeface, used site-wide. Only Extra
// Light and Medium weights (+ obliques) are supplied, so heavier requests fall
// back to Medium and lighter to Extra Light via the browser's weight matching.
const avantGarde = localFont({
  src: [
    { path: "../../Fonts/ITC Avant Garde Gothic LT Extra Light_0.ttf", weight: "300", style: "normal" },
    { path: "../../Fonts/ITC Avant Garde Gothic LT Extra Light Oblique_0.ttf", weight: "300", style: "italic" },
    { path: "../../Fonts/ITC Avant Garde Gothic LT Medium_0.ttf", weight: "500", style: "normal" },
    { path: "../../Fonts/ITC Avant Garde Gothic LT Medium Oblique_0.ttf", weight: "500", style: "italic" },
  ],
  variable: "--font-avantgarde",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#262626",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Architecture, Interiors & Turnkey`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: "Athreix Innovations LLP" }],
  keywords: [...site.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Architecture, Interiors & Turnkey`,
    description: site.description,
    url: site.url,
    locale: "en_IN",
    images: [{ url: "/assets/hero/p-34.jpg", width: 1900, height: 1236, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Architecture, Interiors & Turnkey`,
    description: site.description,
    images: ["/assets/hero/p-34.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/assets/logo-mark.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={avantGarde.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema(), localBusinessSchema()]) }}
        />
        {children}
      </body>
    </html>
  );
}
