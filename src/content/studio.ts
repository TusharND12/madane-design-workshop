import type { TeamMember, Client } from "@/lib/schema";

/**
 * Studio content — real facts sourced from Madane Design Workshop's company
 * profile (00_DOCUMENTS: PHILOSOPHY+VISION+ABOUT US, CLIENT LIST, NEWS).
 * Founded 2008, Chembur, Mumbai. NOTE: milestone years beyond the 2008 founding
 * are indicative — confirm exact dates with the studio.
 */
export const studio = {
  philosophyLead:
    "We design and build — architecture, interiors and turnkey delivery — and try, above all, to make the result feel inevitable.",
  philosophy: [
    "Madane Design Workshop LLP is a Mumbai-based, full-service architecture and design-build studio founded in 2008. From our base in Chembur, a 52-person creative team works alongside specialist contracting partners to deliver high-performance, energy-efficient and sustainable spaces — corporate headquarters, commercial offices, industrial facilities, dark stores, luxury residences and hospitality — across India and internationally.",
    "We believe a space is finished not when there is nothing left to add, but when there is nothing left to remove. We hold to a single material logic, let daylight do the dramatic work, and detail the few things you actually touch to the tolerance of furniture — so the result feels as though it could not have been any other way.",
    "Our work is grounded in five principles — knowledge, patience, love, justice and dedication. We work the same way whether the project is a private villa or a corporate floor: understand it completely, commit to one idea, and deliver it through BIM-integrated workflows and IGBC & USGBC green-building standards.",
  ],
  vision: "Giving the world things they haven't imagined before.",
  accreditations: ["COA", "IGBC", "IIID", "IIA", "USGBC"],
  image: "/assets/projects/sun-petrochemicals-pvt-ltd-corporate-office/cover.jpg",
  imageAlt: "A completed Madane Design Workshop corporate interior.",
  stats: [
    { value: "18", label: "Years of practice" },
    { value: "52", label: "Creative team" },
    { value: "75+", label: "Clients served" },
    { value: "35", label: "Projects delivered" },
  ],
  milestones: [
    { year: "2008", body: "Madane Design Workshop is founded in Chembur, Mumbai, as a full-service architecture and design-build studio." },
    { year: "2015", body: "The practice scales into large corporate interiors, GCCs and industrial facilities across India." },
    { year: "2020", body: "IGBC & USGBC green-building certification becomes central to design and delivery." },
    { year: "2026", body: "A 52-person team serves 75+ clients across homes, offices and brand environments in India and abroad." },
  ],
};

// Real leadership — the four founding/partner team (company profile).
// Portraits map to the studio's own team photography where available; Priyanka
// falls back to an initial-monogram avatar (portrait: "").
export const team: TeamMember[] = [
  { slug: "hrishikesh", name: "Ar. Hrishikesh Arun Madane", role: "Founding Partner · Principal Architect", portrait: "/assets/team-clean/hrishikesh.jpg" },
  { slug: "akshay", name: "Akshay Arun Madane", role: "Founding Partner · Business & Contracting", portrait: "/assets/team-clean/akshay.jpg" },
  { slug: "rasika", name: "Ar. Rasika Hrishikesh Madane", role: "Founding Partner · Design Studio Head", portrait: "/assets/team-clean/rasika.jpg" },
  { slug: "priyanka", name: "Priyanka Akshay Madane", role: "Partner · Business Development & Marketing", portrait: "" },
];

// A selection of Madane's real clients (full list: company CLIENT LIST). Logos
// are not held in this repo, so the recognition wall renders names typographically.
export const clients: Client[] = [
  { name: "Swiggy", logo: "" },
  { name: "Zepto", logo: "" },
  { name: "Urban Company", logo: "" },
  { name: "Croma", logo: "" },
  { name: "FirstCry", logo: "" },
  { name: "Policy Bazaar", logo: "" },
  { name: "PB Partners", logo: "" },
  { name: "IDFC First Bank", logo: "" },
  { name: "Fedbank", logo: "" },
  { name: "Fox Mandal", logo: "" },
  { name: "Reynaers Aluminium", logo: "" },
  { name: "Semac Consultants", logo: "" },
  { name: "Sun Petrochemicals", logo: "" },
  { name: "UFO Digital Cinema", logo: "" },
  { name: "Capital First Bank", logo: "" },
  { name: "Ipsos", logo: "" },
  { name: "Nippon Express", logo: "" },
  { name: "Umicore", logo: "" },
  { name: "Eatigo", logo: "" },
  { name: "Akasa", logo: "" },
  { name: "CEAT", logo: "" },
  { name: "Hero Electric", logo: "" },
  { name: "Startek", logo: "" },
  { name: "TimesPro", logo: "" },
  { name: "Insecticides India", logo: "" },
  { name: "Osource Global", logo: "" },
  { name: "TOTO", logo: "" },
  { name: "Air Arabia", logo: "" },
  { name: "Boomlet", logo: "" },
  { name: "Swastik Developers", logo: "" },
  { name: "Advait Developers", logo: "" },
  { name: "Kushal Landmark", logo: "" },
];
