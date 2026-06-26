"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
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

// The studio route runs under CSS `zoom: 0.9` (PageZoom), which compresses the
// usable scrollYProgress. Map the slide into the low end and hold at the end.
const X_START = 0.04;
const X_END = 0.62;
const SHELL_PAD = "max(1.25rem,calc((100vw-1440px)/2+1.25rem))";

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
  const [, force] = useState(0);

  const { scrollYProgress } = useScroll({ target: parentRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => -maxX.current * clamp((p - X_START) / (X_END - X_START), 0, 1));

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!track || !stage) return;
      maxX.current = Math.max(0, track.scrollWidth - stage.clientWidth);
      force((n) => n + 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={parentRef} style={{ height: `${TEAM.length * 17 + 60}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center">
        <div ref={stageRef} className="w-full overflow-hidden">
          <motion.div ref={trackRef} style={{ x, paddingLeft: SHELL_PAD, paddingRight: SHELL_PAD }} className="flex gap-5 py-3 md:gap-6">
            {TEAM.map((m, i) => (
              <div key={m.src} className="shrink-0">
                <PillCard member={m} tone={TONES[i % TONES.length]} priority={i < 5} />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="shell-wide mt-9 flex items-center justify-between font-mono text-2xs uppercase tracking-label text-ink-muted">
          <span>Scroll to meet the team</span>
          <span>
            {String(TEAM.length).padStart(2, "0")} <span className="text-ink/30">people</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/** Reduced-motion fallback — a plain horizontally-scrollable row. */
function StaticRow() {
  return (
    <div className="pb-section pt-12 md:pt-14">
      <div
        className="flex gap-5 overflow-x-auto pb-6 pt-3 md:gap-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ paddingLeft: SHELL_PAD, paddingRight: SHELL_PAD }}
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
