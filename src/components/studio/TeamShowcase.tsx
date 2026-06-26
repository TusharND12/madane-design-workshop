"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Reveal } from "@/components/primitives/Reveal";
import { EASE } from "@/lib/motion";
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

// Left→right names of the people in the group photo. PLACEHOLDER ORDER — pending
// the correct order from the studio.
const NAMES = [
  "Nidhi Jain",
  "Shatbdi Ojha",
  "Mahesh Khandekar",
  "Ajay Gupta",
  "Nikita Rane",
  "Aishwarya Joil",
  "Ravindra",
  "Harshad",
  "Komal Kharat",
  "Vaishnavi",
  "Shweta",
  "Ajinkya",
  "Aasawari",
];

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

  // Where the focused head sits on screen — drives the name + arrow position.
  const headX = useTransform(scrollYProgress, (p) => {
    const s = scaleAt(p);
    const fxf = focusXAt(p) / 100;
    const tx = clamp(0.5 - s * fxf, 1 - s, 0);
    return `${clamp(s * fxf + tx, 0.18, 0.82) * 100}%`;
  });

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

            {/* Name in the vacant space above the head, with a hand-drawn arrow */}
            <motion.div
              className="pointer-events-none absolute top-[4%] z-10 flex flex-col items-center text-center text-[#1c1712]"
              style={{ left: headX, x: "-50%" }}
            >
              <AnimatePresence mode="wait">
                {active >= 0 && (
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.32, ease: EASE }}
                    className="flex flex-col items-center"
                  >
                    <span className="whitespace-nowrap font-display text-[clamp(0.95rem,1.9vw,1.65rem)] font-medium tracking-tight">
                      {NAMES[active]}
                    </span>
                    <ArrowDoodle className="mt-1 h-[clamp(2.75rem,7vw,4.75rem)] w-auto" />
                  </motion.div>
                )}
              </AnimatePresence>
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

/** Hand-drawn squiggle arrow pointing down from the name to the head. */
function ArrowDoodle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 50 76"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M33 4C44 16 20 22 31 35c9 10-11 15-2 25" />
      <path d="M29 65l-9-4M29 65l5-8" />
    </svg>
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
