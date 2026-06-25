import { Suspense } from "react";
import type { Metadata } from "next";
import { getProjects, getLocations, PROJECT_TYPES } from "@/lib/cms";
import { PageIntro } from "@/components/common/PageIntro";
import { ProjectsArchive } from "@/components/projects/ProjectsArchive";
import { EnquiryBand } from "@/components/common/EnquiryBand";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "The Madane archive — homes, workspaces and brand environments across India. Architecture, interiors, exterior and turnkey work, filterable by discipline and city.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getProjects();
  const locations = getLocations();

  return (
    <>
      <PageIntro
        label="Projects · Archive"
        title="The work, walked through."
        lead="An exhibition of completed and in-progress projects. Filter by discipline or city — every combination is a shareable link."
        meta={`${projects.length} projects · ${locations.length} cities`}
      />
      <Suspense fallback={<div className="shell-wide pb-section font-mono text-2xs uppercase tracking-label text-ink-muted">Loading archive…</div>}>
        <ProjectsArchive projects={projects} types={[...PROJECT_TYPES]} locations={locations} />
      </Suspense>
      <EnquiryBand headline="Found a project that feels like yours?" />
    </>
  );
}
