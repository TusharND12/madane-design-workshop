"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Bracket } from "@/components/primitives/Bracket";
import { Button } from "@/components/primitives/Button";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

/**
 * Approach — a centered editorial statement (AEROTECH-style) whose elements
 * fade in one by one, followed by a supporting manifesto + image card.
 */
export function EditorialQuote() {
  return (
    <section className="relative z-10 -mt-[16vh] rounded-t-[clamp(1.75rem,5vw,3.25rem)] bg-stone shadow-[0_-34px_70px_-26px_rgba(0,0,0,0.7)] md:-mt-[24vh]">
      <div className="shell-wide pt-[clamp(5rem,12vh,9rem)] pb-[clamp(11rem,36vh,26rem)]">
        {/* Centered hero statement — staggered, one element at a time */}
        <motion.div
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.div variants={fadeUp}>
            <Bracket>Approach</Bracket>
          </motion.div>

          <motion.span variants={fadeUp} className="mt-8 font-mono text-2xs uppercase tracking-[0.42em] text-ink-muted">
            Madane Design Workshop
          </motion.span>

          <motion.h2 variants={fadeUp} className="mt-6 font-display text-[clamp(2.75rem,8.5vw,6rem)] font-light leading-[0.95] tracking-tighter">
            Quiet, by design.
          </motion.h2>

          <motion.span variants={fadeUp} className="mt-9 block h-12 w-px bg-ink/25" aria-hidden="true" />

          <motion.p variants={fadeUp} className="mt-9 max-w-prose text-lead font-light leading-relaxed text-ink-muted">
            A space is finished not when there is nothing left to add — but when there is nothing left to remove.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-11">
            <Button href="/studio" variant="secondary" arrow>
              Read our philosophy
            </Button>
          </motion.div>
        </motion.div>

        {/* Supporting row — manifesto + image card, fading in one by one */}
        <motion.div
          variants={stagger(0.16)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-24 grid gap-12 md:mt-32 md:grid-cols-12 md:gap-8"
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-6 md:col-span-4">
            <span className="section-index">01 — Method</span>
            <p className="max-w-prose text-base leading-relaxed text-ink-muted">
              We hold to two neutrals and a single material logic, let daylight do the dramatic work, and detail the
              few things you actually touch to the tolerance of furniture.
            </p>
            <div>
              <Button href="/process" variant="tertiary" arrow>
                How we work
              </Button>
            </div>
          </motion.div>

          <motion.figure variants={fadeUp} className="md:col-span-7 md:col-start-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-mount">
              <Image
                src="/assets/hero/p-56.jpg"
                alt="A completed Madane interior — restraint, daylight and material."
                fill
                sizes="(max-width:768px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 ease-editorial hover:scale-[1.03]"
              />
            </div>
            <figcaption className="mt-4 flex items-center justify-between font-mono text-2xs uppercase tracking-label text-ink-muted">
              <span>Inside the work</span>
              <span>Madane · Design Workshop</span>
            </figcaption>
          </motion.figure>
        </motion.div>
      </div>
    </section>
  );
}
