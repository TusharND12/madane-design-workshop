"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Reveal } from "@/components/primitives/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The crew — the studio group portrait that starts in its original full framing
 * and, as you scroll, eases into a gentle 3D dolly-in: a small zoom with a slight
 * perspective tilt for depth. Reduced motion shows it static.
 */
const ZOOM_END = 1.16; // how far the little zoom pushes in
const TILT_END = 6; // degrees of perspective tilt at the end (the 3D feel)

export function TeamShowcase() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="bg-paper">
      <div className="shell-wide pt-section">
        <SectionHeader
          index="03"
          label="The crew"
          title="The people behind the calm."
          align="between"
          intro="Architects, designers and project leads — the team that turns the studio's quiet into built work."
        />
      </div>

      {reduced ? <GroupStatic /> : <GroupReel />}
    </section>
  );
}

/** Original framing first, then a small 3D zoom as you scroll. */
function GroupReel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const scale = useTransform(scrollYProgress, [0, 1], [1, ZOOM_END]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, TILT_END]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);

  return (
    <div ref={ref} style={{ height: "200vh" }}>
      <div className="sticky top-0 flex h-[100svh] items-center" style={{ perspective: "1100px" }}>
        <div className="shell-wide w-full">
          <motion.div
            className="relative aspect-[1672/665] w-full overflow-hidden rounded-card bg-mount"
            style={{ scale, rotateX, y, transformOrigin: "50% 70%", transformPerspective: 1100 }}
          >
            <Image
              src="/assets/team/group.png"
              alt="The Madane Design Workshop studio team."
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          </motion.div>

          <div className="mt-6 font-mono text-2xs uppercase tracking-label text-ink-muted">The studio team</div>
        </div>
      </div>
    </div>
  );
}

/** Reduced-motion fallback — the group portrait, shown calmly. */
function GroupStatic() {
  return (
    <div className="shell-wide pb-section pt-12">
      <Reveal className="relative aspect-[1672/665] w-full overflow-hidden rounded-card bg-mount">
        <Image
          src="/assets/team/group.png"
          alt="The Madane Design Workshop studio team."
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </Reveal>
    </div>
  );
}
