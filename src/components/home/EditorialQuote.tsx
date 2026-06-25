"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Bracket } from "@/components/primitives/Bracket";
import { Button } from "@/components/primitives/Button";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

/**
 * Approach — a centered editorial statement (AEROTECH-style) whose elements
 * fade in one by one, followed by a quiet credential ticker, the three working
 * tenets as pillars, and a supporting image.
 */
const MARQUEE = [
  "Architecture",
  "Interiors",
  "Turnkey delivery",
  "BIM-integrated workflows",
  "IGBC green building",
  "USGBC certified",
  "Corporate & commercial",
  "Industrial facilities",
  "Mumbai · since 2008",
];

const PILLARS = [
  { n: "01", title: "Restraint", body: "Two neutrals and a single material logic — nothing on the wall that doesn't earn its place." },
  { n: "02", title: "Daylight", body: "We let light do the dramatic work, and shape each room around how the sun moves through it." },
  { n: "03", title: "Detail", body: "The few things you actually touch are detailed to the tolerance of furniture." },
];

export function EditorialQuote() {
  return (
    <section className="relative z-10 -mt-[16vh] rounded-t-[clamp(1.75rem,5vw,3.25rem)] bg-stone shadow-[0_-34px_70px_-26px_rgba(0,0,0,0.7)] md:-mt-[24vh]">
      <div className="shell-wide pt-[clamp(5rem,12vh,9rem)] pb-[clamp(7rem,20vh,16rem)]">
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

        {/* Credential ticker — quiet, looping proof of range */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 border-y border-ink/10 md:mt-20"
        >
          <CredentialMarquee />
        </motion.div>

        {/* The three working tenets, as pillars */}
        <motion.div
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-20 md:mt-28"
        >
          <motion.span variants={fadeUp} className="section-index">
            01 — Method
          </motion.span>
          <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-ink/10 bg-ink/10 md:grid-cols-3">
            {PILLARS.map((p) => (
              <motion.div key={p.n} variants={fadeUp} className="flex flex-col gap-4 bg-stone p-8 md:p-9">
                <span className="font-mono text-2xs tracking-label text-ink-muted">{p.n}</span>
                <h3 className="font-display text-2xl tracking-tight">{p.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Supporting visual */}
        <motion.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 md:mt-20"
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-card bg-mount">
            <Image
              src="/assets/hero/p-56.jpg"
              alt="A completed Madane interior — restraint, daylight and material."
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 ease-editorial hover:scale-[1.03]"
            />
          </div>
          <figcaption className="mt-4 flex items-center justify-between font-mono text-2xs uppercase tracking-label text-ink-muted">
            <span>Inside the work</span>
            <span>Madane · Design Workshop</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

/* Two identical tracks sliding one full width — seamless, edge-faded loop. */
function CredentialMarquee() {
  const loop = [...MARQUEE, ...MARQUEE];
  return (
    <div
      className="relative overflow-hidden py-5"
      style={{
        maskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
      }}
    >
      <div className="marquee-track flex w-max items-center">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center" aria-hidden={i >= MARQUEE.length}>
            <span className="px-7 font-mono text-2xs uppercase tracking-[0.32em] text-ink-muted">{item}</span>
            <span className="h-[3px] w-[3px] rounded-full bg-ink/30" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
