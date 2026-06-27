"use client";

import { motion } from "framer-motion";

/**
 * A thin, continuously scrolling strip of the standards we align to. The list is
 * duplicated so the loop is seamless.
 */
export function StandardsMarquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-2">
      <motion.div
        className="flex w-max items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {row.map((s, i) => (
          <span key={i} className="flex items-center font-display text-2xl tracking-tight text-ink/55 md:text-3xl">
            {s}
            <span className="mx-8 text-ink/20 md:mx-12">/</span>
          </span>
        ))}
      </motion.div>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-stone/40 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-stone/40 to-transparent" aria-hidden="true" />
    </div>
  );
}
