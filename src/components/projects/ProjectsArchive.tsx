"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { Project, ProjectType } from "@/lib/schema";
import { FilterBar } from "./FilterBar";
import { ArchitectureFrame } from "./ArchitectureFrame";
import { ButtonAction } from "@/components/primitives/Button";
import { EASE } from "@/lib/motion";

export function ProjectsArchive({
  projects,
  types,
  locations,
}: {
  projects: Project[];
  types: ProjectType[];
  locations: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const initialType = (params.get("type") as ProjectType | null) ?? "All";
  const initialLoc = params.get("city") ?? "All";

  const [type, setType] = useState<ProjectType | "All">(
    types.includes(initialType as ProjectType) ? (initialType as ProjectType) : "All"
  );
  const [location, setLocation] = useState<string | "All">(locations.includes(initialLoc) ? initialLoc : "All");

  useEffect(() => {
    const t = (params.get("type") as ProjectType | null) ?? "All";
    const c = params.get("city") ?? "All";
    setType(types.includes(t as ProjectType) ? (t as ProjectType) : "All");
    setLocation(locations.includes(c) ? c : "All");
  }, [params, types, locations]);

  const syncUrl = useCallback(
    (nextType: ProjectType | "All", nextLoc: string | "All") => {
      const sp = new URLSearchParams();
      if (nextType !== "All") sp.set("type", nextType);
      if (nextLoc !== "All") sp.set("city", nextLoc);
      const qs = sp.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const t of types) c[t] = projects.filter((p) => p.type === t && (location === "All" || p.city === location)).length;
    return c;
  }, [projects, types, location]);

  const filtered = useMemo(
    () => projects.filter((p) => (type === "All" || p.type === type) && (location === "All" || p.city === location)),
    [projects, type, location]
  );

  function handleType(t: ProjectType | "All") {
    setType(t);
    syncUrl(t, location);
  }
  function handleLocation(l: string | "All") {
    setLocation(l);
    syncUrl(type, l);
  }

  return (
    <div className="shell-wide pb-section">
      <FilterBar
        types={types}
        locations={locations}
        activeType={type}
        activeLocation={location}
        counts={counts}
        onType={handleType}
        onLocation={handleLocation}
        total={projects.filter((p) => location === "All" || p.city === location).length}
      />

      {/* Count line */}
      <div className="mt-6 flex items-center justify-between font-mono text-2xs uppercase tracking-label text-ink-muted">
        <span>
          {String(filtered.length).padStart(2, "0")} {filtered.length === 1 ? "project" : "projects"}
        </span>
        <span>
          {type === "All" ? "All disciplines" : type}
          {location !== "All" ? ` · ${location}` : ""}
        </span>
      </div>

      {filtered.length === 0 ? (
        <EmptyState onReset={() => { handleType("All"); handleLocation("All"); }} />
      ) : (
        <div className="relative mt-8 px-6 pb-14 pt-12 md:mt-10 md:px-12">
          {/* Line-art building shell, the cards read as floors inside it */}
          <ArchitectureFrame />
          <motion.div layout className="relative z-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE, delay: Math.min(i * 0.04, 0.4) }}
                >
                  <GalleryCard project={p} index={i + 1} priority={i < 6} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function GalleryCard({ project, index, priority }: { project: Project; index: number; priority: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`${project.name}, ${project.type}, ${project.city} ${project.year}`}
      className="group block"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-mount">
        <Image
          src={project.cover}
          alt={project.coverAlt}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 font-mono text-2xs tracking-label text-white/90 mix-blend-difference">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      {/* Caption */}
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="min-w-0 truncate font-display text-lg leading-tight tracking-tight transition-colors duration-300 group-hover:text-ink md:text-xl">
          {project.name}
        </h3>
        <span className="shrink-0 font-mono text-2xs uppercase tracking-label text-ink-muted">{project.type}</span>
      </div>
      <p className="mt-1 font-mono text-2xs uppercase tracking-label text-ink-muted">
        {project.city}
      </p>
    </Link>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6 border-t border-hairline py-32 text-center">
      <p className="font-display text-2xl tracking-tight">No projects in this combination, yet.</p>
      <p className="max-w-prose text-sm text-ink-muted">Every filter is shareable; try a broader discipline or a different city.</p>
      <ButtonAction variant="tertiary" onClick={onReset} arrow>
        Reset filters
      </ButtonAction>
    </div>
  );
}
