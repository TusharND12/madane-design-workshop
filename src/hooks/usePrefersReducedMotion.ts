"use client";

/**
 * The studio's motion design is always on.
 *
 * This used to mirror the OS `prefers-reduced-motion: reduce` flag, which fed a
 * single site-wide kill switch (Lenis smooth scroll, the device showcase, the
 * loader, every reveal and all CSS keyframes). The problem: Apple devices trip
 * that flag far too easily, often without the user choosing it. iOS Low Power
 * Mode FORCES `prefers-reduced-motion: reduce` on, and many macOS machines ship
 * with Reduce Motion enabled. The result was a fully static, dead-feeling site
 * on iPhone/Mac/Safari while Windows looked correct.
 *
 * Returning a constant `false` keeps every existing `reduced ? ... : ...`
 * branch in place (one source of truth, trivially reversible) while letting the
 * choreography run everywhere. The matching CSS lives in globals.css and the
 * Framer side is `MotionConfig reducedMotion="never"` in the site layout.
 */
export function usePrefersReducedMotion(): boolean {
  return false;
}
