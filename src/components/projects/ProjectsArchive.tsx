"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import type { Project, ProjectType } from "@/lib/schema";
import { EASE } from "@/lib/motion";

// A varied aspect cycle gives the grid a calm masonry rhythm without borders or
// chrome — images do all the talking (yodezeen.com/projects style).
const ASPECTS = ["4 / 3", "3 / 4", "1 / 1", "4 / 3", "3 / 4", "4 / 3", "1 / 1", "3 / 4"];

// Native <option>s can't take Tailwind classes; style them to the dark theme so
// the popup list stays legible.
const OPTION_STYLE: React.CSSProperties = { backgroundColor: "#181818", color: "#ECECE6" };

export function ProjectsArchive({
  projects,
  types,
  locations,
  categories,
}: {
  projects: Project[];
  types: ProjectType[];
  locations: string[];
  categories: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [type, setType] = useState<ProjectType | "All">("All");
  const [location, setLocation] = useState<string | "All">("All");
  const [category, setCategory] = useState<string | "All">("All");

  useEffect(() => {
    const t = (params.get("type") as ProjectType | null) ?? "All";
    const c = params.get("city") ?? "All";
    const s = params.get("sector") ?? "All";
    setType(types.includes(t as ProjectType) ? (t as ProjectType) : "All");
    setLocation(locations.includes(c) ? c : "All");
    setCategory(categories.includes(s) ? s : "All");
  }, [params, types, locations, categories]);

  const sync = useCallback(
    (nt: ProjectType | "All", nl: string | "All", nc: string | "All") => {
      const sp = new URLSearchParams();
      if (nt !== "All") sp.set("type", nt);
      if (nl !== "All") sp.set("city", nl);
      if (nc !== "All") sp.set("sector", nc);
      const qs = sp.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      if (typeof window !== "undefined") {
        const lenis = window.__lenis;
        if (lenis) lenis.scrollTo(0, { duration: 0.7 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [router, pathname]
  );

  const onType = (t: ProjectType | "All") => {
    setType(t);
    sync(t, location, category);
  };
  const onLocation = (l: string | "All") => {
    setLocation(l);
    sync(type, l, category);
  };
  const onCategory = (c: string | "All") => {
    setCategory(c);
    sync(type, location, c);
  };

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (type === "All" || p.type === type) &&
          (location === "All" || p.city === location) &&
          (category === "All" || p.category === category)
      ),
    [projects, type, location, category]
  );

  const tabs: (ProjectType | "All")[] = ["All", ...types];

  return (
    <div className="w-full px-3 pb-section">
      {/* Minimal filter — discipline tabs + sector/city dropdowns, one line */}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-2xs uppercase tracking-label">
        {tabs.map((t) => {
          const active = t === type;
          return (
            <button
              key={t}
              type="button"
              onClick={() => onType(t)}
              className={`relative pb-1.5 transition-colors duration-300 ${active ? "text-ink" : "text-ink-muted hover:text-ink"}`}
            >
              {t}
              {active && <motion.span layoutId="proj-tab" className="absolute inset-x-0 bottom-0 h-px bg-ink" />}
            </button>
          );
        })}
        <Select allLabel="All sectors" value={category} options={categories} onChange={onCategory} ariaLabel="Filter by sector" />
        <Select allLabel="All cities" value={location} options={locations} onChange={onLocation} ariaLabel="Filter by city" />
      </div>

      {/* Clean masonry gallery */}
      {filtered.length === 0 ? (
        <p className="mt-20 text-center font-display text-2xl tracking-tight text-ink-muted">Nothing here yet.</p>
      ) : (
        <motion.div
          key={`${type}-${location}-${category}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-10 columns-1 gap-3 sm:columns-2 lg:columns-3 xl:columns-4"
        >
          {filtered.map((p, i) => (
            <GalleryCard key={p.slug} project={p} aspect={ASPECTS[i % ASPECTS.length]} priority={i < 6} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

function Select({
  allLabel,
  value,
  options,
  onChange,
  ariaLabel,
}: {
  allLabel: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  ariaLabel: string;
}) {
  const active = value !== "All";
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        style={{ colorScheme: "dark" }}
        className={`max-w-[11rem] cursor-pointer appearance-none truncate bg-transparent pr-5 font-mono text-2xs uppercase tracking-label outline-none transition-colors duration-300 hover:text-ink focus:text-ink ${active ? "text-ink" : "text-ink-muted"}`}
      >
        <option value="All" style={OPTION_STYLE}>
          {allLabel}
        </option>
        {options.map((o) => (
          <option key={o} value={o} style={OPTION_STYLE}>
            {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[0.6rem] text-ink-muted" aria-hidden="true">
        ↓
      </span>
    </div>
  );
}

function GalleryCard({ project, aspect, priority }: { project: Project; aspect: string; priority: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`${project.name}, ${project.type}, ${project.city}`}
      className="group mb-3 block break-inside-avoid overflow-hidden bg-mount"
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: aspect }}>
        <Image
          src={project.cover}
          alt={project.coverAlt}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
          priority={priority}
          className="object-cover transition-transform duration-[1.2s] ease-editorial group-hover:scale-[1.04]"
        />
        {/* Name reveals on hover — no permanent chrome */}
        <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="p-5">
            <h3 className="font-display text-lg leading-tight tracking-tight text-white md:text-xl">{project.name}</h3>
            <p className="mt-1 font-mono text-2xs uppercase tracking-label text-white/70">
              {project.type} · {project.city}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
