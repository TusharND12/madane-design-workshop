import type { Service } from "@/lib/schema";

/** Services (CMS "service" model, PRD §8.5). Each deep-links to a filtered archive. */
export const services: Service[] = [
  {
    slug: "architecture",
    index: "01",
    title: "Architecture",
    tagline: "The building, conceived whole.",
    summary:
      "Ground-up residential and commercial architecture, siting, form, structure and light resolved as one idea before a single wall is detailed.",
    forWhom: "Homeowners and developers building new, or reworking a structure to its bones.",
    includes: ["Site & feasibility", "Concept & form", "Structural coordination", "Statutory drawings", "Construction documentation"],
    image: "/assets/services/architecture.jpg",
    imageAlt: "Architecture, a completed corporate reception and floor, conceived whole.",
    filterType: "Architecture",
  },
  {
    slug: "interior",
    index: "02",
    title: "Commercial Interior",
    tagline: "Where the day is actually spent.",
    summary:
      "Interiors for homes and workspaces, planning, material, light and detail tuned until the space disappears and the life inside it comes forward.",
    forWhom: "Anyone who has the shell and needs the inside resolved with discipline.",
    includes: ["Space planning", "Material & finish", "Lighting design", "Joinery & detail", "FF&E and styling"],
    image: "/assets/services/interior.jpg",
    imageAlt: "Interior, a resolved, daylit workspace where the day is spent.",
    filterType: "Interior",
  },
  {
    slug: "exterior",
    index: "03",
    title: "Residential Interiors",
    tagline: "Where you actually live.",
    summary:
      "Interiors for homes, planning, material, light and detail tuned to how a family really lives, so every room feels calm, considered and entirely your own.",
    forWhom: "Homeowners who want their space resolved with the same rigour we bring to our commercial work.",
    includes: ["Space planning", "Material & finish", "Lighting design", "Joinery & detail", "FF&E and styling"],
    image: "/assets/services/residential-interior.png",
    imageAlt: "Residential interior, a warm timber-lined living room with a marble feature wall, sculptural cream seating and a dining area beyond.",
    filterType: "Interior",
  },
  {
    slug: "turnkey",
    index: "04",
    title: "Turnkey",
    tagline: "One team, design to handover.",
    summary:
      "Design and build under a single accountable team, drawings, procurement and site run as one programme, delivered finished and photograph-ready.",
    forWhom: "Clients who want one partner answerable for the whole thing, on time.",
    includes: ["Single-point delivery", "Procurement", "Site execution", "Quality control", "Snag-free handover"],
    image: "/assets/services/turnkey.jpg",
    imageAlt: "Turnkey, a finished, photograph-ready space delivered end to end.",
    filterType: "Turnkey",
  },
];
