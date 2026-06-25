import { z } from "zod";

/** Enquiry payload — shared by the form and the route handler (PRD §8.7 / F-4). */
export const EnquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  contact: z.string().trim().min(5, "A phone or email so we can reply.").max(160),
  type: z.enum(["Architecture", "Interior", "Exterior", "Turnkey", "Not sure yet"]),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  budget: z.enum(["", "Under ₹25L", "₹25L–₹75L", "₹75L–₹2Cr", "₹2Cr+"]).optional(),
  message: z.string().trim().min(10, "A line or two about the project.").max(2000),
  project: z.string().trim().max(160).optional().or(z.literal("")),
  // Honeypot — must stay empty.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof EnquirySchema>;

export const PROJECT_TYPE_OPTIONS = ["Architecture", "Interior", "Exterior", "Turnkey", "Not sure yet"] as const;
export const BUDGET_OPTIONS = ["Under ₹25L", "₹25L–₹75L", "₹75L–₹2Cr", "₹2Cr+"] as const;
