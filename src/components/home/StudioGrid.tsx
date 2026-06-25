"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Bracket } from "@/components/primitives/Bracket";
import { Button } from "@/components/primitives/Button";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Studio bento grid (AEROTECH-style) — a central brand panel framed by project
 * image cards, manifesto blocks and a gallery strip. Cells fade in one by one.
 */
const cell = "rounded-card border border-hairline";

export function StudioGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  // The grid starts tilted in 3D (like the reference mockup) and "opens" flat
  // as it scrolls up into the page.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rx = useSpring(useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 26, 0]), { stiffness: 90, damping: 26 });
  const ry = useSpring(useTransform(scrollYProgress, [0, 1], [reduced ? 0 : -10, 0]), { stiffness: 90, damping: 26 });
  const tz = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : -210, 0]);
  const gridScale = useTransform(scrollYProgress, [0, 1], [reduced ? 1 : 0.9, 1]);

  return (
    <section
      ref={ref}
      className="relative z-20 -mt-[16vh] rounded-t-[clamp(1.75rem,5vw,3.25rem)] bg-paper shadow-[0_-36px_70px_-30px_rgba(38,38,38,0.2)] md:-mt-[26vh]"
    >
      <div className="shell-wide py-section [perspective:1500px] [perspective-origin:50%_24%]">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="mb-10 flex items-baseline justify-between">
          <Bracket>The Studio · At a glance</Bracket>
          <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">Madane Design Workshop</span>
        </motion.div>

        <motion.div
          style={{ rotateX: rx, rotateY: ry, translateZ: tz, scale: gridScale, transformStyle: "preserve-3d" }}
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-12 md:auto-rows-[210px]"
        >
          {/* Top-left project image */}
          <ImageCell
            className="md:col-span-3 md:col-start-1 md:row-start-1"
            src="/assets/hero/p-30.jpg"
            alt="A Madane workspace — open floor and daylight."
            label="Workspaces"
          />

          {/* Centre brand panel */}
          <motion.div variants={fadeUp} className={`${cell} flex flex-col items-center justify-center bg-mount p-8 text-center sm:col-span-2 md:col-span-6 md:col-start-4 md:row-span-2 md:row-start-1`}>
            <span className="font-mono text-2xs uppercase tracking-[0.42em] text-ink-muted">Design Workshop</span>
            <h2 className="mt-5 font-display text-[clamp(2.75rem,7vw,5rem)] leading-none tracking-tighter">MADANE</h2>
            <span className="mt-5 block h-8 w-px bg-ink/25" aria-hidden="true" />
            <span className="mt-5 font-mono text-2xs uppercase tracking-label text-ink-muted">Architecture · Interiors · Turnkey</span>
            <div className="mt-8">
              <Button href="/studio" variant="secondary" arrow>Explore the studio</Button>
            </div>
            <span className="mt-6 font-mono text-2xs tracking-label text-ink-muted/60">01 — Inside & out</span>
          </motion.div>

          {/* Top-right project image */}
          <ImageCell
            className="md:col-span-3 md:col-start-10 md:row-start-1"
            src="/assets/hero/p-38.jpg"
            alt="A Madane interior — material and light."
            label="Interiors"
          />

          {/* Mid-left manifesto */}
          <motion.div variants={fadeUp} className={`${cell} flex flex-col justify-between bg-stone/60 p-7 md:col-span-3 md:col-start-1 md:row-start-2`}>
            <p className="font-display text-lead leading-snug tracking-tight">
              Two neutrals, one material logic — daylight doing the dramatic work.
            </p>
            <Link href="/studio" className="link-underline font-mono text-2xs uppercase tracking-label text-ink-muted">Our approach →</Link>
          </motion.div>

          {/* Mid-right project image */}
          <ImageCell
            className="md:col-span-3 md:col-start-10 md:row-start-2"
            src="/assets/hero/p-77.jpg"
            alt="A turnkey project delivered by Madane."
            label="Turnkey"
          />

          {/* Gallery strip */}
          <motion.div variants={fadeUp} className={`grid grid-cols-3 gap-4 sm:col-span-2 md:col-span-6 md:col-start-1 md:row-start-3`}>
            {["/assets/slides/p-24.jpg", "/assets/slides/p-48.jpg", "/assets/slides/p-69.jpg"].map((src) => (
              <Link key={src} href="/projects" data-cursor-view className={`group relative overflow-hidden ${cell} aspect-[3/4] sm:aspect-auto`}>
                <Image src={src} alt="Selected Madane frame." fill sizes="180px" className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105" />
              </Link>
            ))}
          </motion.div>

          {/* Bottom-right CTA panel */}
          <motion.div variants={fadeUp} className={`${cell} relative flex flex-col justify-between overflow-hidden bg-sand p-7 sm:col-span-2 md:col-span-6 md:col-start-7 md:row-start-3`}>
            <h3 className="max-w-[14ch] font-display text-2xl leading-tight tracking-tight md:text-3xl">Crafting your vision into space.</h3>
            <div className="flex items-end justify-between gap-4">
              <p className="max-w-[28ch] text-sm leading-relaxed text-ink-muted">
                Whether it&rsquo;s a private home or a working floor, we shape it end to end.
              </p>
              <Button href="/contact" variant="tertiary" arrow>Start a project</Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ImageCell({ className, src, alt, label }: { className: string; src: string; alt: string; label: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      <Link href="/projects" data-cursor-view className={`group relative block h-full overflow-hidden ${cell} aspect-[4/3] md:aspect-auto`}>
        <Image src={src} alt={alt} fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]" />
        <span className="absolute bottom-4 left-4 font-mono text-2xs uppercase tracking-label text-ink mix-blend-difference">{label}</span>
      </Link>
    </motion.div>
  );
}
