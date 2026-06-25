"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { studio } from "@/content/studio";
import { Bracket } from "@/components/primitives/Bracket";
import { Reveal } from "@/components/primitives/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Quiet credibility block — one hero figure carries the headline, a supporting
 * trio reads beneath it like a printed ledger (asymmetric, magazine hierarchy).
 */
export function ProofStat() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const [hero, ...rest] = studio.stats;

  return (
    <section className="bg-paper" aria-label="By the numbers">
      <div className="shell-wide py-section">
        <Reveal className="flex items-baseline justify-between gap-6">
          <Bracket>By the numbers</Bracket>
          <span className="hidden font-mono text-2xs uppercase tracking-label text-ink-muted sm:block">
            A practice measured in finished rooms
          </span>
        </Reveal>

        <div ref={ref} className="mt-12 grid gap-4 md:mt-16 md:grid-cols-12 md:gap-6">
          {/* Hero figure */}
          <Reveal className="md:col-span-5">
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-card border border-hairline bg-mount p-8 md:p-10">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-10 font-display text-[12rem] leading-none tracking-tighter text-ink/[0.035] md:text-[15rem]"
              >
                01
              </span>
              <span className="relative z-10 font-mono text-2xs uppercase tracking-label text-ink-muted">
                The headline figure
              </span>
              <div className="relative z-10 mt-10">
                <Stat
                  value={hero.value}
                  play={inView}
                  className="font-display text-[clamp(4.5rem,13vw,9rem)] leading-[0.85] tracking-tighter tabular-nums"
                />
                <span className="mt-6 block h-px w-10 bg-ink/25 transition-all duration-500 ease-editorial group-hover:w-24" />
                <span className="mt-5 block font-mono text-2xs uppercase tracking-label text-ink-muted">
                  {hero.label}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Supporting trio — ledger rows */}
          <Reveal delay={0.12} className="md:col-span-7">
            <div className="flex h-full flex-col rounded-card border border-hairline bg-mount px-8 md:px-10">
              {rest.map((s, i) => (
                <div
                  key={s.label}
                  className={`group flex flex-1 items-baseline justify-between gap-6 py-6 md:py-8 ${
                    i > 0 ? "border-t border-hairline" : ""
                  }`}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="font-mono text-2xs tracking-label text-ink-muted">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <Stat
                      value={s.value}
                      play={inView}
                      className="font-display text-5xl leading-none tracking-tighter tabular-nums md:text-6xl"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="hidden h-px w-6 bg-ink/20 transition-all duration-500 ease-editorial group-hover:w-12 sm:block" />
                    <span className="text-right font-mono text-2xs uppercase tracking-label text-ink-muted">
                      {s.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, play, className }: { value: string; play: boolean; className?: string }) {
  const reduced = usePrefersReducedMotion();
  const { hasMatch, target, suffix, decimals } = useMemo(() => {
    const m = value.match(/^([\d.]+)(.*)$/);
    return {
      hasMatch: !!m,
      target: m ? parseFloat(m[1]) : 0,
      suffix: m ? m[2] : "",
      decimals: m && m[1].includes(".") ? 1 : 0,
    };
  }, [value]);
  const [n, setN] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!play || reduced || !hasMatch) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const DUR = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DUR);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, reduced, target, hasMatch]);

  return (
    <span className={`relative z-10 ${className ?? ""}`}>
      {hasMatch ? n.toFixed(decimals) : value}
      <span className="text-ink-muted">{suffix}</span>
    </span>
  );
}
