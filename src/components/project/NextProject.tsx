"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/lib/schema";
import { Bracket } from "@/components/primitives/Bracket";
import { ProjectTile } from "@/components/projects/ProjectTile";

/** "Next project" full-bleed continuation + related tiles (PRD P5). */
export function NextProject({ next, related }: { next: Project; related: Project[] }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <>
      {related.length > 0 && (
        <section className="bg-paper">
          <div className="shell-wide py-section">
            <Bracket>Related work</Bracket>
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <ProjectTile key={p.slug} project={p} index={i + 1} ratio="landscape" />
              ))}
            </div>
          </div>
        </section>
      )}

      <Link ref={ref} href={`/projects/${next.slug}`} data-cursor-view className="group on-ink relative block h-[80vh] min-h-[520px] w-full overflow-hidden bg-paper text-ink">
        <motion.div className="absolute inset-0" style={{ scale }}>
          <Image src={next.cover} alt={next.coverAlt} fill sizes="100vw" className="object-cover opacity-70 transition-opacity duration-700 group-hover:opacity-85" />
        </motion.div>
        <div className="absolute inset-0 bg-paper/40" aria-hidden="true" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <Bracket className="text-ink/60">Next project</Bracket>
          <span className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-none tracking-tighter">{next.name}</span>
          <span className="mt-6 font-mono text-2xs uppercase tracking-label text-ink/70">{next.type} · {next.city} · {next.year}</span>
        </div>
      </Link>
    </>
  );
}
