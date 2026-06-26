"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { EASE } from "@/lib/motion";

/**
 * Decorative line-art "building" wrapped around the project grid — a flat-roof
 * structure standing on slender pilotis above a ground line, drawn from
 * hairlines, so the cards read as floors placed inside an architectural shell.
 * Purely decorative; the lines draw in once on scroll.
 */
export function ArchitectureFrame() {
  const reduced = usePrefersReducedMotion();

  // Build the draw-in props for a horizontal (x) or vertical (y) hairline.
  const draw = (axis: "x" | "y", delay: number) => {
    if (reduced) return {};
    const key = axis === "x" ? "scaleX" : "scaleY";
    return {
      initial: { [key]: 0 },
      whileInView: { [key]: 1 },
      viewport: { once: true, amount: 0.2 },
      transition: { duration: 0.9, ease: EASE, delay },
    };
  };

  const line = "absolute bg-ink/22";
  const stilts = [12, 31, 50, 69, 88];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* roof penthouse box */}
      <motion.span
        className="absolute left-1/2 top-2 h-3 w-20 -translate-x-1/2 border-x border-t border-ink/22"
        initial={reduced ? undefined : { opacity: 0 }}
        whileInView={reduced ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
      />
      {/* roofline */}
      <motion.span className={`${line} left-3 right-3 top-5 h-px origin-left`} {...draw("x", 0)} />
      {/* side walls */}
      <motion.span className={`${line} left-3 top-5 bottom-9 w-px origin-top`} {...draw("y", 0.15)} />
      <motion.span className={`${line} right-3 top-5 bottom-9 w-px origin-top`} {...draw("y", 0.15)} />
      {/* ground line */}
      <motion.span className={`${line} inset-x-1 bottom-5 h-px origin-left`} {...draw("x", 0.3)} />
      {/* pilotis / stilts */}
      {stilts.map((x, i) => (
        <motion.span
          key={x}
          className={`${line} bottom-5 h-4 w-px origin-bottom`}
          style={{ left: `${x}%` }}
          {...draw("y", 0.4 + i * 0.05)}
        />
      ))}
    </div>
  );
}
