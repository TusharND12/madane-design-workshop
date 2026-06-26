import { site } from "@/content/site";
import type { Project } from "@/lib/schema";

const abs = (path: string) => (path.startsWith("http") ? path : `${site.url}${path}`);

/** Organization schema (PRD §11 SEO). */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: abs("/assets/logo-dark.png"),
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phoneDisplay,
    sameAs: site.socials.map((s) => s.href),
  };
}

/** LocalBusiness schema, local intent (PRD §11). */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    image: abs("/assets/hero/p-34.jpg"),
    url: site.url,
    telephone: site.contact.phoneDisplay,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.addressLine,
      addressLocality: site.contact.city,
      addressRegion: site.contact.region,
      postalCode: site.contact.postalCode,
      addressCountry: site.contact.country,
    },
    areaServed: "IN",
    priceRange: "₹₹₹",
  };
}

/** Per-project item schema for case-study pages (PRD §11). */
export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    url: `${site.url}/projects/${project.slug}`,
    image: abs(project.cover),
    creator: { "@type": "Organization", name: site.name },
    dateCreated: String(project.year),
    locationCreated: { "@type": "Place", name: project.location },
    about: project.type,
    description: project.seo?.description ?? project.narrative.brief,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}
