"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import type { Insight } from "@/content/insights";

/**
 * Scroll-revealed journal index. Each row triggers as it enters the viewport:
 * the hairline draws across, the title rises out from behind it, and the meta +
 * excerpt fade up in sequence. Once-only, and neutralised by reduced-motion via
 * the site's MotionConfig.
 */
const ROW = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};
const LINE = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease: EASE } },
};
const RISE = {
  hidden: { y: "120%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};
const FADE = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function InsightsList({ posts }: { posts: Insight[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <motion.li
          key={post.title}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          variants={ROW}
          className="relative grid grid-cols-1 gap-4 py-9 md:grid-cols-12 md:gap-8"
        >
          {/* Hairline draws across as the row enters */}
          <motion.span
            variants={LINE}
            className="absolute inset-x-0 top-0 h-px origin-left bg-hairline"
            aria-hidden="true"
          />

          <div className="flex items-center gap-4 font-mono text-2xs uppercase tracking-label text-ink-muted md:col-span-3 md:flex-col md:items-start md:gap-2">
            <motion.span variants={FADE} className="text-ink/70">{post.kind}</motion.span>
            <motion.span variants={FADE}>{post.date}</motion.span>
          </div>

          <div className="md:col-span-9">
            <div className="overflow-hidden">
              <motion.h2
                variants={RISE}
                className="max-w-[24ch] pb-[0.14em] font-display text-2xl leading-[1.1] tracking-tight text-ink md:text-3xl"
              >
                {post.title}
              </motion.h2>
            </div>
            <motion.p variants={FADE} className="mt-3 max-w-prose text-base leading-relaxed text-ink-muted">
              {post.excerpt}
            </motion.p>
            <motion.span variants={FADE} className="mt-4 block font-mono text-2xs uppercase tracking-label text-ink/40">
              {post.readTime} read
            </motion.span>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
