"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Hairline reading-progress indicator pinned to the top edge. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-px origin-left bg-ink/70"
      aria-hidden="true"
    />
  );
}
