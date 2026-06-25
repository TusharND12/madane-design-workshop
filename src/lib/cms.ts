import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { processSteps } from "@/content/process";
import { studio, team, clients } from "@/content/studio";
import type { Project, ProjectType } from "@/lib/schema";

/**
 * Read API for content. This is the single seam between the UI and the data
 * source — today it reads typed local content; swapping to Sanity means
 * reimplementing only these functions (PRD §7, §10 CMS).
 */

const byOrder = (a: Project, b: Project) => a.order - b.order;

export function getProjects(): Project[] {
  return [...projects].sort(byOrder);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(limit = 6): Project[] {
  const featured = projects.filter((p) => p.featured).sort(byOrder);
  const pool = featured.length >= 4 ? featured : getProjects();
  return pool.slice(0, limit);
}

export function getProjectsByType(type: ProjectType): Project[] {
  return getProjects().filter((p) => p.type === type);
}

/** Next project in the archive order (wraps around) for the case-study footer. */
export function getNextProject(slug: string): Project {
  const all = getProjects();
  const i = all.findIndex((p) => p.slug === slug);
  return all[(i + 1) % all.length];
}

/** Related-by-type, excluding the current project (PRD P5). */
export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const current = getProject(slug);
  if (!current) return [];
  const sameType = getProjects().filter((p) => p.slug !== slug && p.type === current.type);
  const others = getProjects().filter((p) => p.slug !== slug && p.type !== current.type);
  return [...sameType, ...others].slice(0, limit);
}

export const PROJECT_TYPES: ProjectType[] = ["Architecture", "Interior", "Exterior", "Turnkey"];

export function getLocations(): string[] {
  return Array.from(new Set(getProjects().map((p) => p.city))).sort();
}

export function getServices() {
  return services;
}
export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
export function getProcess() {
  return processSteps;
}
export function getStudio() {
  return studio;
}
export function getTeam() {
  return team;
}
export function getClients() {
  return clients;
}
