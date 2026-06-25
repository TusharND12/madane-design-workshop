"use client";

import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/schema";

/**
 * Project card — dark/black framed card with the cover floating on a near-black
 * panel, a title + short descriptor, and a pill "View project" action with a
 * circular arrow. Comes in two sizes (wide / narrow) for a bento archive grid.
 */
export function ProjectCard({
  project,
  index,
  variant = "narrow",
  priority = false,
}: {
  project: Project;
  index: number;
  variant?: "wide" | "narrow";
  priority?: boolean;
}) {
  const aspect = variant === "wide" ? "aspect-[16/10]" : "aspect-[4/5]";

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor-view
      aria-label={`${project.name} — ${project.type}, ${project.city} ${project.year}`}
      className="group flex h-full flex-col rounded-[18px] border border-hairline bg-mount p-3.5 transition-all duration-500 ease-editorial hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_38px_70px_-34px_rgba(0,0,0,0.9)]"
    >
      {/* Image floats on a near-black panel with breathing room */}
      <div className="rounded-[13px] bg-paper p-4">
        <div className={`relative w-full overflow-hidden rounded-[9px] bg-paper ${aspect}`}>
          <Image
            src={project.cover}
            alt={project.coverAlt}
            fill
            sizes={variant === "wide" ? "(max-width:768px) 100vw, 60vw" : "(max-width:768px) 50vw, 30vw"}
            priority={priority}
            className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
          />
          <span className="absolute left-3 top-3 font-mono text-2xs tracking-label text-ink mix-blend-difference">
            {String(index).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-2 pt-5">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink-muted">{project.type}</span>
        <h3 className="mt-2 font-display text-xl leading-tight tracking-tight md:text-2xl">{project.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
          {project.scope[0]} — {project.city}.
        </p>

        <div className="mt-6 flex items-center justify-between pt-1">
          <span className="inline-flex items-center rounded-full border border-hairline px-4 py-2 font-mono text-2xs uppercase tracking-label text-ink transition-colors duration-300 ease-editorial group-hover:border-ink/40">
            View project
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-300 ease-editorial group-hover:translate-x-0.5">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
              <path d="M9 1l4 4-4 4M13 5H0" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
