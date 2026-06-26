"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The crew — vertical "pill" (stadium) portrait cards mounted on a dark, plastered
 * wall. As you scroll into the section the cards rise and lock onto the wall one
 * after another; once placed they stay fixed. Drag / swipe through the whole team.
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
  { name: "Harshad", src: "/assets/team/harshad.png" },
  { name: "Komal Kharat", src: "/assets/team/komal-kharat.png" },
  { name: "Vaishnavi", src: "/assets/team/vaishnavi.png" },
  { name: "Shweta", src: "/assets/team/shweta.png" },
  { name: "Ajinkya", src: "/assets/team/ajinkya.jpeg" },
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

// Card reveal pacing (in section-scroll progress). All cards are placed by ~0.55.
const STEP = 0.024;
const REVEAL = 0.13;

export function TeamShowcase() {
  return (
    <section className="relative overflow-hidden bg-paper">
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

        <Carousel />
      </div>
    </section>
  );
}

function Carousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0 });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "center center"] });

  function onDown(e: React.PointerEvent) {
    const el = scroller.current;
    if (!el) return;
    drag.current = { down: true, startX: e.pageX, startLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  }
  function onMove(e: React.PointerEvent) {
    const el = scroller.current;
    if (!el || !drag.current.down) return;
    el.scrollLeft = drag.current.startLeft - (e.pageX - drag.current.startX);
  }
  function onUp(e: React.PointerEvent) {
    const el = scroller.current;
    drag.current.down = false;
    if (el && el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  }

  return (
    <div ref={sectionRef} className="pb-section pt-12 md:pt-14">
      <div
        ref={scroller}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="flex cursor-grab snap-x snap-proximity gap-5 overflow-x-auto px-[max(1.25rem,calc((100vw-1440px)/2+1.25rem))] pb-6 pt-3 active:cursor-grabbing md:gap-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TEAM.map((m, i) => (
          <CardReveal key={m.src} progress={scrollYProgress} index={i}>
            <PillCard member={m} tone={TONES[i % TONES.length]} priority={i < 5} />
          </CardReveal>
        ))}
      </div>

      <div className="shell-wide mt-7 flex items-center justify-between font-mono text-2xs uppercase tracking-label text-ink-muted">
        <span>Drag to meet the team</span>
        <span>
          {String(TEAM.length).padStart(2, "0")} <span className="text-ink/30">people</span>
        </span>
      </div>
    </div>
  );
}

/** Scroll-driven mount — each card rises and locks onto the wall in sequence. */
function CardReveal({ progress, index, children }: { progress: MotionValue<number>; index: number; children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const a = index * STEP;
  const b = a + REVEAL;
  const opacity = useTransform(progress, [a, b], [0, 1]);
  const y = useTransform(progress, [a, b], [64, 0]);
  const scale = useTransform(progress, [a, b], [0.86, 1]);
  const rotateX = useTransform(progress, [a, b], [14, 0]);

  if (reduced) return <div className="shrink-0 snap-center">{children}</div>;

  return (
    <motion.div className="shrink-0 snap-center" style={{ opacity, y, scale, rotateX, transformPerspective: 850 }}>
      {children}
    </motion.div>
  );
}

function PillCard({ member, tone, priority }: { member: Member; tone: string; priority: boolean }) {
  return (
    <div
      className="group relative aspect-[1/2.35] w-[clamp(11rem,17vw,13.5rem)] select-none overflow-hidden rounded-full shadow-[0_26px_55px_-22px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.04]"
      style={{ backgroundColor: tone }}
    >
      {/* Name header */}
      <div className="absolute inset-x-0 top-[7.5%] z-10 px-5 text-center">
        <span className="block truncate font-display text-lg leading-tight tracking-tight text-ink md:text-xl">
          {member.name}
        </span>
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
