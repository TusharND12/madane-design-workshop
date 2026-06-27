"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { EASE } from "@/lib/motion";

type Leader = { name: string; role: string; credential: string; bio: string; portrait: string };
type Social = { label: string; href: string };

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const pad = (n: number) => String(n).padStart(2, "0");
const initials = (name: string) =>
  name
    .replace(/^Ar\.\s*/, "")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
const firstName = (name: string) => name.replace(/^Ar\.\s*/, "").split(" ")[0];

// Per-partner focal point for the card crop, faces sit at different heights in
// their photos, so each is positioned to read clearly in the upper zone, above
// the name block (the men sit high, the women lower).
const FOCUS: Record<string, string> = {
  "Ar. Hrishikesh Arun Madane": "50% 16%",
  "Akshay Arun Madane": "50% 20%",
  "Ar. Rasika Hrishikesh Madane": "56% 33%",
  "Priyanka Akshay Madane": "54% 40%",
};

// A small tail keeps the last partner on screen for a beat before the pinned
// section releases and the page continues down to the next section.
const TAIL = 0.08;

/**
 * Leadership, the partners behind the practice. The section pins and scrolling
 * steps through the partners — the active card grows to a full portrait while the
 * name, role and bio swap alongside; after the last partner it releases. Desktop
 * shows the bio beside the card strip; phones stack a card strip over a compact
 * swapping bio. Both are scroll-driven.
 */
export function LeadershipShowcase({
  items,
  socials,
  header,
}: {
  items: readonly Leader[];
  socials: readonly Social[];
  header?: React.ReactNode;
}) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setIsDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  return isDesktop ? (
    <PinnedDesktop items={items} socials={socials} header={header} />
  ) : (
    <PinnedMobile items={items} socials={socials} header={header} />
  );
}

/* Shared scroll-pin progress, geometric so it survives the route's `zoom: 0.9`
   (PageZoom) skew. Returns the live active index and a programmatic navigator. */
function usePinScroll(N: number) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollY } = useScroll();

  const update = () => {
    const parent = parentRef.current;
    if (!parent) return;
    const range = parent.offsetHeight - window.innerHeight;
    if (range <= 0) return;
    const top = parent.getBoundingClientRect().top; // 0 at pin-start → -range at pin-end
    const p = clamp(-top / range / (1 - TAIL), 0, 1);
    setActive(Math.min(N - 1, Math.floor(p * N)));
  };

  useMotionValueEvent(scrollY, "change", update);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Arrows / tapping a face scroll to that partner's segment, so the scroll
  // position (the source of truth for `active`) stays in sync.
  const navTo = (i: number) => {
    const parent = parentRef.current;
    if (!parent) return;
    const range = parent.offsetHeight - window.innerHeight;
    const idx = clamp(i, 0, N - 1);
    const target = parent.offsetTop + ((idx + 0.5) / N) * (1 - TAIL) * range;
    const lenis = window.__lenis;
    if (lenis && typeof lenis.scrollTo === "function") lenis.scrollTo(target, { duration: 0.9 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return { parentRef, active, navTo };
}

/* Desktop, pinned, bio beside the card strip. */
function PinnedDesktop({ items, socials, header }: { items: readonly Leader[]; socials: readonly Social[]; header?: React.ReactNode }) {
  const N = items.length;
  const { parentRef, active, navTo } = usePinScroll(N);

  return (
    <section ref={parentRef} className="relative bg-stone/40" style={{ height: `${N * 80}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <Body items={items} socials={socials} active={active} onSelect={navTo} onStep={(d) => navTo(active + d)} header={header} />
      </div>
    </section>
  );
}

/* Mobile, pinned, card strip over a compact swapping bio — scroll advances. */
function PinnedMobile({ items, socials, header }: { items: readonly Leader[]; socials: readonly Social[]; header?: React.ReactNode }) {
  const N = items.length;
  const { parentRef, active, navTo } = usePinScroll(N);
  const a = items[active];

  return (
    <section ref={parentRef} className="relative bg-stone/40" style={{ height: `${N * 78}vh` }}>
      {/* Header scrolls in just before the strip pins */}
      <div className="shell-wide pt-[clamp(2.5rem,7vh,4rem)]">{header}</div>

      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="shell-wide w-full">
          <CardStack items={items} active={active} onSelect={navTo} className="flex h-[54svh] min-h-[360px] flex-col gap-2.5" />

          <AnimatePresence mode="wait">
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="mt-6"
            >
              <p className="line-clamp-3 max-w-prose text-sm leading-relaxed text-ink-muted">{a.bio}</p>
              <div className="mt-4 flex items-center gap-4">
                <span className="font-mono text-2xs tracking-label text-ink-muted">
                  {pad(active + 1)} <span className="text-ink/30">/ {pad(N)}</span>
                </span>
                <div className="flex items-center gap-2.5">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={`${a.name}, ${s.label}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-ink-muted transition-colors duration-300 hover:border-ink hover:text-ink"
                    >
                      <SocialIcon label={s.label} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* The partners as a stack of premium cards, the active one expands to a full
   card face, the rest collapse to labelled bars. */
function CardStack({
  items,
  active,
  onSelect,
  className,
}: {
  items: readonly Leader[];
  active: number;
  onSelect: (i: number) => void;
  className: string;
}) {
  const N = items.length;
  return (
    <div className={className}>
      {items.map((m, i) => {
        const isActive = i === active;
        return (
          <button
            key={m.name}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Show ${m.name}`}
            aria-pressed={isActive}
            className="group relative block overflow-hidden rounded-[1.35rem] text-left ring-1 ring-white/10 shadow-[0_26px_55px_-30px_rgba(0,0,0,0.9)]"
            style={{
              flexGrow: isActive ? 6 : 1,
              flexBasis: 0,
              transition: "flex-grow 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Card face, the portrait */}
            {m.portrait ? (
              <Image
                src={m.portrait}
                alt={`${m.name}, ${m.role}.`}
                fill
                sizes="(max-width:768px) 100vw, 55vw"
                style={{ objectPosition: FOCUS[m.name] ?? "50% 20%" }}
                className={`object-cover transition-all duration-700 ease-editorial ${isActive ? "scale-100 grayscale-0 brightness-95" : "scale-105 grayscale brightness-[0.6] group-hover:brightness-75"}`}
              />
            ) : (
              <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-mount font-display text-4xl tracking-tight text-ink/40">
                {initials(m.name)}
              </span>
            )}

            {/* Theme tint + brushed-metal sheen */}
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-stone/35 via-transparent to-sand/30" />
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(115deg,transparent_32%,rgba(236,236,230,0.10)_47%,transparent_62%)]" />

            {/* Legibility scrims */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-black/55 to-transparent" />
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            {/* Top row, wordmark + chip (active card only) */}
            <span className={`absolute inset-x-0 top-0 flex items-center justify-between px-5 py-4 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}>
              <span className="font-display text-sm lowercase tracking-tight text-ink/90">madane</span>
              <Chip />
            </span>

            {/* Embossed name block (active card only) */}
            <span className={`absolute inset-x-0 bottom-0 block px-5 pb-5 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}>
              <span className="block font-mono text-2xs uppercase tracking-[0.32em] text-ink/55">{pad(i + 1)} · Partner</span>
              <span className="mt-1.5 block font-display text-[clamp(1.4rem,2.4vw,2rem)] font-light leading-[1.05] tracking-tight text-ink">{m.name}</span>
              <span className="mt-1 block font-mono text-2xs uppercase tracking-label text-ink/70">{m.role}</span>
            </span>

            {/* Compact bar (collapsed card) */}
            <span className={`absolute inset-0 flex items-center justify-between px-5 transition-opacity duration-300 ${isActive ? "opacity-0" : "opacity-100"}`}>
              <span className="font-display text-base lowercase tracking-tight text-ink/85">{firstName(m.name)}</span>
              <span className="font-mono text-2xs uppercase tracking-[0.3em] text-ink/45">{pad(i + 1)} / {pad(N)}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* Desktop layout, left = the active partner, right = the portrait strip. */
function Body({
  items,
  socials,
  active,
  onSelect,
  onStep,
  header,
}: {
  items: readonly Leader[];
  socials: readonly Social[];
  active: number;
  onSelect: (i: number) => void;
  onStep: (dir: number) => void;
  header?: React.ReactNode;
}) {
  const a = items[active];
  const N = items.length;

  return (
    <div className="shell-wide w-full py-[clamp(2.5rem,6vh,5rem)]">
      {header}

      <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-12 md:gap-12">
        {/* Left, the active partner */}
        <div className="md:col-span-5 md:self-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <h3 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1] tracking-tight">{a.name}</h3>
              <span className="mt-4 block font-mono text-2xs uppercase tracking-label text-ink-muted">{a.role}</span>
              <span className="mt-1.5 block font-mono text-2xs uppercase tracking-label text-ink/40">{a.credential}</span>

              <div className="mt-6 flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={`${a.name}, ${s.label}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-muted transition-colors duration-300 hover:border-ink hover:text-ink"
                  >
                    <SocialIcon label={s.label} />
                  </a>
                ))}
              </div>

              <p className="mt-7 max-w-prose text-base leading-relaxed text-ink-muted">{a.bio}</p>
            </motion.div>
          </AnimatePresence>

          {/* arrow toggle + index */}
          <div className="mt-9 flex items-center gap-5">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label="Previous partner"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink-muted transition-colors duration-300 hover:border-ink hover:text-ink"
              >
                <Arrow dir="left" />
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label="Next partner"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink-muted transition-colors duration-300 hover:border-ink hover:text-ink"
              >
                <Arrow dir="right" />
              </button>
            </div>
            <span className="font-mono text-2xs tracking-label text-ink-muted">
              {pad(active + 1)} <span className="text-ink/30">/ {pad(N)}</span>
            </span>
          </div>
        </div>

        {/* Right, the card strip */}
        <div className="md:col-span-7">
          <CardStack
            items={items}
            active={active}
            onSelect={onSelect}
            className="flex h-[60vh] min-h-[440px] flex-col gap-3 md:h-[clamp(400px,56vh,560px)]"
          />
        </div>
      </div>
    </div>
  );
}

/* A small brushed-metal EMV chip, warm taupe to sit with the sand palette. */
function Chip() {
  return (
    <span aria-hidden="true" className="relative block h-6 w-8 overflow-hidden rounded-[5px] bg-gradient-to-br from-[#bda87e] via-[#8d7a52] to-[#5f5137] ring-1 ring-black/30">
      <span className="absolute inset-x-1.5 top-1/2 h-px -translate-y-1/2 bg-black/25" />
      <span className="absolute inset-y-1.5 left-1/2 w-px -translate-x-1/2 bg-black/25" />
    </span>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={dir === "left" ? "rotate-180" : ""}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function SocialIcon({ label }: { label: string }) {
  if (label === "LinkedIn") {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.94 5a1.94 1.94 0 11-3.88 0 1.94 1.94 0 013.88 0zM3.4 8.4h3.1V21H3.4zM9.2 8.4h2.97v1.72h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.74V21h-3.1v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85V21H9.2z" />
      </svg>
    );
  }
  if (label === "Instagram") {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="3.8" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (label === "Behance") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8.2 11.3c.7-.35 1.1-.95 1.1-1.85 0-1.6-1.2-2.25-2.9-2.25H2v9.6h4.6c1.85 0 3.2-.9 3.2-2.75 0-1.1-.5-1.95-1.6-2.25zM4 9h2.1c.7 0 1.2.3 1.2 1s-.45 1-1.2 1H4V9zm2.35 5.6H4v-2.15h2.4c.85 0 1.35.35 1.35 1.05 0 .75-.55 1.1-1.4 1.1zM15.6 9.6c-2.05 0-3.45 1.45-3.45 3.55 0 2.15 1.35 3.5 3.5 3.5 1.6 0 2.75-.7 3.2-2h-1.85c-.2.45-.65.65-1.25.65-.85 0-1.45-.5-1.5-1.4h4.7c.15-2.4-1.1-4.3-3.35-4.3zm-1.35 2.85c.1-.8.6-1.3 1.35-1.3.8 0 1.25.5 1.3 1.3h-2.65zM14 8.05h4v.95h-4z" />
      </svg>
    );
  }
  // Email
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.6 7.5 12 13l8.4-5.5" />
    </svg>
  );
}
