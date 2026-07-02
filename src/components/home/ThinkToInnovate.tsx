"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Bracket } from "@/components/primitives/Bracket";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * "Think to Innovate", the studio's manifesto poem. As the section scrolls
 * through the viewport the words brighten one after another (a read-along
 * reveal); emphasised lines are bold and the studio name is emphasised too.
 * Monochrome, to sit inside the studio's editorial theme.
 */
type Run = { t: string; bold?: boolean; accent?: boolean };
const RUNS: Run[] = [
  { t: "Here's to the dreamers who shape the oceans, the earth & the sky, " },
  { t: "with minds unbound, they dare to fly. ", bold: true },
  { t: "They build the future, bold and straight, " },
  { t: "guided by the call to think to innovate. ", bold: true },
  { t: "From concrete jungles to serene green, " },
  { t: "they craft the spaces yet unseen. ", bold: true },
  { t: "Each sketch, each line, they cultivate, " },
  { t: "fueled by the drive to think to innovate. ", bold: true },
  { t: "The world's a canvas, vast and wide, " },
  { t: "insane architects, artists and engineers by our side. ", bold: true },
  { t: "They break the rules, make new laws, they recreate, " },
  { t: "with every step, they think to innovate. ", bold: true },
  { t: "Madane Design Workshop ", accent: true },
  { t: "leads the way, " },
  { t: "turning vision into light of day. ", bold: true },
  { t: "No matter the scale, the time, the fate, " },
  { t: "we craft with passion, we think to innovate. ", bold: true },
  { t: "For those who dare to dream, " },
  { t: "who push the norm, who see beyond the common form, ", bold: true },
  { t: "their legacy we celebrate, " },
  { t: "together, we rise and we think to innovate.", bold: true },
];

type Word = { w: string; bold?: boolean; accent?: boolean };
const WORDS: Word[] = RUNS.flatMap((r) =>
  r.t
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => ({ w, bold: r.bold, accent: r.accent }))
);

export function ThinkToInnovate() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });

  return (
    <section ref={ref} className="relative bg-paper">
      <div className="shell-wide py-section">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <Bracket>Think to Innovate</Bracket>
        </motion.div>

        <p className="mx-auto mt-12 max-w-4xl text-center font-display text-[clamp(1.1rem,2.3vw,1.85rem)] font-light leading-[1.65] tracking-tight md:mt-16">
          {WORDS.map((wd, i) => (
            <RevealWord key={i} data={wd} index={i} total={WORDS.length} progress={scrollYProgress} reduced={reduced} />
          ))}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 text-center md:mt-20"
        >
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-ink">Hrishikesh A Madane</p>
          <p className="mt-2 font-mono text-2xs uppercase tracking-[0.34em] text-ink-muted">Madane Design Workshop LLP</p>
        </motion.div>
      </div>
    </section>
  );
}

function RevealWord({
  data,
  index,
  total,
  progress,
  reduced,
}: {
  data: Word;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  // Each word lights up as the scroll progress sweeps past it, over a short
  // trailing window so a few words glow at once.
  const start = index / total;
  const end = Math.min(1, start + 8 / total);
  const opacity = useTransform(progress, [start, end], reduced ? [1, 1] : [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className={data.bold || data.accent ? "font-medium text-ink" : "text-ink"}>
      {data.w}{" "}
    </motion.span>
  );
}
