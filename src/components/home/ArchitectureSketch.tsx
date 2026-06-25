"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import type { Project } from "@/lib/schema";
import { Bracket } from "@/components/primitives/Bracket";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Architecture, drawn — each project's render reduced to a line sketch. As you
 * scroll, the buildings draw themselves up from the ground one after another,
 * standing side by side until the whole studio skyline is assembled in line.
 */
const HEIGHTS = [82, 100, 64, 92, 72, 100, 86, 70, 96, 78];
// Clean line-art renders (styling only) cycled across the columns; each column
// takes a different horizontal slice so repeats read as distinct detail studies.
const LINEART_COUNT = 5;
const lineartSrc = (i: number) => `/assets/lineart/${(i % LINEART_COUNT) + 1}.png`;
const lineartPos = (i: number) => `${(i * 31) % 100}% bottom`;

export function ArchitectureSketch({ projects }: { projects: Project[] }) {
  const reduced = usePrefersReducedMotion();
  if (projects.length === 0) return null;
  if (reduced) return <StaticSketch projects={projects} />;
  return <Scene projects={projects} />;
}

function Scene({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const N = projects.length;
  const [active, setActive] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(N, Math.max(1, Math.ceil(v * N))));
  });

  return (
    <section ref={ref} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="shell-wide flex flex-1 flex-col pt-[calc(var(--header-h)+clamp(1.5rem,5vh,3.5rem))]">
          {/* Header */}
          <div className="flex items-end justify-between gap-6">
            <div className="flex flex-col gap-4">
              <Bracket>Architecture</Bracket>
              <h2 className="font-display text-[clamp(1.6rem,4vw,3rem)] font-light leading-[0.98] tracking-tight">
                Drawn from the ground up.
              </h2>
            </div>
            <span className="shrink-0 font-mono text-2xs uppercase tracking-label text-ink-muted">
              {String(active).padStart(2, "0")} / {String(N).padStart(2, "0")}
            </span>
          </div>

          {/* Skyline — seamless columns on black, read as one continuous image */}
          <div className="mt-auto flex h-[clamp(280px,52vh,560px)] items-end gap-0 border-b border-white/10 bg-black">
            {projects.map((p, i) => (
              <SketchBuilding key={p.slug} progress={scrollYProgress} index={i} total={N} project={p} h={HEIGHTS[i % HEIGHTS.length]} />
            ))}
          </div>
          <div className="flex items-center justify-between py-6 font-mono text-2xs uppercase tracking-label text-ink-muted">
            <span>The built work, drawn in line</span>
            <Link href="/projects?type=Architecture" className="link-underline">
              All architecture →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SketchBuilding({
  progress,
  index,
  total,
  project,
  h,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  project: Project;
  h: number;
}) {
  const start = index / total;
  const span = 1 / total;
  const opacity = useTransform(progress, [start, start + span * 0.45], [0, 1], { clamp: true });
  const clipTop = useTransform(progress, [start, start + span * 0.9], [100, 0], { clamp: true });
  const clip = useMotionTemplate`inset(${clipTop}% 0% 0% 0%)`;
  const y = useTransform(progress, [start, start + span * 0.9], [36, 0], { clamp: true });

  return (
    <motion.div style={{ height: `${h}%` }} className="relative h-full min-w-[54px] flex-1 sm:min-w-[84px]">
      <motion.div style={{ opacity, clipPath: clip, y }} className="h-full w-full">
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`${project.name} — ${project.city} ${project.year}`}
          className="group relative block h-full w-full overflow-hidden bg-black"
        >
          <Image
            src={lineartSrc(index)}
            alt={`${project.name} — line study.`}
            fill
            sizes="(max-width:768px) 30vw, 12vw"
            style={{ objectPosition: lineartPos(index) }}
            className="object-cover opacity-95 transition-opacity duration-500 ease-editorial group-hover:opacity-100"
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* Reduced motion — all sketches shown side by side, no pin. */
function StaticSketch({ projects }: { projects: Project[] }) {
  return (
    <section className="bg-black">
      <div className="shell-wide py-section">
        <Bracket>Architecture</Bracket>
        <h2 className="mt-5 font-display text-[clamp(1.6rem,4vw,3rem)] font-light leading-[0.98] tracking-tight">Drawn from the ground up.</h2>
        <div className="mt-12 flex h-[clamp(240px,40vh,420px)] items-end gap-0 border-b border-white/10 bg-black">
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              style={{ height: `${HEIGHTS[i % HEIGHTS.length]}%` }}
              className="group relative block min-w-[54px] flex-1 overflow-hidden bg-black sm:min-w-[84px]"
            >
              <Image src={lineartSrc(i)} alt={`${p.name} — line study.`} fill sizes="12vw" style={{ objectPosition: lineartPos(i) }} className="object-cover opacity-95" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
