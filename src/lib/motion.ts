import type { Variants, Transition } from "framer-motion";

/**
 * Shared motion language (PRD §6.5). One ease, restrained travel, once-only.
 * Every reveal in the site routes through these so a single reduced-motion
 * switch can neutralise all of it.
 */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const reveal: Transition = { duration: 0.72, ease: EASE };
export const fast: Transition = { duration: 0.3, ease: EASE };

/** Opacity 0 → 1 + 16px rise. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: reveal },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: reveal },
};

/** Stagger container for sequenced children (e.g. headline words, tiles). */
export const stagger = (gap = 0.07, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "0.4em", filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
};

/** Mask-reveal for images (clip from bottom). */
export const maskReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.0, ease: EASE } },
};

export const viewportOnce = { once: true, amount: 0.35 } as const;
