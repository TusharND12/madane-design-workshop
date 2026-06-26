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
 * Architecture, drawn — the studio's built work reduced to a single line-art
 * skyline on black. As you scroll, the panorama assembles itself: equal columns
 * draw up from the ground one after another, left to right, until the whole
 * elevation stands complete and seamless, reading as one continuous drawing.
 *
 * The skyline breaks out of the page column to full viewport width and is sized
 * by the artwork's own aspect ratio, so it scales up on large / ultrawide
 * monitors (height-capped) without ever cropping the building tops.
 */
const PANORAMA = "/assets/lineart/skyline.png";
const ASPECT = 2.985; // 2167 × 726 source
// Cap the drawn height against the viewport so it always fits the pinned frame;
// width then follows from the aspect ratio and fills as much screen as it can.
const MAX_H = "min(64vh, 760px)";
const SKY_STYLE = { width: `min(100%, calc(${MAX_H} * ${ASPECT}))`, aspectRatio: `${ASPECT}` } as const;
// How many slices the skyline is drawn in — finer than the building count for a
// smoother left-to-right assembly. Each column is a vertical window onto the
// same image, so the slices tile back into the original panorama.
const COLUMNS = 12;

export function ArchitectureSketch({ projects }: { projects: Project[] }) {
  const reduced = usePrefersReducedMotion();
  if (projects.length === 0) return null;
  if (reduced) return <StaticSketch />;
  return <Scene total={projects.length} />;
}

function Scene({ total }: { total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(total, Math.max(1, Math.ceil(v * total))));
  });

  return (
    <section ref={ref} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="flex flex-1 flex-col pt-[calc(var(--header-h)+clamp(1.5rem,5vh,3.5rem))]">
          {/* Header */}
          <div className="shell-wide flex w-full items-end justify-between gap-6">
            <div className="flex flex-col gap-4">
              <Bracket>Architecture</Bracket>
              <h2 className="font-display text-[clamp(1.6rem,4vw,3rem)] font-light leading-[0.98] tracking-tight">
                Drawn from the ground up.
              </h2>
            </div>
            <span className="shrink-0 font-mono text-2xs uppercase tracking-label text-ink-muted">
              {String(active).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Skyline — full-bleed, sized by the artwork's aspect ratio. Equal
              columns slice the one panorama; they draw in left to right and tile
              back into a single seamless image on black. */}
          <div className="mt-auto w-full px-[var(--gutter)]">
            {/* On phones the panorama is so wide it fits at a tiny height, so
                scale it up from the bottom-centre (the section clips the far
                edges) to give the buildings real presence. Desktop unchanged. */}
            <div className="mx-auto flex origin-bottom scale-[2.2] items-end gap-0 bg-black md:scale-100" style={SKY_STYLE}>
              {Array.from({ length: COLUMNS }, (_, i) => (
                <SketchColumn key={i} progress={scrollYProgress} index={i} total={COLUMNS} />
              ))}
            </div>
          </div>

          <div className="shell-wide flex w-full items-center justify-between py-6 font-mono text-2xs uppercase tracking-label text-ink-muted">
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

function SketchColumn({
  progress,
  index,
  total,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const start = index / total;
  const span = 1 / total;
  const opacity = useTransform(progress, [start, start + span * 0.45], [0, 1], { clamp: true });
  const clipTop = useTransform(progress, [start, start + span * 0.9], [100, 0], { clamp: true });
  const clip = useMotionTemplate`inset(${clipTop}% 0% 0% 0%)`;
  const y = useTransform(progress, [start, start + span * 0.9], [28, 0], { clamp: true });

  return (
    <motion.div style={{ opacity, clipPath: clip, y }} className="h-full flex-1">
      <div
        className="h-full w-full"
        style={{
          backgroundImage: `url(${PANORAMA})`,
          backgroundSize: `${total * 100}% 100%`,
          backgroundPosition: `${total > 1 ? (index / (total - 1)) * 100 : 0}% bottom`,
          backgroundRepeat: "no-repeat",
        }}
      />
    </motion.div>
  );
}

/* Reduced motion — the full skyline shown at rest, no pin, no assembly. */
function StaticSketch() {
  return (
    <section className="bg-black">
      <div className="py-section">
        <div className="shell-wide w-full">
          <Bracket>Architecture</Bracket>
          <h2 className="mt-5 font-display text-[clamp(1.6rem,4vw,3rem)] font-light leading-[0.98] tracking-tight">
            Drawn from the ground up.
          </h2>
        </div>
        <div className="mt-12 w-full px-[var(--gutter)]">
          <div className="relative mx-auto origin-bottom scale-[2.2] bg-black md:scale-100" style={SKY_STYLE}>
            <Image src={PANORAMA} alt="The studio's built work, drawn in line." fill sizes="100vw" className="object-contain object-bottom" />
          </div>
        </div>
        <div className="shell-wide mt-6 flex w-full items-center justify-between font-mono text-2xs uppercase tracking-label text-ink-muted">
          <span>The built work, drawn in line</span>
          <Link href="/projects?type=Architecture" className="link-underline">
            All architecture →
          </Link>
        </div>
      </div>
    </section>
  );
}
