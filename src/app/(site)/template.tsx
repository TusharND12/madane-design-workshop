"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * Per-navigation transition. template.tsx remounts on every route change, so an
 * ink panel sweeps up to reveal the incoming page (cinematic continuity) while
 * the content settles in. Reduced motion collapses this to an instant show via
 * MotionConfig in the layout.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-[65] bg-paper"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ originY: 0 }}
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
      >
        {children}
      </motion.div>
    </>
  );
}
