"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Reveal } from "@/components/primitives/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The crew — the studio group portrait. It opens in its original full framing,
 * then on scroll does a gentle 3D dolly-in and pans face to face, settling on one
 * person at a time with a slight perspective tilt for depth. Reduced motion shows
 * it static.
 */

// Horizontal centre of each face across the group photo (left→right, % of width).
const FACES = [6, 14, 21, 29, 37, 44, 52, 60, 68, 76, 83, 90, 95];
const N = FACES.length;

const ZOOM = 2.2; // zoom level once focused on a face
const TILT = 6; // degrees of 3D perspective tilt while zoomed
const FOCUS_FULL = 50; // vertical centre for the full group
const FOCUS_FACE = 47; // vertical centre for the face row
const P_INTRO = 0.12; // scroll fraction spent zooming in from the full group
const P_END = 0.95; // scroll fraction where the pan finishes

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const pad = (n: number) => String(n).padStart(2, "0");

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function scaleAt(p: number) {
  return p <= P_INTRO ? lerp(1, ZOOM, p / P_INTRO) : ZOOM;
}
function panT(p: number) {
  return clamp((p - P_INTRO) / (P_END - P_INTRO), 0, 1);
}
function focusXAt(p: number) {
  if (p <= P_INTRO) return lerp(FOCUS_FULL, FACES[0], p / P_INTRO);
  const f = panT(p) * (N - 1);
  const i = Math.min(N - 2, Math.floor(f));
  return lerp(FACES[i], FACES[i + 1], f - i);
}
function focusYAt(p: number) {
  return p <= P_INTRO ? lerp(FOCUS_FULL, FOCUS_FACE, p / P_INTRO) : FOCUS_FACE;
}

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

/** Original framing → 3D zoom-in → face-by-face pan. */
function GroupReel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(-1);

  // Inner layer: zoom + pan, centred via transform-origin top-left.
  const scale = useTransform(scrollYProgress, scaleAt);
  const x = useTransform(scrollYProgress, (p) => {
    const s = scaleAt(p);
    return `${clamp(50 - s * focusXAt(p), (1 - s) * 100, 0)}%`;
  });
  const y = useTransform(scrollYProgress, (p) => {
    const s = scaleAt(p);
    return `${clamp(50 - s * focusYAt(p), (1 - s) * 100, 0)}%`;
  });
  // Outer layer: the 3D tilt, about centre.
  const rotateX = useTransform(scrollYProgress, [0, P_INTRO, 1], [0, TILT, TILT]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(p < P_INTRO ? -1 : Math.round(panT(p) * (N - 1)));
  });

  return (
    <div ref={ref} style={{ height: `${N * 22}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center">
        <div className="shell-wide w-full">
          <motion.div
            className="relative aspect-[1672/665] w-full overflow-hidden rounded-card bg-mount"
            style={{ rotateX, transformPerspective: 1100 }}
          >
            <motion.div className="absolute inset-0 origin-top-left" style={{ x, y, scale }}>
              <Image
                src="/assets/team/group.png"
                alt="The Madane Design Workshop studio team."
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          <div className="mt-6 flex items-center justify-between font-mono text-2xs uppercase tracking-label text-ink-muted">
            <span>The studio team</span>
            <span>{active < 0 ? "—" : <>{pad(active + 1)} <span className="text-ink/30">/ {pad(N)}</span></>}</span>
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
