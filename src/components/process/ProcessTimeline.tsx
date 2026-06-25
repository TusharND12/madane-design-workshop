"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import type { ProcessStep } from "@/lib/schema";
import { Bracket } from "@/components/primitives/Bracket";

/** Pinned timeline with a line that draws as you scroll (PRD §8.6 / process). */
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(steps.length - 1, Math.floor(v * steps.length + 0.15));
    setActive(idx < 0 ? 0 : idx);
  });

  return (
    <section ref={ref} className="relative bg-paper">
      <div className="shell-wide grid gap-x-8 md:grid-cols-12">
        {/* Sticky rail */}
        <div className="hidden md:col-span-4 md:block">
          <div className="sticky top-[var(--header-h)] flex h-[calc(100svh-var(--header-h))] flex-col justify-center">
            <Bracket>Process</Bracket>
            <div className="mt-8 flex items-start gap-6">
              <div className="relative mt-2 h-48 w-px bg-hairline" aria-hidden="true">
                <motion.div className="absolute left-0 top-0 w-full origin-top bg-ink" style={{ scaleY: lineScaleY, height: "100%" }} />
              </div>
              <div>
                <span className="font-mono text-2xs tracking-label text-ink-muted">{steps[active].index}</span>
                <motion.h2
                  key={steps[active].index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-3 font-display text-4xl leading-none tracking-tighter"
                >
                  {steps[active].title}
                </motion.h2>
                <p className="mt-4 font-mono text-2xs uppercase tracking-label text-ink-muted">
                  Step {active + 1} of {steps.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="md:col-span-7 md:col-start-6">
          {steps.map((step, i) => (
            <div key={step.index} className="flex min-h-[70svh] flex-col justify-center border-t border-hairline py-16 md:min-h-[100svh]">
              <span className="font-mono text-2xs tracking-label text-ink-muted md:hidden">{step.index}</span>
              <h3 className="mt-2 font-display text-4xl leading-none tracking-tighter md:hidden">{step.title}</h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 max-w-prose font-display text-2xl leading-[1.3] tracking-tight md:mt-0 md:text-3xl"
              >
                {step.body}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
