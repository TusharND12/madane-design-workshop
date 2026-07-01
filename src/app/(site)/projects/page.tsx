import { Suspense } from "react";
import type { Metadata } from "next";
import { getProjects, getLocations, getCategories, PROJECT_TYPES } from "@/lib/cms";
import { Reveal } from "@/components/primitives/Reveal";
import { ProjectsArchive } from "@/components/projects/ProjectsArchive";
import { EnquiryBand } from "@/components/common/EnquiryBand";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "The Madane archive, homes, workspaces and brand environments across India. Architecture, interiors, exterior and turnkey work, filterable by discipline.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getProjects();
  const locations = getLocations();
  const categories = getCategories();

  return (
    <>
      <header className="shell-wide pb-10 pt-[calc(var(--header-h)+clamp(3rem,9vw,7rem))] text-center">
        <Reveal>
          <h1 className="font-display text-[clamp(2.25rem,7vw,5rem)] font-bold uppercase leading-[0.92] tracking-tight">
            All projects
          </h1>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-1 font-display text-[clamp(1.5rem,5.5vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-tight text-ink/15">
            Architecture / Interior design
          </p>
        </Reveal>
      </header>
      <Suspense fallback={null}>
        <ProjectsArchive projects={projects} types={[...PROJECT_TYPES]} locations={locations} categories={categories} />
      </Suspense>
      <EnquiryBand headline="Found a project that feels like yours?" />
    </>
  );
}
