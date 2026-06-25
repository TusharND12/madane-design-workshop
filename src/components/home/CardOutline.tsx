"use client";

import { motion } from "framer-motion";

/**
 * A box outline that draws itself in as the card scrolls into view. The card
 * fill matches the section, so the stroke is the only thing defining it.
 */
export function CardOutline({ delay = 0 }: { delay?: number }) {
  return (
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
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ pathLength: { duration: 1.15, ease: [0.16, 1, 0.3, 1], delay }, opacity: { duration: 0.3, delay } }}
      />
    </svg>
  );
}
