"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Reveal } from "@/components/primitives/Reveal";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The crew — a wide group portrait band, then a scroll-driven reel that brings up
 * one face at a time, zooming into each portrait as it comes, with the name, a
 * diagonal arrow and a counter. One person in focus at a time (not a grid).
 */
type Member = { src: string; name: string };

const TEAM: Member[] = [
  { src: "/assets/team/nidhi-jain.png", name: "Nidhi Jain" },
  { src: "/assets/team/shatbdi-ojha.png", name: "Shatbdi Ojha" },
  { src: "/assets/team/mahesh-khandekar.jpeg", name: "Mahesh Khandekar" },
  { src: "/assets/team/ajay-gupta.jpeg", name: "Ajay Gupta" },
  { src: "/assets/team/nikita-rane.jpeg", name: "Nikita Rane" },
  { src: "/assets/team/aishwarya-joil.png", name: "Aishwarya Joil" },
  { src: "/assets/team/ravindra.png", name: "Ravindra" },
  { src: "/assets/team/harshad.png", name: "Harshad" },
  { src: "/assets/team/komal-kharat.png", name: "Komal Kharat" },
  { src: "/assets/team/vaishnavi.png", name: "Vaishnavi" },
  { src: "/assets/team/shweta.png", name: "Shweta" },
  { src: "/assets/team/ajinkya.jpeg", name: "Ajinkya" },
  { src: "/assets/team/aasawari.png", name: "Aasawari" },
  { src: "/assets/team/priyanka-gupta.png", name: "Priyanka Gupta" },
  { src: "/assets/team/madhuri.jpeg", name: "Madhuri" },
  { src: "/assets/team/laveena.jpeg", name: "Laveena" },
  { src: "/assets/team/chaavi.png", name: "Chaavi" },
  { src: "/assets/team/pratik.png", name: "Pratik" },
  { src: "/assets/team/prince.png", name: "Prince" },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function TeamShowcase() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="bg-paper">
      <div className="shell-wide pt-section">
        <SectionHeader
          index="03"
          label="The crew"
          title="The people behind the calm."
          align="between"
          intro="Architects, designers and project leads — the team that turns the studio's quiet into built work."
        />

        {/* Group portrait band */}
        <Reveal className="relative mt-12 aspect-[1672/665] w-full overflow-hidden rounded-card bg-mount md:mt-14">
          <Image
            src="/assets/team/group.png"
            alt="The Madane Design Workshop studio team."
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </Reveal>
      </div>

      {reduced ? <TeamStatic /> : <TeamReel />}
    </section>
  );
}

/** Scroll-driven reel — one zooming face at a time. */
function TeamReel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.max(0, Math.min(TEAM.length - 1, Math.floor(v * TEAM.length)));
    setActive(i);
  });

  // Zoom in within each face's own slice of the scroll, then reset for the next.
  const scale = useTransform(scrollYProgress, (v) => {
    const seg = v * TEAM.length;
    return 1.06 + (seg - Math.floor(seg)) * 0.2;
  });
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const member = TEAM[active];

  return (
    <div ref={ref} style={{ height: `${TEAM.length * 26}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="shell-wide grid w-full items-center gap-8 md:grid-cols-[1fr_minmax(0,28rem)] md:gap-12">
          {/* Name + arrow + counter */}
          <div className="order-2 md:order-1">
            <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">
              {pad(active + 1)} <span className="text-ink/30">/ {pad(TEAM.length)}</span>
            </span>
            <div className="mt-4 flex items-start gap-3 md:mt-6">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={member.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="font-display text-[clamp(2rem,5vw,3.75rem)] font-light leading-[1.02] tracking-tight"
                >
                  {member.name}
                </motion.h3>
              </AnimatePresence>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
                className="mt-2 shrink-0 text-ink-muted md:mt-4"
              >
                <path d="M7 17 17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Progress bar */}
            <div className="mt-8 h-px w-full max-w-xs bg-hairline md:mt-10">
              <motion.div className="h-full bg-ink" style={{ width: barWidth }} />
            </div>
          </div>

          {/* Zooming portrait — one face at a time */}
          <div className="relative order-1 mx-auto aspect-[4/5] w-full max-w-[28rem] overflow-hidden rounded-card bg-mount md:order-2">
            <AnimatePresence>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <motion.div className="absolute inset-0" style={{ scale }}>
                  <Image
                    src={member.src}
                    alt={`${member.name} — Madane Design Workshop.`}
                    fill
                    sizes="(max-width:768px) 92vw, 28rem"
                    priority={active === 0}
                    className="object-cover grayscale"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Reduced-motion fallback — a calm static grid, no scroll choreography. */
function TeamStatic() {
  return (
    <div className="shell-wide pb-section pt-14">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {TEAM.map((m) => (
          <div key={m.src}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-mount">
              <Image src={m.src} alt={`${m.name} — Madane Design Workshop.`} fill sizes="25vw" className="object-cover grayscale" />
            </div>
            <h3 className="mt-3 font-display text-lead tracking-tight">{m.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
