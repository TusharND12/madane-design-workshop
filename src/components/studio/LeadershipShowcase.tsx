"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Leader = { name: string; role: string; credential: string; bio: string; portrait: string };
type Social = { label: string; href: string };

const initials = (name: string) =>
  name
    .replace(/^Ar\.\s*/, "")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

/**
 * Leadership — an active portrait beside a clickable strip of the team. Selecting
 * a face grows its portrait to fill the frame and swaps the name, role and bio
 * alongside it. Mirrors the services accordion mechanic, synced to the copy.
 */
export function LeadershipShowcase({ items, socials, email }: { items: readonly Leader[]; socials: readonly Social[]; email: string }) {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const a = items[active];

  return (
    <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-12">
      {/* Left — the active leader */}
      <div className="md:col-span-5 md:self-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
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
                  aria-label={`${a.name} — ${s.label}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-muted transition-colors duration-300 hover:border-ink hover:text-ink"
                >
                  <SocialIcon label={s.label} />
                </a>
              ))}
            </div>

            <p className="mt-7 max-w-prose text-base leading-relaxed text-ink-muted">{a.bio}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right — portrait strip */}
      <div className="md:col-span-7">
        <div className="flex h-[60vh] min-h-[420px] flex-col gap-2 md:h-[clamp(380px,52vh,520px)] md:flex-row">
          {items.map((m, i) => {
            const isActive = i === active;
            return (
              <button
                key={m.name}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-label={`Show ${m.name}`}
                aria-pressed={isActive}
                className="group relative block overflow-hidden rounded-card bg-mount"
                style={{
                  flexGrow: reduced ? 1 : isActive ? 6 : 1,
                  flexBasis: 0,
                  transition: reduced ? undefined : "flex-grow 0.7s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {m.portrait ? (
                  <Image
                    src={m.portrait}
                    alt={`${m.name} — ${m.role}.`}
                    fill
                    sizes="(max-width:768px) 100vw, 40vw"
                    className={`object-cover object-top transition-all duration-700 ease-editorial ${isActive ? "grayscale-0 brightness-100" : "grayscale brightness-[0.78] group-hover:brightness-90"}`}
                  />
                ) : (
                  <span aria-hidden="true" className={`flex h-full w-full items-center justify-center font-display tracking-tight ${isActive ? "text-6xl text-ink/85" : "text-3xl text-ink/55"}`}>
                    {initials(m.name)}
                  </span>
                )}

                {/* collapsed: vertical name tab */}
                <motion.span
                  animate={{ opacity: isActive ? 0 : 1 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="pointer-events-none absolute inset-x-0 bottom-4 hidden justify-center md:flex"
                >
                  <span className="font-mono text-2xs uppercase tracking-label text-ink [writing-mode:vertical-rl] [text-orientation:mixed]">
                    {m.name.replace(/^Ar\.\s*/, "").split(" ")[0]}
                  </span>
                </motion.span>

                {/* mobile collapsed name */}
                <span className="absolute bottom-3 left-4 font-mono text-2xs uppercase tracking-label text-ink md:hidden">
                  {m.name.replace(/^Ar\.\s*/, "").split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
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
