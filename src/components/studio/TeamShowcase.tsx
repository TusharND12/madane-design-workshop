"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The crew — vertical "pill" (stadium) portrait cards on a dark, plastered wall.
 * The section pins and the row slides horizontally as you scroll vertically, so
 * the whole team passes across the wall. Reduced motion shows a normal scroll row.
 */
type Member = { name: string; src: string };

const TEAM: Member[] = [
  { name: "Aasawari", src: "/assets/team/aasawari.png" },
  { name: "Aishwarya Joil", src: "/assets/team/aishwarya-joil.png" },
  { name: "Chaavi", src: "/assets/team/chaavi.png" },
  { name: "Nidhi Jain", src: "/assets/team/nidhi-jain.png" },
  { name: "Shatbdi Ojha", src: "/assets/team/shatbdi-ojha.png" },
  { name: "Mahesh Khandekar", src: "/assets/team/mahesh-khandekar.jpeg" },
  { name: "Ajay Gupta", src: "/assets/team/ajay-gupta.jpeg" },
  { name: "Nikita Rane", src: "/assets/team/nikita-rane.jpeg" },
  { name: "Ravindra", src: "/assets/team/ravindra.png" },
  { name: "Komal Kharat", src: "/assets/team/komal-kharat.png" },
  { name: "Vaishnavi", src: "/assets/team/vaishnavi.png" },
  { name: "Shweta", src: "/assets/team/shweta.png" },
  { name: "Ajinkya", src: "/assets/team/ajinkya.jpeg" },
  { name: "Harshad", src: "/assets/team/harshad.png" },
  { name: "Priyanka Gupta", src: "/assets/team/priyanka-gupta.png" },
  { name: "Madhuri", src: "/assets/team/madhuri.jpeg" },
  { name: "Laveena", src: "/assets/team/laveena.jpeg" },
  { name: "Pratik", src: "/assets/team/pratik.png" },
  { name: "Prince", src: "/assets/team/prince.png" },
];

// Dark-theme header tones, cycled across the cards for subtle variety.
const TONES = ["#23262F", "#2A241E", "#272A2E", "#2C2622"];

// Fine grain for the plastered-wall feel (grayscale fractal noise).
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// The slide is coupled to the *true* geometric pin progress (read live from
// getBoundingClientRect), so it spans the whole pinned range regardless of the
// CSS `zoom: 0.9` (PageZoom) skew. A small tail keeps the last card on screen
// for a beat before the section releases.
const TAIL = 0.06;
// Generous left/right breathing room so the first and last cards clear the edge
// fade and read fully (not dissolved against the screen edges).
const SHELL_PAD = "clamp(2.5rem, 7vw, 8rem)";
// Horizontal cut — a crisp line on each side past which the card images are not
// visible at all (so they never bleed into the vacant rope space). The line sits
// just outside the first/last card positions, so those stay fully crisp.
const FADE =
  "linear-gradient(to right, transparent 0%, transparent 4.5%, #000 6%, #000 94%, transparent 95.5%, transparent 100%)";
// Wave — each card rides a gentle sine as the row travels, so scrolling sideways
// sends a wave rippling across the team.
const WAVE_AMP = 22; // px
const wavePhase = (index: number, xv: number) => index * 0.9 + xv * 0.004;

// A slender cord that hangs and sways in the vacant wall space beside the row —
// two path keyframes the rope eases between (the weight at the bottom rides along).
const ROPE_A = "M30 0 C 26 220, 21 520, 19 788";
const ROPE_B = "M30 0 C 34 220, 39 520, 41 788";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function TeamShowcase() {
  return (
    <section className="relative bg-paper">
      {/* Wall — base tone + soft top light + edge vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: "#141414",
          backgroundImage:
            "radial-gradient(120% 70% at 50% -10%, rgba(236,236,230,0.06), transparent 55%)," +
            "radial-gradient(120% 90% at 50% 120%, rgba(0,0,0,0.55), transparent 60%)",
        }}
      />
      {/* Wall grain */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: NOISE }} />

      <div className="relative z-10">
        <div className="shell-wide pt-section">
          <SectionHeader
            index="03"
            label="The crew"
            title="The people behind the calm."
            align="between"
            intro="Architects, designers and project leads — the team that turns the studio's quiet into built work."
          />
        </div>

        <Slider />
      </div>
    </section>
  );
}

function Slider() {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <StaticRow />;
  return <ScrollSlider />;
}

/** Pinned section — vertical scroll slides the row horizontally across the wall. */
function ScrollSlider() {
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
    const top = parent.getBoundingClientRect().top; // 0 at pin-start → -range at pin-end
    const p = clamp(-top / range / (1 - TAIL), 0, 1);
    x.set(-maxX.current * p);
  };

  useMotionValueEvent(scrollY, "change", update);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!track || !stage) return;
      // scrollWidth includes the left padding but omits the right padding, so add
      // it back — otherwise the last card parks flush to the edge (under the cut).
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
    <div ref={parentRef} style={{ height: `${TEAM.length * 14 + 40}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center">
        <Rope side="left" />
        <Rope side="right" />
        <div ref={stageRef} className="relative z-10 w-full overflow-hidden" style={{ WebkitMaskImage: FADE, maskImage: FADE }}>
          <motion.div ref={trackRef} style={{ x, paddingLeft: SHELL_PAD, paddingRight: SHELL_PAD }} className="flex items-center gap-5 py-9 md:gap-6">
            {TEAM.map((m, i) => (
              <WaveCard key={m.src} x={x} index={i}>
                <PillCard member={m} tone={TONES[i % TONES.length]} priority={i < 5} />
              </WaveCard>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10 shell-wide mt-9 flex items-center justify-between font-mono text-2xs uppercase tracking-label text-ink-muted">
          <span>Scroll to meet the team</span>
          <span>
            {String(TEAM.length).padStart(2, "0")} <span className="text-ink/30">people</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/** One card riding the wave — vertical offset follows a sine of its position +
    the row's travel, so sliding the row ripples a wave across the team. */
function WaveCard({ x, index, children }: { x: MotionValue<number>; index: number; children: React.ReactNode }) {
  const y = useTransform(x, (xv) => Math.sin(wavePhase(index, xv)) * WAVE_AMP);
  return (
    <motion.div style={{ y }} className="shrink-0">
      {children}
    </motion.div>
  );
}

/** Decorative swaying cord for the vacant wall space on either side of the row. */
function Rope({ side }: { side: "left" | "right" }) {
  const reduced = usePrefersReducedMotion();
  const t = { duration: 7, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" as const };
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute top-1/2 z-0 hidden h-[64vh] w-[clamp(3rem,6vw,7rem)] -translate-y-1/2 opacity-40 md:block ${
        side === "left" ? "left-[1.5%]" : "right-[1.5%] -scale-x-100"
      }`}
    >
      <svg viewBox="0 0 60 800" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
        <motion.path
          d={ROPE_A}
          fill="none"
          stroke="#ECECE6"
          strokeWidth={2.4}
          strokeLinecap="round"
          animate={reduced ? undefined : { d: [ROPE_A, ROPE_B] }}
          transition={reduced ? undefined : t}
        />
        <motion.circle
          cx={19}
          cy={788}
          r={5}
          fill="#ECECE6"
          animate={reduced ? undefined : { cx: [19, 41] }}
          transition={reduced ? undefined : t}
        />
      </svg>
    </div>
  );
}

/** Reduced-motion fallback — a plain horizontally-scrollable row. */
function StaticRow() {
  return (
    <div className="pb-section pt-12 md:pt-14">
      <div
        className="flex gap-5 overflow-x-auto pb-6 pt-3 md:gap-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ paddingLeft: SHELL_PAD, paddingRight: SHELL_PAD, WebkitMaskImage: FADE, maskImage: FADE }}
      >
        {TEAM.map((m, i) => (
          <div key={m.src} className="shrink-0">
            <PillCard member={m} tone={TONES[i % TONES.length]} priority={i < 5} />
          </div>
        ))}
      </div>
      <div className="shell-wide mt-7 font-mono text-2xs uppercase tracking-label text-ink-muted">
        {String(TEAM.length).padStart(2, "0")} <span className="text-ink/30">people</span>
      </div>
    </div>
  );
}

function PillCard({ member, tone, priority }: { member: Member; tone: string; priority: boolean }) {
  const [first, ...rest] = member.name.split(" ");
  const last = rest.join(" ");
  return (
    <div
      className="group relative aspect-[1/2.35] w-[clamp(11rem,17vw,13.5rem)] select-none overflow-hidden rounded-full shadow-[0_26px_55px_-22px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.04]"
      style={{ backgroundColor: tone }}
    >
      {/* Name — thin Avant Garde Extra Light, lowercase, first name over surname */}
      <div className="absolute inset-x-0 top-[6.5%] z-10 px-4 text-center leading-[0.95]">
        <span className="block font-display text-[1.35rem] font-light lowercase tracking-[0.01em] text-ink">
          {first}
        </span>
        {last && (
          <span className="mt-1 block font-display text-[0.82rem] font-light lowercase tracking-[0.16em] text-ink/55">
            {last}
          </span>
        )}
      </div>

      {/* Portrait — fully rounded bottom to follow the pill, gentle top corners */}
      <div className="absolute inset-x-2 bottom-2 top-[22%] overflow-hidden rounded-b-full rounded-t-[1.75rem] bg-mount">
        <Image
          src={member.src}
          alt={`${member.name} — Madane Design Workshop.`}
          fill
          draggable={false}
          sizes="(max-width:640px) 45vw, 220px"
          priority={priority}
          className="object-cover object-[50%_18%] grayscale transition-[filter,transform] duration-700 ease-editorial group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      </div>
    </div>
  );
}
