"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { Bracket } from "@/components/primitives/Bracket";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * What we hold to — the studio's four values, drawn as the petals of one flower.
 * As you scroll, the flower spins a turn and settles on the next petal while the
 * matching word and its meaning slide in alongside. Each petal's Sanskrit root
 * counter-rotates so it always stays upright through the spin.
 */
const VALUES = [
  { sa: "न्याय", tr: "Nyāya", en: "Justice", note: "Fairness to the client, the craft and the land." },
  { sa: "धैर्य", tr: "Dhairya", en: "Fortitude", note: "The patience to carry a vision from first line to keys." },
  { sa: "धर्म", tr: "Dharma", en: "Stewardship", note: "Design as duty — to the people and the generations who inherit it." },
  { sa: "ज्ञान", tr: "Jñāna", en: "Knowledge", note: "Rigour, research and craft behind every decision." },
];
const N = VALUES.length;
const STEP = 360 / N; // 90° between petals

export function ValuesFlower() {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <StaticValues />;
  return <Scene />;
}

function Scene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const sp = useSpring(scrollYProgress, { stiffness: 55, damping: 20, mass: 0.9 });

  // A single quarter-turn between values — the flower rotates one petal forward
  // on each scroll step and settles, swapping the word alongside.
  const stops = VALUES.map((_, i) => (N > 1 ? i / (N - 1) : 0));
  const rots = VALUES.map((_, i) => -i * STEP);
  const rot = useTransform(sp, stops, rots);

  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(N - 1, Math.max(0, Math.round(v * (N - 1)))));
  });
  const v = VALUES[active];

  return (
    <section ref={ref} className="relative h-[400vh] bg-stone">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="shell-wide grid w-full items-center gap-10 md:grid-cols-2 md:gap-8">
          {/* Left — the spinning flower */}
          <div className="relative mx-auto flex aspect-square w-full max-w-[clamp(240px,40vw,500px)] items-center justify-center">
            <motion.div className="relative h-full w-full" style={{ rotate: rot }}>
              {/* black petals interleaved behind, for a fuller bloom */}
              {VALUES.map((val, i) => (
                <BlackPetal key={`bp-${val.en}`} index={i} />
              ))}
              {VALUES.map((val, i) => (
                <Petal key={val.en} index={i} rot={rot} active={i === active} sa={val.sa} />
              ))}
              {/* center hub */}
              <span className="absolute left-1/2 top-1/2 h-[14%] w-[14%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/30 bg-stone" />
              <span className="absolute left-1/2 top-1/2 h-[4%] w-[4%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/40" />
            </motion.div>
          </div>

          {/* Right — the active word + meaning */}
          <div className="relative">
            <Bracket>Principles</Bracket>
            <div className="mt-7 flex items-center gap-4 font-mono text-2xs uppercase tracking-label text-ink-muted">
              <span>
                {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-hairline" />
            </div>

            <div className="relative mt-8 min-h-[clamp(230px,40vh,360px)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -22 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="block text-5xl leading-none text-ink/70 md:text-6xl">{v.sa}</span>
                  <span className="mt-6 block font-mono text-2xs uppercase tracking-[0.32em] text-ink-muted">{v.tr}</span>
                  <h3 className="mt-2 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[0.95] tracking-tighter">{v.en}</h3>
                  <p className="mt-6 max-w-prose text-lead font-light leading-relaxed text-ink-muted">{v.note}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* progress dots */}
            <div className="mt-8 flex gap-2">
              {VALUES.map((val, i) => (
                <span
                  key={val.en}
                  className={cn("h-1 rounded-full transition-all duration-500", i === active ? "w-9 bg-ink" : "w-3 bg-ink/25")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlackPetal({ index }: { index: number }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 h-[37%] w-[15%]"
      style={{ transform: `translate(-50%, -50%) rotate(${index * STEP + STEP / 2}deg) translateY(-80%)` }}
      aria-hidden="true"
    >
      <div className="h-full w-full rounded-[50%_50%_50%_50%/62%_62%_38%_38%] border border-ink/10 bg-paper shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)]" />
    </div>
  );
}

function Petal({ index, rot, active, sa }: { index: number; rot: MotionValue<number>; active: boolean; sa: string }) {
  // Counter-rotate the glyph by the flower's total rotation so it stays upright.
  const counter = useTransform(rot, (r) => -(r + index * STEP));
  return (
    <div
      className="absolute left-1/2 top-1/2 h-[42%] w-[19%]"
      style={{ transform: `translate(-50%, -50%) rotate(${index * STEP}deg) translateY(-86%)` }}
    >
      <div
        className={cn(
          "flex h-full w-full items-center justify-center rounded-[50%_50%_50%_50%/62%_62%_38%_38%] border transition-colors duration-500",
          active ? "border-ink/80 bg-ink/[0.08]" : "border-ink/25",
        )}
      >
        <motion.span
          style={{ rotate: counter }}
          className={cn("text-2xl transition-colors duration-500 md:text-3xl", active ? "text-ink" : "text-ink/40")}
        >
          {sa}
        </motion.span>
      </div>
    </div>
  );
}

/* Reduced motion — a calm four-up list, no spin, no pin. */
function StaticValues() {
  return (
    <section className="bg-stone">
      <div className="shell-wide py-section">
        <Bracket>Principles</Bracket>
        <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-ink/10 bg-ink/10 sm:grid-cols-2">
          {VALUES.map((v) => (
            <div key={v.en} className="relative overflow-hidden bg-stone p-8 md:p-10">
              <span aria-hidden="true" className="pointer-events-none absolute -right-3 -top-7 select-none text-[6rem] leading-none text-ink/[0.06] md:text-[8rem]">
                {v.sa}
              </span>
              <div className="relative">
                <span className="font-mono text-2xs uppercase tracking-[0.32em] text-ink-muted">{v.tr}</span>
                <h3 className="mt-3 font-display text-2xl tracking-tight md:text-3xl">{v.en}</h3>
                <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-ink-muted">{v.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
