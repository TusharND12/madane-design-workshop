"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/schema";
import { EASE } from "@/lib/motion";
import { useProjectZoom, zoomClick } from "./ProjectZoom";

/**
 * Editorial project tile (PRD §6.4): image + mono index + name + location/year.
 * Hover: subtle zoom (1.03) + caption fade-in. Fixed aspect ratios only.
 */
export function ProjectTile({
  project,
  index,
  ratio = "landscape",
  priority = false,
  sizes = "(max-width:640px) 100vw, (max-width:1024px) 50vw, 640px",
  className,
}: {
  project: Project;
  index: number;
  ratio?: "landscape" | "portrait" | "square";
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const aspect = ratio === "portrait" ? "aspect-[4/5]" : ratio === "square" ? "aspect-square" : "aspect-[3/2]";
  const zoom = useProjectZoom();
  const imgRef = useRef<HTMLDivElement>(null);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn("group block", className)}
      data-cursor-view
      aria-label={`${project.name}, ${project.type}, ${project.city} ${project.year}`}
      onClick={(e) => zoomClick(e, zoom?.open, project, imgRef.current)}
    >
      <div ref={imgRef} className={cn("relative w-full overflow-hidden bg-mount", aspect)}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.04, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease: EASE }}
        >
          <Image
            src={project.cover}
            alt={project.coverAlt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-700 ease-editorial will-change-transform group-hover:scale-[1.03]"
          />
        </motion.div>

        {/* Index + type, top */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-5 mix-blend-difference">
          <span className="font-mono text-2xs tracking-label text-ink">{String(index).padStart(2, "0")}</span>
          <span className="font-mono text-2xs uppercase tracking-label text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {project.type}
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl leading-tight tracking-tight transition-opacity duration-300 md:text-3xl">
          {project.name}
        </h3>
        <span className="link-underline shrink-0 font-mono text-2xs uppercase tracking-label text-ink-muted">
          {project.city} · {project.year}
        </span>
      </div>
    </Link>
  );
}
