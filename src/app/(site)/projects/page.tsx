import { Suspense } from "react";
import type { Metadata } from "next";
import { getProjects, getLocations, getCategories, PROJECT_TYPES } from "@/lib/cms";
import { Bracket } from "@/components/primitives/Bracket";
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
      <header className="shell-wide pb-12 pt-[calc(var(--header-h)+clamp(3rem,9vw,7rem))] text-center">
        <Reveal>
          <Bracket>Projects</Bracket>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mx-auto mt-8 max-w-[16ch] font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.98] tracking-tighter">
            Selected work.
          </h1>
        </Reveal>
      </header>
      <Suspense fallback={null}>
        <ProjectsArchive projects={projects} types={[...PROJECT_TYPES]} locations={locations} categories={categories} />
      </Suspense>
      <EnquiryBand headline="Found a project that feels like yours?" />
    </>
  );
}
