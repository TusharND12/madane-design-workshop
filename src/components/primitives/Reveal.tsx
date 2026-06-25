"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  as?: "div" | "section" | "li" | "span" | "figure" | "article";
};

/**
 * The single reveal primitive (opacity 0→1 + 16px rise, once only).
 * Framer honours prefers-reduced-motion automatically via MotionConfig set in
 * the site layout, collapsing this to a cross-fade.
 */
export function Reveal({ children, delay = 0, as = "div", style, ...rest }: RevealProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
      style={style}
      {...rest}
    >
      {children}
    </Comp>
  );
}
