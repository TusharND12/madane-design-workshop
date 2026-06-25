"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import type { Service } from "@/lib/schema";
import { getServices } from "@/lib/cms";
import { Bracket } from "@/components/primitives/Bracket";
import { Button } from "@/components/primitives/Button";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Services as cinematic, pinned "acts" (Apple iPhone-Pro style). Each service
 * fills the screen — macro image + giant Gantari name — handing off on scroll.
 */
export function ServicesShowcase() {
  const services = getServices();
  const reduced = usePrefersReducedMotion();
  if (reduced) return <Stacked services={services} />;
  return <Scene services={services} />;
}

function Scene({ services }: { services: Service[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const geo = useRef({ top: 0, range: 0 });
  const [active, setActive] = useState(0);
  const N = services.length;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const barScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(N - 1, Math.max(0, Math.floor(v * N + 0.0001))));
  });

  // Mouse parallax on the image.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(useTransform(mx, (v) => v * 26), { stiffness: 60, damping: 20 });
  const py = useSpring(useTransform(my, (v) => v * 18), { stiffness: 60, damping: 20 });
  function onMove(e: React.MouseEvent) {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      geo.current = { top: r.top + window.scrollY, range: el.offsetHeight - window.innerHeight };
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const navTo = useCallback(
    (i: number) => {
      const idx = Math.max(0, Math.min(N - 1, i));
      const y = geo.current.top + ((idx + 0.5) / N) * geo.current.range;
      const lenis = window.__lenis;
      if (lenis && typeof lenis.scrollTo === "function") lenis.scrollTo(y, { duration: 1.1 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    },
    [N]
  );

  const s = services[active];

  return (
    <section ref={ref} className="relative h-[380vh]">
      <div
        ref={stageRef}
        onMouseMove={onMove}
        data-invert-zone
        className="on-ink sticky top-0 flex h-[100svh] flex-col overflow-hidden bg-ink text-paper"
      >
        {/* Macro image, cross-faded per act */}
        <AnimatePresence>
          <motion.div
            key={s.slug}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: EASE }}
          >
            <motion.div className="absolute inset-[-6%]" style={{ x: px, y: py }}>
              <div className="kenburns absolute inset-0">
                <Image src={s.image} alt={s.imageAlt} fill priority={active === 0} sizes="100vw" className="object-cover grayscale brightness-[0.82] contrast-[1.08]" />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Cinematic scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/55" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_40%,transparent_40%,rgba(38,38,38,0.6)_100%)]" aria-hidden="true" />

        {/* Persistent label */}
        <div className="shell-wide relative z-10 flex items-center justify-between pt-[calc(var(--header-h)+1.5rem)]">
          <Bracket className="text-paper/70">Services</Bracket>
          <span className="font-mono text-2xs uppercase tracking-label text-paper/55">Four ways we work</span>
        </div>

        {/* Giant act content */}
        <div className="shell-wide relative z-10 mt-auto pb-[12vh]">
          <span className="pointer-events-none block font-display text-[clamp(5rem,22vw,16rem)] leading-[0.8] text-paper/[0.06]">
            0{active + 1}
          </span>
          <div className="-mt-[6vw]">
            <AnimatePresence mode="wait">
              <motion.div key={s.slug} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.6, ease: EASE }}>
                <span className="block overflow-hidden">
                  <motion.h2
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="font-display text-[clamp(3rem,13vw,12rem)] font-medium leading-[0.85] tracking-tighter"
                  >
                    {s.title}
                  </motion.h2>
                </span>
                <p className="mt-6 max-w-lead text-lead font-light text-paper/75">{s.tagline}</p>
                <p className="mt-2 max-w-prose text-sm text-paper/55">{s.summary}</p>
                <div className="mt-9">
                  <Button href={`/projects?type=${s.filterType}`} variant="secondary" arrow className="border-paper/40 text-paper hover:border-paper hover:bg-paper hover:text-ink">
                    Explore {s.title.toLowerCase()}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right-side act rail */}
        <div className="absolute right-[var(--gutter)] top-1/2 z-10 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex">
          {services.map((sv, i) => (
            <button
              key={sv.slug}
              type="button"
              onClick={() => navTo(i)}
              aria-label={`Show ${sv.title}`}
              aria-current={i === active}
              className={`flex items-center gap-3 font-mono text-2xs uppercase tracking-label transition-all duration-300 ${i === active ? "text-paper" : "text-paper/40 hover:text-paper/70"}`}
            >
              <span>{sv.title}</span>
              <span className={`block h-px transition-all duration-300 ${i === active ? "w-10 bg-paper" : "w-5 bg-paper/40"}`} />
            </button>
          ))}
        </div>

        {/* Scroll progress bar */}
        <div className="absolute inset-x-0 bottom-0 z-10 h-px bg-paper/15">
          <motion.div style={{ scaleX: barScaleX }} className="h-full origin-left bg-paper" />
        </div>
      </div>
    </section>
  );
}

/* Reduced-motion / fallback: stacked dark acts, no pinning. */
function Stacked({ services }: { services: Service[] }) {
  return (
    <section className="on-ink bg-ink text-paper">
      {services.map((s, i) => (
        <div key={s.slug} className="relative flex h-[80svh] min-h-[480px] flex-col justify-end overflow-hidden">
          <Image src={s.image} alt={s.imageAlt} fill sizes="100vw" className="object-cover grayscale brightness-[0.82]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/50" aria-hidden="true" />
          <div className="shell-wide relative z-10 pb-[8vh]">
            <span className="font-mono text-2xs tracking-label text-paper/55">0{i + 1}</span>
            <h2 className="mt-3 font-display text-[clamp(2.5rem,9vw,6rem)] font-medium leading-[0.9] tracking-tighter">{s.title}</h2>
            <p className="mt-4 max-w-lead text-lead font-light text-paper/75">{s.tagline}</p>
            <div className="mt-7">
              <Button href={`/projects?type=${s.filterType}`} variant="secondary" arrow className="border-paper/40 text-paper hover:bg-paper hover:text-ink">
                Explore {s.title.toLowerCase()}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
