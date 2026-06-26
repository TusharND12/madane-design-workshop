"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The crew — a filmstrip of individual portraits. A wide card pans through the
 * whole team as you scroll, with a gentle 3D tilt. Reduced motion shows the full
 * strip static.
 */
// Sharp composite stitched from the 19 individual high-res studio portraits,
// uniform panels of aspect 0.5 (see scripts/strip note). 9500×1000.
const STRIP = "/assets/team/strip-hd.jpg";
const N = 19;
const PANEL_ASPECT = 0.5;
const IMG_ASPECT = N * PANEL_ASPECT; // 9.5 — strip width / height

// Uniform panels → each person's horizontal centre is evenly spaced (% of width).
const FACES = Array.from({ length: N }, (_, i) => ((i + 0.5) / N) * 100);

const STAGE_ASPECT = 1672 / 665; // wide landscape card (like the previous reel)
const ZOOM = 1.8; // background-size height multiple
const POS_Y = 13; // background vertical position, % (head framing)
const TILT = 6; // resting 3D tilt during the pan (degrees)
const TILT_ENTRY = 12; // stronger tilt while the panel is small
const SCALE_FROM = 0.7; // card size at rest, before scrolling
// NOTE: the studio route is rendered under CSS `zoom: 0.9` (PageZoom), which
// compresses the usable scrollYProgress to ~0.69 at the section's end. So the
// grow-in and pan are mapped into the low end of progress, and the last face is
// held for the remaining scroll before the section unpins.
const P_START = 0.12; // scroll fraction where the grow-in finishes / pan begins
const P_END = 0.6; // scroll fraction where the pan finishes (face 19 reached, then held)

const SX = (ZOOM * IMG_ASPECT) / STAGE_ASPECT; // image width / stage width

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const pad = (n: number) => String(n).padStart(2, "0");

// Pan only starts once the panel has grown to full size.
const panT = (p: number) => clamp((p - P_START) / (P_END - P_START), 0, 1);
function faceFracAt(p: number) {
  const t = panT(p) * (N - 1);
  const i = Math.min(N - 2, Math.floor(t));
  // Dwell on each face, then transition quickly to the next.
  const e = clamp((t - i - 0.3) / 0.4, 0, 1);
  return lerp(FACES[i], FACES[i + 1], e) / 100;
}
// background-position-x (%) that centres image fraction f within the stage.
const bgXFor = (f: number) => clamp((f * SX - 0.5) / (SX - 1), 0, 1);

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
  // Small + strongly tilted at rest → grows to full size and settles as you scroll.
  const scale = useTransform(scrollYProgress, [0, P_START], [SCALE_FROM, 1]);
  const rotateX = useTransform(scrollYProgress, [0, P_START, 1], [TILT_ENTRY, TILT, TILT]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.max(0, Math.min(N - 1, Math.round(panT(p) * (N - 1)))));
  });

  return (
    <div ref={ref} style={{ height: `${N * 16}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center">
        <div className="shell-wide w-full">
        <motion.div
          className="relative aspect-[1672/665] w-full overflow-hidden rounded-card bg-mount"
          style={{
            backgroundImage: `url(${STRIP})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `auto ${ZOOM * 100}%`,
            backgroundPosition,
            scale,
            rotateX,
            transformPerspective: 1100,
          }}
        />

        <div className="mt-6 flex w-full items-center justify-between font-mono text-2xs uppercase tracking-label text-ink-muted">
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
