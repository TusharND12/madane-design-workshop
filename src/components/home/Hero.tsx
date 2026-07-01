"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Bracket } from "@/components/primitives/Bracket";
import { Button } from "@/components/primitives/Button";
import { EASE, wordReveal, stagger } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const HEADLINE = [
  "We",
  "design",
  "&",
  "build",
  "bespoke",
  "solutions",
  "for",
  "architecture",
  "&",
  "interiors",
  "for",
  "Bharat",
  "&",
  "beyond.",
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Slow background scale + parallax drift on scroll (felt, not seen).
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const yMedia = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Mouse parallax, very subtle perspective shift.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 20 });
  const py = useSpring(my, { stiffness: 60, damping: 20 });

  function onMouseMove(e: React.MouseEvent) {
    if (reduced) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    // Push the perspective harder on big monitors so the shot feels alive there;
    // smaller screens keep the original subtle drift.
    const f = typeof window !== "undefined" && window.innerWidth >= 1600 ? 1.8 : 1;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 18 * f);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 12 * f);
  }

  return (
    <section
      ref={ref}
      data-invert-zone
      onMouseMove={onMouseMove}
      className="on-ink relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-paper text-ink"
      aria-label="Introduction"
    >
      {/* Media */}
      <motion.div className="absolute inset-0" style={{ scale, y: yMedia }}>
        <motion.div className="absolute inset-[-4%]" style={{ x: px, y: py }}>
          <video
            className="hero-cine h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/assets/video/landing-hero-v3.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </motion.div>

      {/* Legibility scrim, quiet, no gradient colour, just ink falloff */}
      <div className="absolute inset-0 bg-gradient-to-b from-paper/55 via-paper/20 to-paper/70" aria-hidden="true" />
      <div className="absolute inset-0 bg-paper/10" aria-hidden="true" />

      {/* Film grade, big monitors only. A cinematic vignette deepens the corners
          and a faint warm bloom rides the upper edge, so the frame reads graded
          and dramatic on large screens. Hidden at ≤1600px (smaller stays clean). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden min-[1600px]:block"
        style={{
          background:
            "radial-gradient(125% 115% at 50% 42%, transparent 48%, rgba(15,15,15,0.30) 76%, rgba(15,15,15,0.62) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden mix-blend-soft-light min-[1600px]:block"
        style={{
          background:
            "radial-gradient(80% 55% at 50% 12%, rgba(214,184,140,0.22), transparent 70%)",
        }}
      />

      {/* Content */}
      <motion.div style={{ y: yText, opacity }} className="relative z-10 flex h-full flex-col justify-end">
        <div className="shell-wide pb-[14vh]">
          <motion.div variants={stagger(0.04)} initial="hidden" animate="show" className="text-center">
            <motion.div variants={wordReveal}>
              <Bracket className="text-ink/70">Architecture · Interiors · Turnkey</Bracket>
            </motion.div>

            <h1 className="mt-7 w-full whitespace-nowrap font-display text-[2.1vw] font-medium leading-[1.05] tracking-tight">
              <motion.span variants={stagger(0.08, 0.1)} initial="hidden" animate="show" className="inline">
                {HEADLINE.map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom">
                    <motion.span variants={wordReveal} className="inline-block pr-[0.28em]">
                      {w}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </h1>

            <motion.p variants={wordReveal} className="mt-2 w-full whitespace-nowrap text-[1.3vw] font-light text-ink/80">
              A quiet, precise design workshop, architecture, interiors and turnkey delivery for living and for work.
            </motion.p>

            <motion.div variants={wordReveal} className="mt-10 flex flex-wrap items-center justify-center gap-6">
              <Button href="/projects" variant="tertiary" arrow className="text-ink">
                Dive in
              </Button>
              <Button href="/lets-talk" variant="tertiary" className="text-ink/80">
                Let&apos;s talk
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute inset-x-0 bottom-7 z-10 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8, ease: EASE }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="font-mono text-[0.55rem] uppercase tracking-label text-ink/60">Scroll</span>
          <motion.span
            className="block h-10 w-px bg-ink/40"
            animate={reduced ? undefined : { scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
