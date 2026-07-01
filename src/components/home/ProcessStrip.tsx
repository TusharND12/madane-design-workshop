"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getProcess } from "@/lib/cms";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Button } from "@/components/primitives/Button";
import { Reveal } from "@/components/primitives/Reveal";

/** Working method, condensed, horizontal on desktop with a drawing line (PRD H6). */
export function ProcessStrip() {
  const steps = getProcess();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="bg-paper">
      <div className="shell-wide py-section">
        <SectionHeader
          index="04"
          label="Process"
          title="Five steps, no surprises."
          intro="A clear sequence from first conversation to a snag-free handover."
          align="between"
        />

        <div ref={ref} className="relative mt-12 md:mt-16">
          {/* Connecting line (desktop), drawn as you scroll */}
          <div className="absolute left-[10px] right-[10px] top-[34px] hidden h-px bg-hairline lg:block" aria-hidden="true">
            <motion.div className="h-full origin-left bg-ink" style={{ scaleX: lineScale }} />
          </div>

          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {steps.map((step, i) => (
              <Reveal
                as="li"
                key={step.index}
                delay={i * 0.06}
                className="group relative flex flex-col pt-6 lg:pr-6"
              >
                <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full border border-ink bg-paper" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-ink transition-transform duration-500 ease-editorial group-hover:scale-125" />
                </span>
                <span className="mt-6 block font-mono text-2xs tracking-label text-ink-muted">{step.index}</span>
                <h3 className="mt-2 font-display text-2xl tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mt-16">
          <Button href="/process" variant="tertiary" arrow>
            See how we work
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
