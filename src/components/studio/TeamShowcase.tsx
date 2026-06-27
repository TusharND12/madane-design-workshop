"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  cubicBezier,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The crew, a scattered "constellation" of portraits (yodezeen.com/about style).
 * The section pins and, as you scroll, the skewed grayscale portraits rise up
 * from below the screen into a scattered field while a large category title and a
 * discipline list hold the centre. Mobile rises a tidy grid; reduced motion shows
 * a static grid.
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

// Scatter field, one slot per member: left/top in %, width in vw, stacking z and
// a 0..1 rise delay so they cascade up in a pleasing (non-linear) order. Hand
// placed to spread across the frame and leave the centre legible for the title.
const SCATTER = [
  { left: 5, top: 20, w: 11, z: 5, delay: 0.1 },
  { left: 18, top: 5, w: 10, z: 8, delay: 0.3 },
  { left: 29, top: 30, w: 9, z: 3, delay: 0.55 },
  { left: 1, top: 55, w: 10, z: 6, delay: 0.2 },
  { left: 13, top: 73, w: 11, z: 9, delay: 0.42 },
  { left: 25, top: 50, w: 8, z: 2, delay: 0.66 },
  { left: 39, top: 11, w: 10, z: 7, delay: 0.05 },
  { left: 37, top: 67, w: 9, z: 4, delay: 0.5 },
  { left: 49, top: 40, w: 11, z: 1, delay: 0.72 },
  { left: 60, top: 7, w: 10, z: 8, delay: 0.18 },
  { left: 52, top: 64, w: 9, z: 5, delay: 0.34 },
  { left: 64, top: 34, w: 12, z: 6, delay: 0.6 },
  { left: 72, top: 58, w: 10, z: 7, delay: 0.26 },
  { left: 70, top: 13, w: 9, z: 4, delay: 0.48 },
  { left: 82, top: 29, w: 11, z: 8, delay: 0.12 },
  { left: 88, top: 55, w: 10, z: 6, delay: 0.38 },
  { left: 80, top: 77, w: 9, z: 5, delay: 0.64 },
  { left: 92, top: 11, w: 8, z: 3, delay: 0.56 },
  { left: 45, top: 84, w: 9, z: 7, delay: 0.22 },
];

const RISE = 760; // px the cards travel up from below the fold
const ARC = 120; // px sideways bow mid-flight, so cards sweep in on a curve
const ROT = 9; // deg of tilt at launch, easing to straight on arrival
const EASE_FN = cubicBezier(0.16, 1, 0.3, 1);
const TAIL = 0.06;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// Fine grain for a quiet, filmic black backdrop.
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function TeamShowcase() {
  const reduced = usePrefersReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setIsDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  if (reduced) return <StaticGrid />;
  return isDesktop ? <ScatterPinned /> : <MobileRise />;
}

/* Shared dark backdrop. */
function Backdrop() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: "#000",
          backgroundImage: "radial-gradient(120% 80% at 50% 30%, rgba(236,236,230,0.05), transparent 60%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: NOISE }} />
    </>
  );
}

/* Centre overlay - the title, which fades out once the portraits are all up. */
function CrewTitle({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
      <motion.h2
        style={{ opacity }}
        className="px-6 text-center font-display text-[clamp(2.6rem,11vw,9.5rem)] font-medium uppercase leading-[0.92] tracking-tight text-ink drop-shadow-[0_8px_40px_rgba(0,0,0,0.7)]"
      >
        Architects
      </motion.h2>
    </div>
  );
}

/* Desktop, pinned scatter that rises from below as you scroll. */
function ScatterPinned() {
  const parentRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const prog = useMotionValue(0);
  // The title holds while the portraits rise, then fades out once they are all up.
  const titleOpacity = useTransform(prog, [0.05, 0.16, 0.8, 0.95], [0, 1, 1, 0]);

  const update = () => {
    const parent = parentRef.current;
    if (!parent) return;
    const range = parent.offsetHeight - window.innerHeight;
    if (range <= 0) return;
    const top = parent.getBoundingClientRect().top; // 0 at pin-start → -range at pin-end
    const p = clamp(-top / range / (1 - TAIL), 0, 1);
    prog.set(p);
  };

  useMotionValueEvent(scrollY, "change", update);
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={parentRef} className="relative bg-black" style={{ height: "300vh" }} aria-label="The crew">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <Backdrop />
        <div className="absolute inset-0 z-10">
          {TEAM.map((m, i) => (
            <ScatterCard key={m.src} prog={prog} pos={SCATTER[i % SCATTER.length]} member={m} />
          ))}
        </div>
        <CrewTitle opacity={titleOpacity} />
      </div>
    </section>
  );
}

function ScatterCard({
  prog,
  pos,
  member,
}: {
  prog: MotionValue<number>;
  pos: (typeof SCATTER)[number];
  member: Member;
}) {
  const start = pos.delay * 0.45;
  const end = start + 0.3;
  // Cards on the left bow left, those on the right bow right; the further from
  // centre, the wider the arc - so the field sweeps up on curves, not straight.
  const dir = pos.left < 50 ? -1 : 1;
  const arc = ARC * (0.45 + Math.abs(pos.left - 50) / 50) * dir;

  const r = useTransform(prog, [start, end], [0, 1], { clamp: true, ease: EASE_FN });
  const y = useTransform(r, [0, 1], [RISE, 0]);
  const x = useTransform(r, (rv) => Math.sin((1 - rv) * Math.PI) * arc);
  const rotate = useTransform(r, [0, 1], [dir * ROT, 0]);
  const opacity = useTransform(r, [0, 1], [0, 1]);
  const scale = useTransform(r, [0, 1], [0.9, 1]);

  return (
    <motion.div
      className="group absolute"
      style={{
        left: `${pos.left}%`,
        top: `${pos.top}%`,
        width: `${pos.w}vw`,
        minWidth: "7rem",
        maxWidth: "15rem",
        zIndex: pos.z,
        x,
        y,
        rotate,
        opacity,
        scale,
        transformOrigin: "bottom center",
      }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-mount shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/[0.05]">
        <Image
          src={member.src}
          alt={`${member.name}, Madane Design Workshop.`}
          fill
          draggable={false}
          sizes="(max-width:768px) 40vw, 220px"
          className="object-cover object-[50%_18%] grayscale transition-[filter] duration-700 ease-editorial group-hover:grayscale-0"
        />
        {/* Name on hover */}
        <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2.5 pt-8 text-center font-mono text-[0.55rem] uppercase tracking-label text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {member.name}
        </span>
      </div>
    </motion.div>
  );
}

/* Mobile, a tidy grid whose cards rise from below as they enter the viewport. */
function MobileRise() {
  return (
    <section className="relative overflow-hidden bg-black py-section" aria-label="The crew">
      <Backdrop />
      <div className="relative z-10 shell-wide">
        <h2 className="font-display text-[clamp(2.4rem,16vw,4.5rem)] font-medium uppercase leading-[0.92] tracking-tight text-ink">
          Architects
        </h2>

        <div className="mt-9 grid grid-cols-2 gap-3 xs:grid-cols-3">
          {TEAM.map((m, i) => {
            const dir = i % 2 === 0 ? -1 : 1;
            return (
            <motion.div
              key={m.src}
              initial={{ opacity: 0, y: 80, x: dir * 36, rotate: dir * 5 }}
              whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: EASE_FN, delay: (i % 3) * 0.06 }}
              className="relative aspect-[3/4] overflow-hidden bg-mount ring-1 ring-white/[0.05]"
            >
              <Image
                src={m.src}
                alt={`${m.name}, Madane Design Workshop.`}
                fill
                sizes="45vw"
                className="object-cover object-[50%_18%] grayscale"
              />
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Reduced-motion fallback, a plain static grid. */
function StaticGrid() {
  return (
    <section className="relative overflow-hidden bg-black py-section" aria-label="The crew">
      <Backdrop />
      <div className="relative z-10 shell-wide">
        <h2 className="font-display text-[clamp(2.4rem,12vw,6rem)] font-medium uppercase leading-[0.92] tracking-tight text-ink">
          Architects
        </h2>
        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
          {TEAM.map((m) => (
            <div key={m.src} className="relative aspect-[3/4] overflow-hidden bg-mount ring-1 ring-white/[0.05]">
              <Image src={m.src} alt={`${m.name}, Madane Design Workshop.`} fill sizes="25vw" className="object-cover object-[50%_18%] grayscale" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
