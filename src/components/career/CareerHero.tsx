"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Bracket } from "@/components/primitives/Bracket";
import { wordReveal, stagger } from "@/lib/motion";

const HEADLINE = ["Today", "we're", "busy", "designing", "what's", "next."];

/**
 * Careers hero (yodezeen.com/career style): a full-bleed studio video drifts and
 * scales on scroll behind an animated, word-by-word headline.
 */
export function CareerHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const yMedia = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      data-invert-zone
      className="on-ink relative flex h-[92svh] min-h-[560px] w-full items-end overflow-hidden bg-paper text-ink"
      aria-label="Careers"
    >
      <motion.div className="absolute inset-0" style={{ scale, y: yMedia }}>
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="auto">
          <source src="/assets/video/career-roles.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Legibility scrims */}
      <div className="absolute inset-0 bg-gradient-to-t from-paper/85 via-paper/30 to-paper/45" aria-hidden="true" />
      <div className="absolute inset-0 bg-paper/10" aria-hidden="true" />

      <motion.div style={{ y: yText, opacity }} className="relative z-10 shell-wide pb-[12vh]">
        <motion.div variants={stagger(0.04)} initial="hidden" animate="show">
          <motion.div variants={wordReveal}>
            <Bracket className="text-ink/70">Careers</Bracket>
          </motion.div>

          <h1 className="mt-7 max-w-[15ch] font-display text-[clamp(2.6rem,8vw,6.5rem)] font-medium uppercase leading-[0.98] tracking-tight">
            <motion.span variants={stagger(0.08, 0.1)} initial="hidden" animate="show" className="inline">
              {HEADLINE.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                  <motion.span variants={wordReveal} className="inline-block pr-[0.26em]">
                    {w}
                  </motion.span>
                </span>
              ))}
            </motion.span>
          </h1>

          <motion.p variants={wordReveal} className="mt-8 max-w-prose text-lead font-light text-ink/80">
            We design and deliver architecture and interiors for Fortune 100 companies across India — and we are always glad to meet people who want to build with us.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute inset-x-0 bottom-7 z-10 flex justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="font-mono text-[0.55rem] uppercase tracking-label text-ink/60">Scroll</span>
          <motion.span
            className="block h-10 w-px bg-ink/40"
            animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      </div>
    </section>
  );
}
