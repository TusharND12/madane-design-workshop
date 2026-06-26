"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Reveal } from "@/components/primitives/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The crew — the studio group portrait, brought to life by a scroll-driven
 * camera that zooms in and pans across the photo, settling on one face at a
 * time. One image; the scroll is the dolly. Reduced motion shows it static.
 */

// Horizontal centre of each face across the group photo (left→right, % of width).
const FACES = [6, 14, 21, 29, 37, 44, 52, 60, 68, 76, 83, 90, 95];
const FOCUS_Y = 50; // vertical centre of the face row, % of the photo height
const ZOOM = 3.4;

const pad = (n: number) => String(n).padStart(2, "0");

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

/** Scroll-driven zoom + pan across the faces of the group photo. */
function GroupReel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const N = FACES.length;

  // Centre each face: with transform-origin top-left and scale Z, the face at x%
  // lands at frame centre when translateX = 50 − Z·x%. Clamp so the photo always
  // fills the frame (end faces sit toward the edge instead of leaving a gap).
  const minX = (1 - ZOOM) * 100;
  const clampX = (v: number) => Math.min(0, Math.max(minX, v));
  const inputs = FACES.map((_, i) => i / (N - 1));
  const x = useTransform(
    scrollYProgress,
    inputs,
    FACES.map((fx) => `${clampX(50 - ZOOM * fx)}%`)
  );
  const y = `${50 - ZOOM * FOCUS_Y}%`;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.max(0, Math.min(N - 1, Math.round(v * (N - 1)))));
  });

  return (
    <div ref={ref} style={{ height: `${N * 22}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center">
        <div className="shell-wide w-full">
          <div className="relative aspect-[1672/665] w-full overflow-hidden rounded-card bg-mount">
            <motion.div className="absolute inset-0 origin-top-left" style={{ x, y, scale: ZOOM }}>
              <Image
                src="/assets/team/group.png"
                alt="The Madane Design Workshop studio team."
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="mt-6 flex items-center justify-between font-mono text-2xs uppercase tracking-label text-ink-muted">
            <span>The studio team</span>
            <span>
              {pad(active + 1)} <span className="text-ink/30">/ {pad(N)}</span>
            </span>
          </div>
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
