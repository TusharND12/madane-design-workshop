"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * First-visit page loader (PRD premium feature). White disc + dark monogram
 * (the intro-* asset kit) compose the mark; a hairline counter runs; then a
 * vertical wipe reveals the site. Once per session; skipped for reduced motion.
 */
export function Loader() {
  const reduced = usePrefersReducedMotion();
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("mdw-loaded")) return;

    setShow(true);
    window.__lenis?.stop?.();
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const DURATION = 1300;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("mdw-loaded", "1");
        setTimeout(() => setShow(false), 260);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  useEffect(() => {
    if (!show) {
      document.body.style.overflow = "";
      window.__lenis?.start?.();
    }
  }, [show]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper text-ink"
          exit={{ y: "-100%", transition: { duration: 0.9, ease: EASE } }}
          aria-hidden="true"
        >
          <div className="relative h-[180px] w-[155px]">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.9, ease: EASE } }}
            >
              <Image src="/assets/intro-disc.png" alt="" width={502} height={590} className="h-full w-full object-contain" priority />
            </motion.div>
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.35, duration: 0.7, ease: EASE } }}
            >
              <Image src="/assets/intro-mark.png" alt="" width={502} height={590} className="h-full w-full object-contain" priority />
            </motion.div>
          </div>

          <motion.div
            className="mt-7 flex flex-col items-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.6, ease: EASE } }}
          >
            <span className="font-display text-2xl lowercase tracking-tight">madane</span>
            <span className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.34em] text-ink/55">design workshop</span>
          </motion.div>

          <div className="absolute inset-x-0 bottom-0">
            <div className="shell-wide flex items-center justify-between pb-7 font-mono text-2xs uppercase tracking-label text-ink/45">
              <span>Loading</span>
              <span className="tabular-nums">{String(count).padStart(3, "0")}</span>
            </div>
            <div className="h-px w-full bg-ink/15">
              <motion.div className="h-full bg-ink" style={{ width: `${count}%` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
