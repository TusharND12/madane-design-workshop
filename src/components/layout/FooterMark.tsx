"use client";

import { motion } from "framer-motion";

/** Oversized wordmark band that fades up as the footer scrolls into view. */
export function FooterMark() {
  return (
    <div className="relative overflow-hidden px-4 pb-[clamp(0.75rem,4vw,3rem)] pt-[clamp(2.5rem,6vw,5rem)]">
      <motion.span
        aria-hidden="true"
        className="block select-none text-center font-display lowercase leading-[0.82] tracking-tighter text-ink/[0.06] text-[clamp(3rem,18vw,15rem)]"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        madane
      </motion.span>
    </div>
  );
}
