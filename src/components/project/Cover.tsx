"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/lib/schema";
import { Bracket } from "@/components/primitives/Bracket";
import { wordReveal, stagger } from "@/lib/motion";

/** Full-bleed cover with mono meta row (PRD P1). */
export function Cover({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const meta = [
    { label: "Discipline", value: project.type },
    { label: "Location", value: project.location },
    { label: "Year", value: String(project.year) },
    { label: "Area", value: project.area },
  ].filter((m) => m.value !== "" && m.value !== null && m.value !== undefined);

  return (
    <section ref={ref} data-invert-zone className="on-ink relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-paper text-ink">
      <motion.div className="absolute inset-0" style={{ scale, y }}>
        <Image src={project.cover} alt={project.coverAlt} fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-paper/45 via-paper/10 to-paper/75" aria-hidden="true" />

      <motion.div style={{ opacity: fade }} className="relative z-10 flex h-full flex-col justify-end">
        <div className="shell-wide pb-[10vh]">
          <motion.div variants={stagger(0.06)} initial="hidden" animate="show">
            <motion.div variants={wordReveal}>
              <Bracket className="text-ink/70">{project.client ? `Client · ${project.client}` : project.type}</Bracket>
            </motion.div>
            <motion.h1 variants={wordReveal} className="mt-6 max-w-[14ch] font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] tracking-tighter">
              {project.name}
            </motion.h1>
            <motion.p variants={wordReveal} className="mt-6 max-w-xl text-lead font-light leading-relaxed text-ink/80">
              {project.narrative.brief}
            </motion.p>
            <motion.dl variants={wordReveal} className="mt-10 flex flex-wrap gap-x-10 gap-y-3 border-t border-ink/20 pt-6 font-mono text-2xs uppercase tracking-label text-ink/75">
              {meta.map((m) => (
                <div key={m.label} className="flex flex-col gap-1">
                  <dt className="text-ink/45">{m.label}</dt>
                  <dd className="text-ink">{m.value}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
