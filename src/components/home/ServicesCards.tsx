"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import type { Service } from "@/lib/schema";
import { getServices } from "@/lib/cms";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Services as an expanding-panel accordion (reference: city-strip hero). The four
 * services sit side by side as tall panels; the active one grows to fill the row
 * and fades up its detail. On desktop hovering/tapping a panel activates it; on
 * phones the section pins and scrolling steps through the panels. Each links into
 * the services page.
 */
export function ServicesCards() {
  const services = getServices();
  const reduced = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile && !reduced ? <MobileScroll services={services} /> : <DesktopHover services={services} reduced={reduced} />;
}

const TAIL = 0.08;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/* Geometric pin progress → active index (survives the route's smooth scroll). */
function useScrollActive(N: number) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollY } = useScroll();

  const update = () => {
    const el = parentRef.current;
    if (!el) return;
    const range = el.offsetHeight - window.innerHeight;
    if (range <= 0) return;
    const top = el.getBoundingClientRect().top;
    const p = clamp(-top / range / (1 - TAIL), 0, 1);
    setActive(Math.min(N - 1, Math.floor(p * N)));
  };

  useMotionValueEvent(scrollY, "change", update);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { parentRef, active };
}

/* Desktop / fallback: hover or tap a panel to expand it. */
function DesktopHover({ services, reduced }: { services: Service[]; reduced: boolean }) {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-paper">
      <div className="shell-wide py-section">
        <SectionHeader index="03" label="Services" title="Four ways we work." intro="From a single room to a whole building, designed and, when you want it, delivered." align="between" />
        <Hint text="Hover or tap to explore" />
        <Panels
          services={services}
          active={active}
          reduced={reduced}
          onActivate={setActive}
          className="mt-5 flex h-[58vh] min-h-[400px] flex-row gap-1.5 md:mt-7 md:h-[68vh] md:gap-2.5"
        />
      </div>
    </section>
  );
}

/* Mobile: the section pins and scrolling steps the active panel. */
function MobileScroll({ services }: { services: Service[] }) {
  const N = services.length;
  const { parentRef, active } = useScrollActive(N);

  return (
    <section ref={parentRef} className="bg-paper" style={{ height: `${N * 72}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="shell-wide w-full py-6">
          <SectionHeader index="03" label="Services" title="Four ways we work." intro="From a single room to a whole building, designed and, when you want it, delivered." align="between" />
          <Hint text="Scroll to explore" />
          {/* Panels are link-only here (tap = go to the service); scroll drives which one is open */}
          <Panels services={services} active={active} reduced={false} className="mt-5 flex h-[52svh] min-h-[340px] flex-row gap-1.5" />
          <div className="mt-5 flex items-center gap-2">
            {services.map((_, i) => (
              <span key={i} className={`h-px transition-all duration-300 ${i === active ? "w-8 bg-ink" : "w-4 bg-ink/25"}`} />
            ))}
            <span className="ml-auto font-mono text-2xs uppercase tracking-label tabular-nums text-ink-muted">
              {String(active + 1).padStart(2, "0")} <span className="text-ink/30">/</span> {String(N).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Hint({ text }: { text: string }) {
  return (
    <div className="mt-8 flex justify-end md:mt-10">
      <span className="inline-flex items-center gap-2.5 font-mono text-2xs uppercase tracking-label text-ink-muted">
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
        </span>
        {text}
      </span>
    </div>
  );
}

/* The side-by-side expanding panels. `onActivate` (desktop) opens on hover/tap;
   omit it (mobile) to leave opening to scroll and keep tap as plain navigation. */
function Panels({
  services,
  active,
  reduced,
  className,
  onActivate,
}: {
  services: Service[];
  active: number;
  reduced: boolean;
  className: string;
  onActivate?: (i: number) => void;
}) {
  return (
    <div className={className}>
      {services.map((s, i) => {
        const isActive = i === active;
        return (
          <Link
            key={s.slug}
            href={`/services#${s.slug}`}
            data-cursor-view
            onMouseEnter={onActivate ? () => onActivate(i) : undefined}
            onFocus={onActivate ? () => onActivate(i) : undefined}
            onClick={onActivate ? () => onActivate(i) : undefined}
            aria-label={`${s.title}, ${s.tagline}`}
            className="group relative block h-full overflow-hidden rounded-card bg-mount"
            style={{
              flexGrow: reduced ? 1 : isActive ? 6 : 1,
              flexBasis: 0,
              transition: reduced ? undefined : "flex-grow 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="relative h-full w-full">
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

              {/* Index, always visible */}
              <span className="absolute left-5 top-4 font-mono text-2xs tracking-label text-ink mix-blend-difference">{s.index}</span>

              {/* Expand affordance, a "+" on collapsed panels, fades when open */}
              <motion.span
                animate={{ opacity: isActive ? 0 : 1, rotate: isActive ? 45 : 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                aria-hidden="true"
                className="pointer-events-none absolute right-3.5 top-3.5 flex h-7 w-7 items-center justify-center rounded-full border border-ink/45 bg-paper/15 backdrop-blur-sm transition-colors duration-500 group-hover:border-ink"
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="text-ink">
                  <path d="M5.5 0.5v10M0.5 5.5h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </motion.span>

              {/* Collapsed: vertical title */}
              <motion.span
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center"
              >
                <span className="font-display text-base font-light tracking-tight text-ink [writing-mode:vertical-rl] [text-orientation:mixed] md:text-lg">
                  {s.title}
                </span>
              </motion.span>

              {/* Active: full detail */}
              <motion.div
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                transition={{ duration: 0.5, ease: EASE, delay: isActive ? 0.15 : 0 }}
                className="absolute inset-x-0 bottom-0 p-4 md:p-8"
              >
                <h3 className="font-display text-xl font-medium leading-[0.95] tracking-tight text-ink md:text-4xl">{s.title}</h3>
                <p className="mt-2 max-w-prose text-xs leading-relaxed text-ink/75 md:text-base">{s.tagline}</p>
                <span className="link-underline mt-4 inline-flex font-mono text-2xs uppercase tracking-label text-ink md:mt-5">Explore</span>
              </motion.div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
