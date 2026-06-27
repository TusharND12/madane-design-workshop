"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";

type Step = { year: string; title: string; body: string };

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const TAIL = 0.08;
const PAD = "clamp(1.5rem,6vw,6rem)";

/**
 * Five-year roadmap as a pinned section: scrolling vertically slides the year
 * panels across horizontally (yodezeen scroll move). Geometric progress so it is
 * robust to any page transforms.
 */
export function RoadmapScroll({ items }: { items: Step[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const maxX = useRef(0);
  const { scrollY } = useScroll();
  const x = useMotionValue(0);

  const update = () => {
    const parent = parentRef.current;
    if (!parent) return;
    const range = parent.offsetHeight - window.innerHeight;
    if (range <= 0) return;
    const top = parent.getBoundingClientRect().top;
    const p = clamp(-top / range / (1 - TAIL), 0, 1);
    x.set(-maxX.current * p);
  };

  useMotionValueEvent(scrollY, "change", update);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!track || !stage) return;
      const padRight = parseFloat(getComputedStyle(track).paddingRight) || 0;
      maxX.current = Math.max(0, track.scrollWidth - stage.clientWidth + padRight);
      update();
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={parentRef} className="relative bg-stone/40" style={{ height: `${items.length * 60 + 30}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="shell-wide flex items-baseline justify-between pb-[clamp(2rem,5vh,4rem)]">
          <h2 className="max-w-[16ch] font-display text-[clamp(1.75rem,4.5vw,3.5rem)] font-medium leading-[1] tracking-tight">
            A five-year sustainability strategy.
          </h2>
          <span className="hidden font-mono text-2xs uppercase tracking-label text-ink-muted md:block">02 · Roadmap</span>
        </div>

        <div ref={stageRef} className="w-full overflow-hidden">
          <motion.div ref={trackRef} style={{ x, paddingLeft: PAD, paddingRight: PAD }} className="flex gap-[clamp(1.5rem,4vw,3.5rem)]">
            {items.map((s, i) => (
              <div key={s.year} className="w-[78vw] shrink-0 border-t border-hairline pt-6 sm:w-[52vw] lg:w-[34vw]">
                <span className="block font-display text-[clamp(3.5rem,9vw,7rem)] leading-none tracking-tighter text-ink/80">{s.year}</span>
                <h3 className="mt-6 font-display text-2xl tracking-tight md:text-3xl">{s.title}</h3>
                <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-muted">{s.body}</p>
                <span className="mt-7 block font-mono text-2xs uppercase tracking-label text-ink-muted">
                  {String(i + 1).padStart(2, "0")} <span className="text-ink/30">/ {String(items.length).padStart(2, "0")}</span>
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
