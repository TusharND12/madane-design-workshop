"use client";

import { createContext, useContext, useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, type MotionValue } from "framer-motion";
import type { ProcessStep } from "@/lib/schema";
import { Bracket } from "@/components/primitives/Bracket";

/**
 * Process as a build: on desktop the stage is pinned and scroll-scrubbed, and a
 * 3D double-storey house assembles part-by-part — foundation, ground storey,
 * upper storey, gable roof, then door/windows — one part per process step, while
 * the whole thing turns a full 360° (PRD §8.6). The step list brightens in step
 * with the part being built; the detail grid then fades in below. Mobile falls
 * back to a vertical icon spine. All motion is gated by the global reduced-motion
 * switch upstream, so it animates on every platform.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const INK = "236, 236, 230"; // --ink rgb
const WARM = "226, 190, 132"; // soft brass — lit windows at handover

// House geometry (px, model space; +y is down). The whole thing is roughly
// centred on the origin so it spins around its own vertical axis.
const HW = 140; // house width
const HD = 110; // house depth
const EAVE = -42; // top of the upper storey / roof base
const RH = 56; // ridge height above the eave
const PITCH = (Math.atan(RH / (HD / 2)) * 180) / Math.PI; // roof pitch, degrees
const SLANT = Math.sqrt((HD / 2) ** 2 + RH ** 2); // length of a roof slope

function StepIcon({ i }: { i: number }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (i) {
    case 0: // Discovery — magnifier
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" />
          <line x1="20.5" y1="20.5" x2="16" y2="16" />
        </svg>
      );
    case 1: // Concept — lightbulb
      return (
        <svg {...common} aria-hidden="true">
          <path d="M9 18h6" />
          <path d="M10 21h4" />
          <path d="M12 3a6 6 0 0 0-3.8 10.6c.6.5 1 1.3 1 2.1v.3h5.6v-.3c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 3Z" />
        </svg>
      );
    case 2: // Design Development — layers
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 3 3 8l9 5 9-5-9-5Z" />
          <path d="M3 13l9 5 9-5" />
        </svg>
      );
    case 3: // Execution — gear
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="12" r="3.2" />
          <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.1 5.1l2.1 2.1M16.8 16.8l2.1 2.1M18.9 5.1l-2.1 2.1M7.2 16.8l-2.1 2.1" />
        </svg>
      );
    default: // Handover — check
      return (
        <svg {...common} aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      );
  }
}

function NodeCircle({ i }: { i: number }) {
  return (
    <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-hairline bg-mount text-ink shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]">
      <span className="absolute inset-1 rounded-full border border-white/5" aria-hidden="true" />
      <StepIcon i={i} />
    </span>
  );
}

// 0 = under construction (cool grey glass), 1 = finished home (warm, lit).
const FinishContext = createContext<MotionValue<number> | null>(null);

/** A single flat surface in the 3D scene (a wall, roof slope, gable, window…). */
function Plane({
  w,
  h,
  transform,
  tint = 0.08,
  border = 0.5,
  clip,
  glow = false,
  cross = false,
}: {
  w: number;
  h: number;
  transform: string;
  tint?: number;
  border?: number;
  clip?: string;
  glow?: boolean; // warm, lit (windows / door)
  cross?: boolean; // window mullions
}) {
  const fallback = useMotionValue(0);
  const finish = useContext(FinishContext) ?? fallback;
  const rgb = glow ? WARM : INK;
  const line = `rgba(${INK},0.45)`;

  // On completion the surface warms to the studio's brass tone and brightens.
  const warmTint = Math.min(0.92, tint * (glow ? 1.6 : 1.7));
  const bg = useTransform(finish, [0, 1], [`rgba(${rgb},${tint})`, `rgba(${WARM},${warmTint})`]);
  const bd = useTransform(finish, [0, 1], [`rgba(${rgb},${border})`, `rgba(${WARM},${Math.min(0.95, border * 1.25)})`]);
  const shadow = useTransform(
    finish,
    [0, 1],
    [glow ? `0 0 14px rgba(${WARM},0.22)` : "0 0 0 rgba(0,0,0,0)", glow ? `0 0 24px rgba(${WARM},0.5)` : `0 0 18px rgba(${WARM},0.14)`]
  );

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: w,
        height: h,
        transform: `translate(-50%, -50%) ${transform}`,
        backgroundColor: bg,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: bd,
        boxSizing: "border-box",
        clipPath: clip,
        backgroundImage: cross ? `linear-gradient(${line},${line}), linear-gradient(${line},${line})` : undefined,
        backgroundSize: cross ? "1px 100%, 100% 1px" : undefined,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        boxShadow: shadow,
      }}
    />
  );
}

/** Five faces of a cuboid centred at (cx, cy, cz). */
function boxFaces(w: number, d: number, h: number, cx: number, cy: number, cz: number, key: string) {
  const base = `translateX(${cx}px) translateY(${cy}px) translateZ(${cz}px)`;
  return [
    <Plane key={`${key}-f`} w={w} h={h} transform={`${base} translateZ(${d / 2}px)`} tint={0.09} />,
    <Plane key={`${key}-b`} w={w} h={h} transform={`${base} translateZ(${-d / 2}px) rotateY(180deg)`} tint={0.05} />,
    <Plane key={`${key}-r`} w={d} h={h} transform={`${base} translateX(${w / 2}px) rotateY(90deg)`} tint={0.14} />,
    <Plane key={`${key}-l`} w={d} h={h} transform={`${base} translateX(${-w / 2}px) rotateY(-90deg)`} tint={0.04} />,
    <Plane key={`${key}-t`} w={w} h={d} transform={`${base} translateY(${-h / 2}px) rotateX(90deg)`} tint={0.18} />,
  ];
}

/** Two slopes + two gable triangles of a pitched roof sitting on the eave. */
function roofFaces() {
  const slantY = EAVE - RH / 2;
  const tri = "polygon(50% 0%, 100% 100%, 0% 100%)";
  return [
    <Plane key="roof-front" w={HW} h={SLANT} transform={`translateY(${slantY}px) translateZ(${HD / 4}px) rotateX(${90 - PITCH}deg)`} tint={0.17} border={0.55} />,
    <Plane key="roof-back" w={HW} h={SLANT} transform={`translateY(${slantY}px) translateZ(${-HD / 4}px) rotateX(${90 + PITCH}deg)`} tint={0.06} border={0.4} />,
    <Plane key="gable-l" w={HD} h={RH} transform={`translateX(${-HW / 2}px) translateY(${slantY}px) rotateY(-90deg)`} tint={0.11} clip={tri} />,
    <Plane key="gable-r" w={HD} h={RH} transform={`translateX(${HW / 2}px) translateY(${slantY}px) rotateY(90deg)`} tint={0.05} clip={tri} />,
  ];
}

/** Door, windows and chimney — the finishing details on the front elevation. */
function detailFaces() {
  const zf = HD / 2 + 0.6; // sit just proud of the front wall
  return [
    <Plane key="door" w={30} h={50} transform={`translateY(69px) translateZ(${zf}px)`} tint={0.16} border={0.55} glow />,
    <Plane key="gw-l" w={26} h={26} transform={`translateX(-46px) translateY(50px) translateZ(${zf}px)`} tint={0.2} border={0.6} glow cross />,
    <Plane key="gw-r" w={26} h={26} transform={`translateX(46px) translateY(50px) translateZ(${zf}px)`} tint={0.2} border={0.6} glow cross />,
    <Plane key="uw-l" w={26} h={26} transform={`translateX(-36px) translateY(-12px) translateZ(${zf}px)`} tint={0.2} border={0.6} glow cross />,
    <Plane key="uw-r" w={26} h={26} transform={`translateX(36px) translateY(-12px) translateZ(${zf}px)`} tint={0.2} border={0.6} glow cross />,
    ...boxFaces(16, 16, 36, 34, -74, -14, "chimney"),
  ];
}

/** One construction stage — its parts fade in and settle as the scrub passes. */
function Part({ progress, from, to, rise, children }: { progress: MotionValue<number>; from: number; to: number; rise: number; children: React.ReactNode }) {
  const reveal = useTransform(progress, [from, to], [0, 1]);
  const opacity = useTransform(progress, [from, from + 0.05], [0, 1]);
  const ty = useTransform(reveal, [0, 1], [rise, 0]);
  const transform = useMotionTemplate`translate(-50%, -50%) translateY(${ty}px)`;
  return (
    <motion.div style={{ position: "absolute", left: "50%", top: "50%", transformStyle: "preserve-3d", transform, opacity }}>
      {children}
    </motion.div>
  );
}

/** Perspective scene: the house builds up and turns a full circle as you scroll. */
function House({ progress }: { progress: MotionValue<number> }) {
  const rotateY = useTransform(progress, [0, 0.85], [0, 360]);
  const transform = useMotionTemplate`scale(1.75) rotateX(-12deg) rotateY(${rotateY}deg)`;
  // Once the house is built, warm it up and light it to the studio's palette.
  const finish = useTransform(progress, [0.64, 0.92], [0, 1]);
  const ambient = useTransform(finish, [0, 1], [0, 0.9]);

  return (
    <div className="absolute inset-0">
      {/* Warm key light that fades in as the home is finished */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: ambient, background: `radial-gradient(58% 50% at 44% 44%, rgba(${WARM},0.12), rgba(${WARM},0) 70%)` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1700px", perspectiveOrigin: "50% 46%" }}>
        <FinishContext.Provider value={finish}>
          <motion.div style={{ position: "relative", transformStyle: "preserve-3d", transform }}>
            {/* Soft ground glow to seat the house */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: HW * 2.6,
            height: HD * 2.6,
            transform: "translate(-50%, -50%) translateY(116px) rotateX(90deg)",
            background: `radial-gradient(ellipse at center, rgba(${INK},0.07), rgba(${INK},0) 68%)`,
          }}
          aria-hidden="true"
        />
        {/* 01 foundation */}
        <Part progress={progress} from={0} to={0.16} rise={46}>
          {boxFaces(152, 122, 16, 0, 102, 0, "found")}
        </Part>
        {/* 02 ground storey */}
        <Part progress={progress} from={0.12} to={0.28} rise={46}>
          {boxFaces(HW, HD, 70, 0, 59, 0, "ground")}
        </Part>
        {/* 03 upper storey */}
        <Part progress={progress} from={0.24} to={0.4} rise={46}>
          {boxFaces(HW, HD, 66, 0, -9, 0, "upper")}
        </Part>
        {/* 04 roof — lowered into place from above */}
        <Part progress={progress} from={0.36} to={0.52} rise={-32}>
          {roofFaces()}
        </Part>
            {/* 05 details */}
            <Part progress={progress} from={0.48} to={0.64} rise={0}>
              {detailFaces()}
            </Part>
          </motion.div>
        </FinishContext.Provider>
      </div>
    </div>
  );
}

/** One step in the list beside the house; brightens as its part is built. */
function StepRow({ draw, step, i }: { draw: MotionValue<number>; step: ProcessStep; i: number }) {
  const start = i * 0.12;
  const opacity = useTransform(draw, [Math.max(0, start - 0.02), start + 0.07], [0.3, 1]);
  const barScaleY = useTransform(draw, [Math.max(0, start - 0.02), start + 0.12], [0, 1]);

  return (
    <motion.li className="relative pl-6" style={{ opacity }}>
      <motion.span
        className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px origin-top bg-ink"
        style={{ scaleY: barScaleY }}
        aria-hidden="true"
      />
      <div className="font-mono text-[0.55rem] tracking-label text-ink-muted">{step.index}</div>
      <h3 className="mt-1 font-display text-sm leading-none tracking-tight text-ink">{step.title}</h3>
      <p className="mt-1.5 max-w-xs text-[0.7rem] leading-relaxed text-ink-muted">{step.body}</p>
    </motion.li>
  );
}

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  // 0 at the moment the stage pins, 1 when it releases — drives the build + spin.
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start start", "end end"] });
  const draw = useTransform(scrollYProgress, [0, 0.96], [0, 1]);

  return (
    <section className="relative bg-paper">
      <div className="shell-wide pt-24 md:pt-32">
        <div className="max-w-2xl">
          <Bracket>The sequence</Bracket>
          <p className="mt-6 max-w-xl font-display text-2xl leading-[1.25] tracking-tight text-ink md:text-3xl">
            Five steps, built like a house — it rises from foundation to roof and turns a full circle as the work comes together.
          </p>
        </div>
      </div>

      {/* Desktop — pinned, scroll-scrubbed 3D house build */}
      <div ref={stageRef} data-build-stage className="relative hidden h-[360vh] md:block">
        <div className="sticky top-[var(--header-h)] flex h-[calc(100svh-var(--header-h))] items-center">
          <div className="shell-wide w-full">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              {/* House */}
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[40rem]">
                <House progress={draw} />
              </div>

              {/* Steps */}
              <ol className="space-y-6">
                {steps.map((step, i) => (
                  <StepRow key={step.index} draw={draw} step={step} i={i} />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile — vertical icon spine */}
      <div className="shell-wide pb-20 md:hidden">
        <ol className="relative mt-14">
          <span className="absolute bottom-6 left-7 top-6 w-px border-l border-dashed border-ink-muted/40" aria-hidden="true" />
          {steps.map((step, i) => (
            <motion.li
              key={step.index}
              className="relative flex gap-5 pb-12 last:pb-0"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="relative z-10 shrink-0">
                <NodeCircle i={i} />
              </div>
              <div className="pt-1.5">
                <div className="font-mono text-2xs tracking-label text-ink-muted">{step.index}</div>
                <h3 className="mt-1 font-display text-2xl leading-none tracking-tight text-ink">{step.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">{step.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>

    </section>
  );
}
