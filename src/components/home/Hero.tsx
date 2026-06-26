"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Bracket } from "@/components/primitives/Bracket";
import { Button } from "@/components/primitives/Button";
import { EASE, wordReveal, stagger } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const HEADLINE = ["We", "design", "homes,", "inside", "and", "out."];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Slow background scale + parallax drift on scroll (felt, not seen).
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const yMedia = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Mouse parallax — very subtle perspective shift.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 20 });
  const py = useSpring(my, { stiffness: 60, damping: 20 });

  function onMouseMove(e: React.MouseEvent) {
    if (reduced) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 12);
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
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/assets/video/hero-daylight.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </motion.div>

      {/* Legibility scrim — quiet, no gradient colour, just ink falloff */}
      <div className="absolute inset-0 bg-gradient-to-b from-paper/55 via-paper/20 to-paper/70" aria-hidden="true" />
      <div className="absolute inset-0 bg-paper/10" aria-hidden="true" />

      {/* Content */}
      <motion.div style={{ y: yText, opacity }} className="relative z-10 flex h-full flex-col justify-end">
        <div className="shell-wide pb-[14vh]">
          <motion.div variants={stagger(0.04)} initial="hidden" animate="show">
            <motion.div variants={wordReveal}>
              <Bracket className="text-ink/70">Architecture · Interiors · Turnkey</Bracket>
            </motion.div>

            <h1 className="mt-7 max-w-[16ch] font-display text-[clamp(2.75rem,8vw,6rem)] font-medium leading-[0.98] tracking-tighter">
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

            <motion.p variants={wordReveal} className="mt-8 max-w-lead text-lead font-light text-ink/80">
              A quiet, precise design workshop — architecture, interiors and turnkey delivery for living and for work.
            </motion.p>

            <motion.div variants={wordReveal} className="mt-10 flex flex-wrap items-center gap-6">
              <Button href="/projects" variant="secondary" arrow className="border-ink/40 text-ink hover:border-ink hover:bg-ink hover:text-paper">
                See the work
              </Button>
              <Button href="/contact" variant="tertiary" className="text-ink/80">
                Start an enquiry
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
