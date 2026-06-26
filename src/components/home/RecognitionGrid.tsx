"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Card = {
  key: string;
  title: string;
  desc: string;
  clients: string[];
  span: string;
  big?: boolean;
  wide?: boolean;
};

const CARDS: Card[] = [
  {
    key: "retail",
    title: "Quick-commerce & retail",
    desc: "Dark stores, flagship retail and fast-moving brand environments, rolled out at pace across cities.",
    clients: ["Swiggy", "Zepto", "Urban Company", "Croma", "FirstCry", "Eatigo", "Akasa", "Boomlet"],
    span: "md:col-span-6",
    big: true,
  },
  {
    key: "finance",
    title: "Banking & finance",
    desc: "Corporate floors and branch experiences for banks and fintechs.",
    clients: ["IDFC First Bank", "Capital First Bank", "Fedbank", "Policy Bazaar", "PB Partners"],
    span: "md:col-span-3",
  },
  {
    key: "industrial",
    title: "Industrial & manufacturing",
    desc: "Plants, facilities and offices for makers and engineers.",
    clients: ["CEAT", "Hero Electric", "Sun Petrochemicals", "Reynaers Aluminium", "Insecticides India", "Umicore"],
    span: "md:col-span-3",
  },
  {
    key: "media",
    title: "Media & research",
    desc: "Studios, cinemas and analyst floors.",
    clients: ["UFO Digital Cinema", "Ipsos", "TimesPro", "Startek"],
    span: "md:col-span-3",
  },
  {
    key: "global",
    title: "Global & logistics",
    desc: "Cross-border offices and consultancies.",
    clients: ["Nippon Express", "Air Arabia", "TOTO", "Osource Global", "Semac Consultants", "Fox Mandal"],
    span: "md:col-span-3",
  },
  {
    key: "realestate",
    title: "Developers & real estate",
    desc: "Residential towers and landmark developments across the city.",
    clients: ["Swastik Developers", "Advait Developers", "Kushal Landmark"],
    span: "md:col-span-6",
    wide: true,
  },
];

export function RecognitionGrid({ accreditations }: { accreditations: readonly string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

  return (
    <div ref={ref} className="mt-14 grid grid-cols-1 gap-3 md:mt-16 md:grid-cols-12 md:gap-4">
      {CARDS.map((c, i) => {
        // Each outline draws within its own slice of the scroll, one after another.
        const start = 0.04 + i * 0.07;
        return (
          <Cell key={c.key} card={c} progress={scrollYProgress} start={start} end={start + 0.16} accreditations={accreditations} />
        );
      })}
    </div>
  );
}

function Cell({
  card,
  progress,
  start,
  end,
  accreditations,
}: {
  card: Card;
  progress: MotionValue<number>;
  start: number;
  end: number;
  accreditations: readonly string[];
}) {
  const reduced = usePrefersReducedMotion();
  const drawn = useTransform(progress, [start, end], [0, 1], { clamp: true });

  return (
    <div className={cn("group relative flex flex-col rounded-card p-6 md:p-7", card.span)}>
      {/* outline, draws with scroll */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-hairline transition-colors duration-500 group-hover:text-ink/35"
        aria-hidden="true"
      >
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="14"
          ry="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ pathLength: reduced ? 1 : drawn, opacity: reduced ? 1 : drawn }}
        />
      </svg>

      <div className="relative flex h-full flex-col">
        <h3 className={cn("font-display tracking-tight text-ink", card.big ? "text-xl md:text-2xl" : "text-lg md:text-xl")}>
          {card.title}
        </h3>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink/70">{card.desc}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {card.clients.map((n) => (
            <span
              key={n}
              className="rounded-full border border-hairline bg-paper/60 px-3 py-1.5 font-mono text-2xs uppercase tracking-label text-ink/80 transition-colors duration-300 group-hover:text-ink"
            >
              {n}
            </span>
          ))}
        </div>

        {card.wide && (
          <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-hairline pt-6 md:pt-7">
            <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">Accredited</span>
            {accreditations.map((a) => (
              <span key={a} className="font-display text-lg tracking-tight text-ink/65 md:text-xl">
                {a}
              </span>
            ))}
            <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">· IGBC &amp; USGBC Platinum / Gold</span>
          </div>
        )}
      </div>
    </div>
  );
}
