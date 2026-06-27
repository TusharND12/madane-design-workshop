import { z } from "zod";

/**
 * Content schemas (Zod). These mirror a headless-CMS model 1:1 (PRD §F-1, §7).
 * The local /content layer validates against these; swapping to Sanity later
 * requires no component changes, only the loader in lib/cms.ts.
 */

export const ProjectType = z.enum(["Architecture", "Interior", "Exterior", "Turnkey"]);
export type ProjectType = z.infer<typeof ProjectType>;

export const GallerySpan = z.enum(["full", "wide", "half", "tall"]);
export type GallerySpan = z.infer<typeof GallerySpan>;

export const GalleryImage = z.object({
  src: z.string(),
  alt: z.string().min(1), // alt text enforced at the schema level (a11y gate, PRD §F-2)
  span: GallerySpan.default("half"),
});
export type GalleryImage = z.infer<typeof GalleryImage>;

export const Project = z.object({
  slug: z.string(),
  name: z.string(),
  type: ProjectType,
  // Sector / typology used by the archive's Sector filter (e.g. "Villas",
  // "Banking & Finance", "Corporate Offices", "Coworking", "Industrial").
  category: z.string().default(""),
  client: z.string().optional(),
  location: z.string(),
  city: z.string(),
  year: z.number().optional(),
  area: z.string(), // e.g. "12,000 sq.ft."
  status: z.string(), // Completed / In progress
  scope: z.array(z.string()),
  services: z.array(z.string()),
  cover: z.string(),
  coverAlt: z.string().min(1),
  screenVideo: z.string().optional(), // optional cinematic loop shown on the device screen

  // Narrative ≤150 words: brief / site / response (PRD P2)
  narrative: z.object({
    brief: z.string(),
    site: z.string(),
    response: z.string(),
  }),
  gallery: z.array(GalleryImage),
  featured: z.boolean().default(false),
  order: z.number().default(0),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
});
export type Project = z.infer<typeof Project>;

export const Service = z.object({
  slug: z.string(),
  index: z.string(), // mono index "01"
  title: z.string(),
  tagline: z.string(),
  summary: z.string(),
  forWhom: z.string(),
  includes: z.array(z.string()),
  image: z.string(),
  imageAlt: z.string().min(1),
  filterType: ProjectType,
});
export type Service = z.infer<typeof Service>;

export const ProcessStep = z.object({
  index: z.string(),
  title: z.string(),
  body: z.string(),
});
export type ProcessStep = z.infer<typeof ProcessStep>;

export const TeamMember = z.object({
  slug: z.string(),
  name: z.string(),
  role: z.string(),
  portrait: z.string(),
});
export type TeamMember = z.infer<typeof TeamMember>;

export const Client = z.object({
  name: z.string(),
  logo: z.string(),
});
export type Client = z.infer<typeof Client>;
