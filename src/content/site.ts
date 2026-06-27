/**
 * Global site configuration (CMS "site" singleton, PRD §7).
 * NOTE: contact details below are launch placeholders, Madane to confirm real
 * phone/WhatsApp/email/address before go-live (PRD §12 "Madane to provide").
 */
export const site = {
  name: "Madane Design Workshop",
  legalName: "Madane Design Workshop LLP",
  shortName: "Madane",
  url: "https://madane.in",
  description:
    "Madane Design Workshop LLP is a Mumbai-based, full-service architecture and design-build studio founded in 2008, architecture, interiors and turnkey delivery for corporate, industrial, retail, residential and hospitality spaces across India and internationally.",
  tagline: "We design & build, architecture, interiors and turnkey, since 2008.",
  keywords: [
    "architecture studio India",
    "interior design",
    "turnkey interiors",
    "office interior design",
    "residential architecture",
    "commercial interiors Mumbai",
    "workspace design",
    "Madane Design Workshop",
  ],
  // Contact (placeholders, edit before launch)
  contact: {
    email: "studio@madane.in",
    phoneDisplay: "+91 98200 00000",
    phoneHref: "tel:+919820000000",
    whatsapp: "919820000000", // wa.me number, digits only
    whatsappMessage: "Hi Madane, I'd like to enquire about a project.",
    addressLine: "Chembur, Mumbai",
    city: "Mumbai",
    region: "Maharashtra",
    postalCode: "400071",
    country: "IN",
    hours: "Mon-Sat · 10:00-19:00 IST",
    mapQuery: "Chembur, Mumbai, Maharashtra, India",
  },
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "Behance", href: "https://behance.net/" },
  ],
  nav: [
    { label: "Studio", href: "/studio" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "Process", href: "/process" },
    { label: "Career", href: "/career" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ],
  credit: { by: "Athreix Innovations LLP", href: "https://athreix.com" },
} as const;

export type Site = typeof site;
