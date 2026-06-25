"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getServices } from "@/lib/cms";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Services as an expanding-panel accordion (reference: city-strip hero). The four
 * services sit side by side as tall panels; hovering or tapping one grows it to
 * fill the row and fades up its detail. Each panel links into the services page.
 */
export function ServicesCards() {
  const services = getServices();
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section className="bg-paper">
      <div className="shell-wide py-section">
        <SectionHeader
          index="03"
          label="Services"
          title="Four ways we work."
          intro="From a single room to a whole building, designed and — when you want it — delivered."
          align="between"
        />

        {/* Accordion row */}
        <div className="mt-12 flex h-[58vh] min-h-[420px] flex-col gap-1.5 md:mt-20 md:h-[68vh] md:flex-row md:gap-2.5">
          {services.map((s, i) => {
            const isActive = i === active;
            return (
              <Link
                key={s.slug}
                href={`/services#${s.slug}`}
                data-cursor-view
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-label={`${s.title} — ${s.tagline}`}
                className="group relative block overflow-hidden rounded-card bg-mount md:h-full"
                style={{
                  flexGrow: reduced ? 1 : isActive ? 6 : 1,
                  flexBasis: 0,
                  transition: reduced ? undefined : "flex-grow 0.8s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <div className="relative h-[16vh] w-full md:h-full">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes="(max-width:768px) 100vw, 60vw"
                    className={`object-cover transition-all duration-700 ease-editorial group-hover:scale-[1.04] ${
                      isActive ? "grayscale-0 brightness-100" : "grayscale brightness-[0.82]"
                    }`}
                  />
                  {/* Scrim for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-paper/85 via-paper/10 to-paper/15" aria-hidden="true" />

                  {/* Index — always visible */}
                  <span className="absolute left-5 top-4 font-mono text-2xs tracking-label text-ink mix-blend-difference">
                    {s.index}
                  </span>

                  {/* Collapsed: vertical title */}
                  <motion.span
                    animate={{ opacity: isActive ? 0 : 1 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="pointer-events-none absolute inset-x-0 bottom-5 hidden justify-center md:flex"
                  >
                    <span className="font-display text-lg font-light tracking-tight text-ink [writing-mode:vertical-rl] [text-orientation:mixed]">
                      {s.title}
                    </span>
                  </motion.span>

                  {/* Active: full detail */}
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                    transition={{ duration: 0.5, ease: EASE, delay: isActive ? 0.15 : 0 }}
                    className="absolute inset-x-0 bottom-0 p-6 md:p-8"
                  >
                    <h3 className="font-display text-2xl font-medium leading-[0.95] tracking-tight text-ink md:text-4xl">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink/75 md:text-base">{s.tagline}</p>
                    <span className="link-underline mt-5 inline-flex font-mono text-2xs uppercase tracking-label text-ink">
                      Explore
                    </span>
                  </motion.div>

                  {/* Mobile title (collapsed rows) */}
                  <span className="absolute bottom-4 left-5 font-display text-base tracking-tight text-ink md:hidden">
                    {s.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
