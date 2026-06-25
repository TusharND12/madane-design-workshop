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
          {/* faint Warli-art scene rising from the base */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[86%] text-ink"
            style={{
              maskImage: "linear-gradient(to top, #000 48%, transparent)",
              WebkitMaskImage: "linear-gradient(to top, #000 48%, transparent)",
            }}
          >
            <WarliScene className="absolute inset-0 h-full w-full opacity-[0.16]" />
          </div>

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

/* ------------------------------------------------------------------ */
/*  Warli art — a faint tribal frieze (Maharashtra) drawn in line:     */
/*  the tarpa dancers, trees, huts and sun. Background ornament only.   */
/* ------------------------------------------------------------------ */
const GROUND = 262;
const DANCER_XS = [430, 540, 650, 760, 870];

function WarliScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 300"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      aria-hidden="true"
    >
      {/* ground */}
      <line x1="0" y1={GROUND} x2="1200" y2={GROUND} strokeWidth={1.5} />
      <line x1="0" y1={GROUND + 9} x2="1200" y2={GROUND + 9} strokeWidth={1} opacity={0.45} />

      {/* sun + rays */}
      <circle cx={1086} cy={74} r={22} />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={1086 + Math.cos(a) * 28}
            y1={74 + Math.sin(a) * 28}
            x2={1086 + Math.cos(a) * 38}
            y2={74 + Math.sin(a) * 38}
          />
        );
      })}

      {/* huts */}
      <Hut x={86} w={66} h={56} />
      <Hut x={190} w={52} h={44} />

      {/* trees */}
      <WarliTree x={306} h={152} />
      <WarliTree x={968} h={172} />

      {/* the tarpa dance */}
      {DANCER_XS.map((x) => (
        <Dancer key={x} x={x} />
      ))}

      {/* a bird in flight */}
      <g>
        <path d="M 1132 128 q 13 -11 26 0" />
        <path d="M 1158 128 q 13 -11 26 0" />
      </g>
    </svg>
  );
}

function Dancer({ x }: { x: number }) {
  const h = 86;
  const w = 14;
  const headY = GROUND - h;
  const shoulderY = GROUND - h * 0.8;
  const waistY = GROUND - h * 0.46;
  const hipY = GROUND - h * 0.14;
  return (
    <g>
      <circle cx={x} cy={headY} r={7} />
      <line x1={x} y1={headY + 7} x2={x} y2={shoulderY} />
      {/* hourglass torso (filled) */}
      <polygon points={`${x - w},${shoulderY} ${x + w},${shoulderY} ${x},${waistY}`} fill="currentColor" stroke="none" />
      <polygon points={`${x},${waistY} ${x - w},${hipY} ${x + w},${hipY}`} fill="currentColor" stroke="none" />
      {/* legs */}
      <line x1={x - w * 0.5} y1={hipY} x2={x - w * 1.5} y2={GROUND} />
      <line x1={x + w * 0.5} y1={hipY} x2={x + w * 1.5} y2={GROUND} />
      {/* arms raised in dance */}
      <line x1={x} y1={shoulderY + 3} x2={x - 30} y2={shoulderY - 16} />
      <line x1={x} y1={shoulderY + 3} x2={x + 30} y2={shoulderY - 16} />
    </g>
  );
}

function WarliTree({ x, h }: { x: number; h: number }) {
  const topY = GROUND - h;
  return (
    <g>
      <line x1={x} y1={GROUND} x2={x} y2={topY + 6} />
      {[0.45, 0.62, 0.78].map((f, i) => {
        const y = GROUND - h * f;
        const len = 26 - i * 5;
        return (
          <g key={i}>
            <line x1={x} y1={y} x2={x - len} y2={y - len * 0.6} />
            <line x1={x} y1={y} x2={x + len} y2={y - len * 0.6} />
          </g>
        );
      })}
      <circle cx={x} cy={topY} r={11} />
      <circle cx={x - 15} cy={topY + 9} r={8} />
      <circle cx={x + 15} cy={topY + 9} r={8} />
    </g>
  );
}

function Hut({ x, w, h }: { x: number; w: number; h: number }) {
  const top = GROUND - h;
  return (
    <g>
      <rect x={x} y={top} width={w} height={h} />
      <polygon points={`${x - 8},${top} ${x + w + 8},${top} ${x + w / 2},${top - 26}`} fill="currentColor" stroke="none" />
      <line x1={x + w / 2} y1={GROUND} x2={x + w / 2} y2={top} strokeWidth={1} opacity={0.5} />
    </g>
  );
}
