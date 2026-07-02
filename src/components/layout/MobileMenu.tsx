"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/content/site";
import { Bracket } from "@/components/primitives/Bracket";
import { EASE } from "@/lib/motion";

const overlay = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE, when: "beforeChildren", staggerChildren: 0.06 } },
  exit: { opacity: 0, transition: { duration: 0.35, ease: EASE, when: "afterChildren" } },
};
const line = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  exit: { opacity: 0, y: 16, transition: { duration: 0.25, ease: EASE } },
};

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Lock scroll + Esc to close + restore focus.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop?.();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.__lenis?.start?.();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // "Let's talk" is a standalone CTA on desktop; add it here so mobile can reach
  // the enquiry page from the menu too.
  const navItems = [...site.nav, { label: "Let's talk", href: "/lets-talk" }];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={overlay}
          initial="hidden"
          animate="show"
          exit="exit"
          className="on-ink fixed inset-0 z-[70] flex flex-col bg-paper text-ink"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="shell-wide flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <span className="font-display text-[1.35rem] lowercase tracking-tight">madane</span>
            <button type="button" onClick={onClose} aria-label="Close menu" className="link-underline font-mono text-2xs uppercase tracking-label">
              [ close ]
            </button>
          </div>

          {/* Right-hand camera-zoom dial, the items ride a gentle arc anchored to
              the right edge: the centre item reaches furthest in and the ends ease
              back. Same labels, same sizes; only a per-row right offset curves it. */}
          <nav aria-label="Primary" className="shell-wide flex flex-1 flex-col items-end justify-center gap-1 py-12 text-right">
            {navItems.map((item, i) => {
              const dmax = (navItems.length - 1) / 2;
              const t = dmax === 0 ? 0 : (i - dmax) / dmax; // -1 (top) … 1 (bottom)
              const bulge = Math.sqrt(Math.max(0, 1 - t * t)); // 1 at centre, 0 at ends
              // Push each row off the right edge along the semicircle profile so the
              // rows bow out into an arc - furthest at the centre rows.
              return (
                <motion.div key={item.href} variants={line} style={{ marginRight: `${(bulge * 12).toFixed(2)}vw` }}>
                  <Link href={item.href} onClick={onClose} className="group flex flex-row-reverse items-baseline gap-5 py-2">
                    <span className="font-mono text-2xs tracking-label text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-[15vw] leading-[1.02] tracking-tighter transition-opacity duration-300 group-hover:opacity-60 sm:text-6xl">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <motion.div variants={line} className="shell-wide flex flex-col gap-4 border-t border-ink/15 py-8 sm:flex-row sm:items-center sm:justify-between">
            <Bracket className="text-ink/50">Enquire</Bracket>
            <div className="flex flex-wrap gap-x-8 gap-y-2 font-sans text-sm text-ink/70">
              <a href={site.contact.phoneHref} className="link-underline">{site.contact.phoneDisplay}</a>
              <a href={`mailto:${site.contact.email}`} className="link-underline">{site.contact.email}</a>
              <a href={`https://wa.me/${site.contact.whatsapp}`} className="link-underline">WhatsApp</a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
