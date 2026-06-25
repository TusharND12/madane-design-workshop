"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  cubicBezier,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import type { Project } from "@/lib/schema";
import { Button } from "@/components/primitives/Button";
import { ProjectTile } from "@/components/projects/ProjectTile";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/* Scroll choreography (fractions of the pinned section) */
const CYCLE_START = 0.14; // device has settled; project cycling begins
const CYCLE_END = 0.74; // last project; the straighten + zoom handoff begins after
const ZOOM_START = 0.78; // monitor straightens, then zooms full + blacks out

export function DeviceShowcase({ projects }: { projects: Project[] }) {
  const reduced = usePrefersReducedMotion();
  if (reduced || projects.length === 0)
    return (
      <div className="shell-wide pb-section">
        <ReducedFallback projects={projects} />
      </div>
    );
  // Lead with a project that has a screen video for immediate impact.
  const ordered = [...projects].sort((a, b) => Number(!!b.screenVideo) - Number(!!a.screenVideo));
  return <Scene projects={ordered} />;
}

function Scene({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const geo = useRef({ top: 0, range: 0 });
  const [active, setActive] = useState(0);
  const N = projects.length;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // A smoothed copy of the scroll progress: every visual transform reads from
  // this, so the monitor trails the scroll with a soft, delayed feel. (Project
  // cycling below still reads the raw progress so it stays accurate.)
  const sp = useSpring(scrollYProgress, { stiffness: 38, damping: 26, mass: 1.1 });

  // Entrance, then a long, eased fade-out on the handoff (no zoom).
  const fadeEase = cubicBezier(...EASE);
  const opacity = useTransform(sp, [0, 0.1, ZOOM_START, 0.98], [0, 1, 1, 0], { ease: [fadeEase, fadeEase, fadeEase], clamp: true });
  // Grows up from its bottom edge on entrance (origin pinned to the base), then
  // softens out as it dissolves.
  const scale = useTransform(sp, [0, 0.18, ZOOM_START, 1], [0.42, 1, 1, 1.04], { ease: [fadeEase, fadeEase, fadeEase], clamp: true });
  const blurPx = useTransform(sp, [0, 0.05, ZOOM_START, 1], [8, 0, 0, 6], { clamp: true });
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  // The monitor turns as you scroll, then straightens to face front before the fade-out.
  const ryBase = useTransform(sp, [CYCLE_START, 0.44, CYCLE_END, ZOOM_START, 1], [-13, 0, 13, 0, 0], { clamp: true });
  // Lifted up during the cycle so the top of the monitor tucks behind the header.
  const liftBase = useTransform(sp, [0, 1], [-178, -178], { clamp: true });
  // The whole frame fades to the page colour for a smooth handoff into the next section.
  const blackout = useTransform(sp, [ZOOM_START, 0.99], [0, 1], { ease: fadeEase, clamp: true });
  const railOpacity = useTransform(sp, [CYCLE_START - 0.06, CYCLE_START, CYCLE_END, CYCLE_END + 0.06], [0, 1, 1, 0], { clamp: true });

  // Active project derived from scroll.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const t = (v - CYCLE_START) / (CYCLE_END - CYCLE_START);
    setActive(Math.min(N - 1, Math.max(0, Math.floor(t * N))));
  });

  // Mouse parallax layered on the scroll-driven turn + lift.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ry = useSpring(useTransform(() => ryBase.get() + mx.get() * 7), { stiffness: 60, damping: 20 });
  const rx = useSpring(useTransform(() => my.get() * -4), { stiffness: 60, damping: 20 });
  const ty = useSpring(useTransform(() => liftBase.get() + my.get() * 10), { stiffness: 60, damping: 20 });
  const tx = useSpring(useTransform(mx, (v) => v * 12), { stiffness: 60, damping: 20 });

  function onMove(e: React.MouseEvent) {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  // Measure scroll geometry for navigation.
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
      const center = CYCLE_START + ((idx + 0.5) / N) * (CYCLE_END - CYCLE_START);
      const y = geo.current.top + center * geo.current.range;
      const lenis = window.__lenis;
      if (lenis && typeof lenis.scrollTo === "function") lenis.scrollTo(y, { duration: 1.1 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    },
    [N]
  );

  // Keyboard arrows (only while the section occupies the viewport).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const { top, range } = geo.current;
      const y = window.scrollY;
      if (y < top - 100 || y > top + range + 100) return;
      if (e.key === "ArrowRight") { e.preventDefault(); navTo(active + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); navTo(active - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navTo]);

  // Swipe / drag to flick between projects.
  const dragStart = useRef<number | null>(null);
  function onPointerDown(e: React.PointerEvent) { dragStart.current = e.clientX; }
  function onPointerUp(e: React.PointerEvent) {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) > 48) navTo(active + (dx < 0 ? 1 : -1));
  }

  const current = projects[active];

  return (
    <div ref={ref} className="relative h-[360vh]" id="work-stage">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Black fade-out as the zoom hands off into the next section */}
        <motion.div style={{ opacity: blackout }} className="pointer-events-none absolute inset-0 z-30 bg-paper" aria-hidden="true" />
        <div
          ref={stageRef}
          onMouseMove={onMove}
          onMouseLeave={reset}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          className="relative flex flex-1 touch-pan-y items-center justify-center [perspective:2000px]"
        >
          {/* Faint grey wave lines behind the monitor (edges fade out) */}
          <WaveLines className="pointer-events-none absolute inset-0 z-0 text-ink" />

          <motion.div
            style={{ opacity, x: tx, y: ty, rotateX: rx, rotateY: ry, filter, transformOrigin: "50% 44%", transformStyle: "preserve-3d" }}
            className="relative z-[1] will-change-transform"
          >
            {/* Entrance grow, anchored to the bottom edge so it rises upward */}
            <motion.div style={{ scale, transformOrigin: "50% 100%" }} className="will-change-transform">
              <div className="scale-[0.25] sm:scale-[0.38] md:scale-[0.5] lg:scale-[0.6] xl:scale-[0.66]">
                <Monitor project={current} active={active} />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Filmstrip rail (clickable progress) */}
        <motion.div style={{ opacity: railOpacity }} className="shell-wide relative z-10 hidden justify-center gap-3 pb-6 md:flex">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => navTo(i)}
              aria-label={`Show ${p.name}`}
              aria-current={i === active}
              className={`group relative h-12 w-[72px] overflow-hidden rounded-sm transition-all duration-300 ease-editorial ${i === active ? "opacity-100 ring-1 ring-ink" : "opacity-40 hover:opacity-80"}`}
            >
              <Image src={p.cover} alt="" fill sizes="72px" className="object-cover" />
              {p.screenVideo && <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-ink mix-blend-difference" aria-hidden="true" />}
            </button>
          ))}
        </motion.div>

        {/* Caption + CTA */}
        <div className="shell-wide relative z-10 flex flex-col gap-5 pb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-h-[60px] flex-col gap-2">
            <span className="font-mono text-2xs tracking-label text-ink-muted">
              {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
            </span>
            <AnimatePresence mode="wait">
              <motion.div key={current.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: EASE }}>
                <Link href={`/projects/${current.slug}`} className="group inline-flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-display text-2xl tracking-tight md:text-3xl">{current.name}</span>
                  <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">{current.type} · {current.city} · {current.year}</span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
          <Button href="/projects" variant="secondary" arrow>View all work</Button>
        </div>

        <div className="pointer-events-none absolute right-[var(--gutter)] top-1/2 hidden -translate-y-1/2 rotate-90 font-mono text-2xs uppercase tracking-label text-ink-muted/50 lg:block">
          Scroll · Drag · ← →
        </div>
      </div>
    </div>
  );
}

/* The monitor mockup (green chroma blackened out), with the project video/still
   mapped edge-to-edge onto the exact screen quad via a perspective homography.
   Exact screen corners in the 1536×1024 image: TL(374,221) TR(1193,116)
   BR(1145,665) BL(343,736). The video box is 1000×630; the matrix maps it exactly. */
const SCREEN_W = 1000;
const SCREEN_H = 630;
const SCREEN_MATRIX =
  "matrix3d(0.74784,-0.11192,0,-0.000059651,-0.039603,0.838048,0,0.0000279794,0,0,1,0,374,221,0,1)";

function Monitor({ project, active }: { project: Project; active: number }) {
  return (
    <div className="relative h-[1024px] w-[1536px]">
      {/* The mockup frame (screen blackened — video replaces it exactly) */}
      <Image
        src="/assets/mockups/monitor-clean.png"
        alt="A Madane project on a studio display."
        width={1536}
        height={1024}
        priority
        unoptimized
        className="pointer-events-none relative z-0 select-none"
      />

      {/* Video mapped ON TOP of the screen via perspective homography */}
      <div
        className="absolute left-0 top-0 z-10 overflow-hidden"
        style={{ width: SCREEN_W, height: SCREEN_H, transform: SCREEN_MATRIX, transformOrigin: "0 0" }}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={project.slug}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {project.screenVideo ? (
              <video className="h-full w-full object-cover brightness-[0.82]" autoPlay muted loop playsInline preload="auto">
                <source src={project.screenVideo} type="video/mp4" />
              </video>
            ) : (
              <div className="kenburns absolute inset-0">
                <Image src={project.cover} alt={project.coverAlt} fill sizes="1000px" className="object-cover brightness-[0.82]" priority={active === 0} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        {/* dim + subtle screen glass */}
        <div className="pointer-events-none absolute inset-0 bg-black/15" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-transparent" aria-hidden="true" />
      </div>
    </div>
  );
}

/* Decorative grey sine-wave lines that sit behind the monitor. Deterministic
   (no random) so SSR and client match; edges fade via a radial mask. */
const WAVE_W = 1440;
const WAVE_H = 900;
const WAVE_PATHS = Array.from({ length: 8 }, (_, i) => {
  const y0 = 90 + i * 96;
  const amp = 14 + i * 3;
  const phase = i * 0.7;
  let d = `M -200 ${y0}`;
  for (let x = -200; x <= WAVE_W + 200; x += 22) {
    const y = y0 + Math.sin((x / WAVE_W) * Math.PI * 3 + phase) * amp;
    d += ` L ${x} ${y.toFixed(1)}`;
  }
  return d;
});

function WaveLines({ className }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        maskImage: "radial-gradient(115% 80% at 50% 46%, #000 38%, transparent 82%)",
        WebkitMaskImage: "radial-gradient(115% 80% at 50% 46%, #000 38%, transparent 82%)",
      }}
    >
      <svg className="h-full w-full" viewBox={`0 0 ${WAVE_W} ${WAVE_H}`} preserveAspectRatio="xMidYMid slice" fill="none">
        <g className="wave-drift">
          {WAVE_PATHS.map((d, i) => (
            <path key={i} d={d} stroke="currentColor" strokeWidth={1} style={{ opacity: 0.05 + i * 0.006 }} />
          ))}
        </g>
      </svg>
    </div>
  );
}

/* Static, accessible fallback for reduced motion */
function ReducedFallback({ projects }: { projects: Project[] }) {
  return (
    <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-24">
      {projects.map((p, i) => (
        <div key={p.slug} className={i % 2 === 1 ? "md:mt-24" : ""}>
          <ProjectTile project={p} index={i + 1} ratio={i % 3 === 0 ? "landscape" : "portrait"} priority={i === 0} />
        </div>
      ))}
    </div>
  );
}
