import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getProjectSlugs } from "@/lib/cms";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticRoutes = ["", "/studio", "/projects", "/services", "/process", "/contact", "/privacy", "/terms"].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/projects" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : path === "/projects" ? 0.9 : 0.7,
  }));

  const projectRoutes = getProjectSlugs().map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
