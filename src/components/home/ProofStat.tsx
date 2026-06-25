"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { studio } from "@/content/studio";
import { Bracket } from "@/components/primitives/Bracket";
import { Reveal } from "@/components/primitives/Reveal";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * By the numbers — the studio's record read against its own built work. The four
 * figures count up across the top while a faint line-art skyline (the same
 * drawing used on the home page) rises behind them, so the proof literally
 * stands on the architecture.
 */
export function ProofStat() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="bg-paper" aria-label="By the numbers">
      <div className="shell-wide py-section">
        <Reveal className="flex items-baseline justify-between gap-6">
          <Bracket>By the numbers</Bracket>
          <span className="hidden font-mono text-2xs uppercase tracking-label text-ink-muted sm:block">
            A practice measured in finished rooms
          </span>
        </Reveal>

        <Reveal delay={0.08} className="relative mt-12 overflow-hidden rounded-card border border-hairline bg-mount md:mt-16">
          {/* faint line-art skyline, rising from the base */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[72%]"
            style={{
              backgroundImage: "url(/assets/lineart/skyline.png)",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center bottom",
              opacity: 0.16,
              maskImage: "linear-gradient(to top, #000 42%, transparent)",
              WebkitMaskImage: "linear-gradient(to top, #000 42%, transparent)",
            }}
          />

          {/* the four figures */}
          <div ref={ref} className="relative z-10 grid grid-cols-2 md:grid-cols-4">
            {studio.stats.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  "group relative flex flex-col gap-4 px-6 pt-9 pb-[clamp(6.5rem,18vh,12rem)] md:px-9 md:pt-11",
                  i % 2 === 1 && "border-l border-hairline",
                  i >= 2 && "border-t border-hairline md:border-t-0",
                  i !== 0 && "md:border-l md:border-hairline",
                )}
              >
                <span className="font-mono text-2xs tracking-label text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                <Stat
                  value={s.value}
                  play={inView}
                  className="font-display text-[clamp(3.25rem,7vw,5.5rem)] leading-[0.82] tracking-tighter tabular-nums"
                />
                <span className="block h-px w-8 bg-ink/25 transition-all duration-500 ease-editorial group-hover:w-16" />
                <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
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
