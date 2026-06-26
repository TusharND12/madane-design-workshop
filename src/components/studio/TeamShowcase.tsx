"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The crew — a filmstrip of individual portraits. A portrait card frames one
 * person at a time and pans through the whole team as you scroll, with a gentle
 * 3D tilt and the name + a hand-drawn arrow above each head. Reduced motion shows
 * the full strip static.
 */
const STRIP = "/assets/team/strip.jpg";
const IMG_ASPECT = 8.263; // strip width / height

// Horizontal centre of each person across the strip (left→right, % of width).
const FACES = [1.5, 6.5, 11.7, 16.8, 22.9, 27.8, 33.2, 39.1, 44.2, 50.4, 55, 59.3, 64.6, 69.4, 75.2, 81.1, 85.7, 91.8, 97.7];
const N = FACES.length;

// Left→right names. PLACEHOLDER ORDER — pending the correct order from the studio.
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
  "Priyanka Gupta",
  "Madhuri",
  "Laveena",
  "Chaavi",
  "Pratik",
  "Prince",
];

const STAGE_ASPECT = 0.5; // 1:2 tall card ≈ one portrait panel
const ZOOM = 1.15; // background-size height multiple (frames ~1 person)
const POS_Y = 2; // background vertical position, % (head framing)
const HEAD_SY = 0.3; // focused head's vertical position on screen (0..1)
const ARROW_TOP = 9; // % from top where the arrow starts
const TILT = 6; // degrees of 3D tilt
const P_END = 0.94; // scroll fraction where the pan finishes

const SX = (ZOOM * IMG_ASPECT) / STAGE_ASPECT; // image width / stage width

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const pad = (n: number) => String(n).padStart(2, "0");

const panT = (p: number) => clamp(p / P_END, 0, 1);
function faceFracAt(p: number) {
  const t = panT(p) * (N - 1);
  const i = Math.min(N - 2, Math.floor(t));
  // Dwell on each face, then transition quickly to the next.
  const e = clamp((t - i - 0.3) / 0.4, 0, 1);
  return lerp(FACES[i], FACES[i + 1], e) / 100;
}
// background-position-x (%) that centres image fraction f within the stage.
const bgXFor = (f: number) => clamp((f * SX - 0.5) / (SX - 1), 0, 1);
// On-screen x (0..1) of the focused face, accounting for the clamped pan ends.
function headScreenX(p: number) {
  const f = faceFracAt(p);
  const pbg = bgXFor(f);
  const visibleCentre = (0.5 + (SX - 1) * pbg) / SX;
  return clamp(0.5 + (f - visibleCentre) * SX, 0.13, 0.87);
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

      {reduced ? <StripStatic /> : <StripReel />}
    </section>
  );
}

/** Portrait card that pans through the strip, one person at a time. */
function StripReel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  const posX = useTransform(scrollYProgress, (p) => `${bgXFor(faceFracAt(p)) * 100}%`);
  const backgroundPosition = useMotionTemplate`${posX} ${POS_Y}%`;
  const rotateX = useTransform(scrollYProgress, [0, 0.05, 1], [0, TILT, TILT]);
  const headX = useTransform(scrollYProgress, (p) => `${headScreenX(p) * 100}%`);
  const arrowH = `${HEAD_SY * 100 - ARROW_TOP}%`;

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.max(0, Math.min(N - 1, Math.round(panT(p) * (N - 1)))));
  });

  return (
    <div ref={ref} style={{ height: `${N * 16}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center">
        <motion.div
          className="relative aspect-[1/2] w-full max-w-[clamp(14rem,32vw,20rem)] overflow-hidden rounded-card bg-mount"
          style={{
            backgroundImage: `url(${STRIP})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `auto ${ZOOM * 100}%`,
            backgroundPosition,
            rotateX,
            transformPerspective: 1100,
          }}
        >
          {/* Name + hand-drawn arrow in the space above the focused head */}
          <div className="pointer-events-none absolute inset-0 z-10 text-[#1c1712]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <motion.span
                  className="absolute top-[3%] -translate-x-1/2 whitespace-nowrap font-display text-[clamp(0.85rem,3.4vw,1.25rem)] font-medium tracking-tight"
                  style={{ left: headX }}
                >
                  {NAMES[active]}
                </motion.span>
                <motion.div className="absolute -translate-x-1/2" style={{ left: headX, top: `${ARROW_TOP}%`, height: arrowH }}>
                  <ArrowDoodle className="h-full w-auto" />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="mt-6 flex w-full max-w-[clamp(14rem,32vw,20rem)] items-center justify-between font-mono text-2xs uppercase tracking-label text-ink-muted">
          <span>The studio team</span>
          <span>
            {pad(active + 1)} <span className="text-ink/30">/ {pad(N)}</span>
          </span>
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
      viewBox="0 0 50 66"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      <path d="M33 4C44 16 20 22 31 33c9 10-11 15-2 25" />
      <path d="M29 62l-9-4M29 62l5-8" />
    </svg>
  );
}

/** Reduced-motion fallback — the whole strip, shown calmly. */
function StripStatic() {
  return (
    <div className="shell-wide pb-section pt-12">
      <div className="relative w-full overflow-hidden rounded-card bg-mount" style={{ aspectRatio: String(IMG_ASPECT) }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={STRIP} alt="The Madane Design Workshop studio team." className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
