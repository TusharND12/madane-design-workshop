"use client";

import { motion } from "framer-motion";
import { Bracket } from "@/components/primitives/Bracket";
import { Button } from "@/components/primitives/Button";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Approach — a centered editorial statement (AEROTECH-style) whose elements
 * fade in one by one, followed by a quiet credential ticker, the three working
 * tenets as pillars, and a supporting image.
 */
const MARQUEE = [
  "Architecture",
  "Interiors",
  "Turnkey delivery",
  "BIM-integrated workflows",
  "IGBC green building",
  "USGBC certified",
  "Corporate & commercial",
  "Industrial facilities",
  "Mumbai · since 2008",
];

const PILLARS = [
  { n: "01", title: "Restraint", body: "Two neutrals and a single material logic — nothing on the wall that doesn't earn its place." },
  { n: "02", title: "Daylight", body: "We let light do the dramatic work, and shape each room around how the sun moves through it." },
  { n: "03", title: "Detail", body: "The few things you actually touch are detailed to the tolerance of furniture." },
];

const VALUES = [
  { sa: "न्याय", tr: "Nyāya", en: "Justice", note: "Fairness to the client, the craft and the land." },
  { sa: "धैर्य", tr: "Dhairya", en: "Fortitude", note: "The patience to carry a vision from first line to keys." },
  { sa: "धर्म", tr: "Dharma", en: "Stewardship", note: "Design as duty — to the people and the generations who inherit it." },
  { sa: "ज्ञान", tr: "Jñāna", en: "Knowledge", note: "Rigour, research and craft behind every decision." },
];

export function EditorialQuote() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="relative z-10 -mt-[16vh] overflow-hidden rounded-t-[clamp(1.75rem,5vw,3.25rem)] bg-stone shadow-[0_-34px_70px_-26px_rgba(0,0,0,0.7)] md:-mt-[24vh]">
      {!reduced && <BotanicalLayer />}
      <div className="relative z-[1] shell-wide pt-[clamp(5rem,12vh,9rem)] pb-[clamp(7rem,20vh,16rem)]">
        {/* Centered hero statement — staggered, one element at a time */}
        <motion.div
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.div variants={fadeUp}>
            <Bracket>Approach</Bracket>
          </motion.div>

          <motion.span variants={fadeUp} className="mt-8 font-mono text-2xs uppercase tracking-[0.42em] text-ink-muted">
            Madane Design Workshop
          </motion.span>

          <motion.h2 variants={fadeUp} className="mt-6 font-display text-[clamp(2.75rem,8.5vw,6rem)] font-light leading-[0.95] tracking-tighter">
            Quiet, by design.
          </motion.h2>

          <motion.span variants={fadeUp} className="mt-9 block h-12 w-px bg-ink/25" aria-hidden="true" />

          <motion.p variants={fadeUp} className="mt-9 max-w-prose text-lead font-light leading-relaxed text-ink-muted">
            A space is finished not when there is nothing left to add — but when there is nothing left to remove.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-11">
            <Button href="/studio" variant="secondary" arrow>
              Read our philosophy
            </Button>
          </motion.div>
        </motion.div>

        {/* Credential ticker — quiet, looping proof of range */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 border-y border-ink/10 md:mt-20"
        >
          <CredentialMarquee />
        </motion.div>

        {/* The three working tenets, as pillars */}
        <motion.div
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-20 md:mt-28"
        >
          <motion.span variants={fadeUp} className="section-index">
            01 — Method
          </motion.span>
          <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-ink/10 bg-ink/10 md:grid-cols-3">
            {PILLARS.map((p) => (
              <motion.div key={p.n} variants={fadeUp} className="flex flex-col gap-4 bg-stone p-8 md:p-9">
                <span className="font-mono text-2xs tracking-label text-ink-muted">{p.n}</span>
                <h3 className="font-display text-2xl tracking-tight">{p.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What we hold to — four values, each carrying its Sanskrit root */}
        <motion.div
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-20 md:mt-28"
        >
          <motion.span variants={fadeUp} className="section-index">
            02 — What we hold to
          </motion.span>
          <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-ink/10 bg-ink/10 sm:grid-cols-2">
            {VALUES.map((v) => (
              <motion.div key={v.en} variants={fadeUp} className="group relative overflow-hidden bg-stone p-8 md:p-10">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-3 -top-7 select-none text-[6rem] leading-none text-ink/[0.06] transition-all duration-500 ease-editorial group-hover:-translate-y-1 group-hover:text-ink/15 md:text-[8rem]"
                >
                  {v.sa}
                </span>
                <div className="relative">
                  <span className="font-mono text-2xs uppercase tracking-[0.32em] text-ink-muted">{v.tr}</span>
                  <h3 className="mt-3 font-display text-2xl tracking-tight md:text-3xl">{v.en}</h3>
                  <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-ink-muted">{v.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* Two identical tracks sliding one full width — seamless, edge-faded loop. */
function CredentialMarquee() {
  const loop = [...MARQUEE, ...MARQUEE];
  return (
    <div
      className="relative overflow-hidden py-5"
      style={{
        maskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
      }}
    >
      <div className="marquee-track flex w-max items-center">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center" aria-hidden={i >= MARQUEE.length}>
            <span className="px-7 font-mono text-2xs uppercase tracking-[0.32em] text-ink-muted">{item}</span>
            <span className="h-[3px] w-[3px] rounded-full bg-ink/30" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Decorative botanicals — thin line flowers that draw themselves in  */
/*  and sway gently, with a few petals drifting through. Purely        */
/*  ornamental; never shown under reduced motion.                      */
/* ------------------------------------------------------------------ */
function BotanicalLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <LineFlower className="left-[1%] top-[14%] hidden h-64 w-auto md:block lg:h-80" delay={0.1} sway={3} dur={9} />
      <LineFlower className="right-[1%] top-[33%] hidden h-56 w-auto md:block lg:h-72" delay={0.5} sway={2.4} dur={11} flip />
      <LineFlower className="right-[7%] top-[9%] hidden h-28 w-auto lg:block" delay={0.9} sway={3.6} dur={8} />
      <Petals />
    </div>
  );
}

const DRAW = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (c = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, delay: 0.15 + c, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.3, delay: 0.15 + c },
    },
  }),
};

function LineFlower({
  className,
  delay = 0,
  sway = 3,
  dur = 9,
  flip = false,
}: {
  className?: string;
  delay?: number;
  sway?: number;
  dur?: number;
  flip?: boolean;
}) {
  return (
    <motion.svg
      viewBox="0 0 80 180"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("absolute text-ink/50", flip && "-scale-x-100", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.g
        style={{ transformBox: "view-box", transformOrigin: "40px 180px" }}
        animate={{ rotate: [-sway, sway, -sway] }}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {/* stem */}
        <motion.path d="M40 180 C 40 140 35 108 40 70" variants={DRAW} custom={0} />
        {/* leaves */}
        <motion.path d="M40 132 C 24 124 16 130 12 142 C 26 144 37 140 40 130" variants={DRAW} custom={0.35} />
        <motion.path d="M40 104 C 58 98 66 104 70 116 C 56 118 45 113 40 104" variants={DRAW} custom={0.55} />
        {/* bloom */}
        {[0, 60, 120, 180, 240, 300].map((a, i) => (
          <motion.ellipse key={a} cx="40" cy="40" rx="5.5" ry="15" transform={`rotate(${a} 40 56)`} variants={DRAW} custom={0.75 + i * 0.07} />
        ))}
        <motion.circle cx="40" cy="56" r="4.5" variants={DRAW} custom={1.3} />
      </motion.g>
    </motion.svg>
  );
}

const PETALS = [
  { left: "9%", top: "24%", s: 9, d: 0, dur: 15, x: 26 },
  { left: "24%", top: "68%", s: 7, d: 3.5, dur: 18, x: -22 },
  { left: "46%", top: "14%", s: 8, d: 6, dur: 16, x: 24 },
  { left: "68%", top: "58%", s: 10, d: 1.5, dur: 17, x: -28 },
  { left: "85%", top: "32%", s: 6, d: 4.5, dur: 19, x: 18 },
  { left: "58%", top: "82%", s: 11, d: 2.2, dur: 20, x: 22 },
];

function Petals() {
  return (
    <>
      {PETALS.map((p, i) => (
        <motion.span
          key={i}
          className="absolute block bg-ink/35"
          style={{ left: p.left, top: p.top, width: p.s, height: p.s * 1.4, borderRadius: "100% 0 100% 0" }}
          animate={{ y: [0, 40, 0], x: [0, p.x, 0], rotate: [0, 170, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.d }}
        />
      ))}
    </>
  );
}
