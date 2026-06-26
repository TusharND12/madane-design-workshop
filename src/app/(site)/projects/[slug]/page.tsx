import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getProjectSlugs, getNextProject, getRelatedProjects } from "@/lib/cms";
import { projectSchema, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/content/site";
import { Cover } from "@/components/project/Cover";
import { Narrative } from "@/components/project/Narrative";
import { Gallery } from "@/components/project/Gallery";
import { NextProject } from "@/components/project/NextProject";
import { EnquiryBand } from "@/components/common/EnquiryBand";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  const title = project.seo?.title ?? `${project.name}, ${project.type}`;
  const description = project.seo?.description ?? project.narrative.brief;
  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url: `${site.url}/projects/${project.slug}`,
      images: [{ url: project.cover, width: 1900, height: 1236, alt: project.coverAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [project.cover] },
  };
}

export default function ProjectDetailPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const related = getRelatedProjects(project.slug, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            projectSchema(project),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
              { name: project.name, path: `/projects/${project.slug}` },
            ]),
          ]),
        }}
      />
      <Cover project={project} />
      <Narrative project={project} />
      <Gallery images={project.gallery} name={project.name} />
      <NextProject next={next} related={related} />
      <EnquiryBand headline={`Start a project like ${project.name}.`} projectTag={project.slug} />
    </>
  );
}
