"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// How tall the scroll track is — taller reads as a slower, more deliberate
// scrub. The video is pinned for the whole track and its playback is driven by
// scroll position (yodezeen.com/about style), eased so it glides.
const TRACK_VH = 280;

/**
 * A cinematic interlude: a full-bleed video whose playback is scrubbed by scroll
 * rather than auto-playing. The section pins; scrolling down advances the video
 * forward, scrolling up rewinds it. Reduced-motion falls back to a quiet looping
 * clip. Styled to the studio's dark, editorial theme.
 */
export function ScrollVideo({
  src,
  label,
  statement,
}: {
  src: string;
  label: string;
  statement: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();

  const targetTime = useRef(0);
  const duration = useRef(0);
  const rafId = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  // Map scroll position over the section to 0..1, geometric so it survives the
  // route's `zoom` (PageZoom) skew like the other pinned sections do.
  const measure = () => {
    const el = sectionRef.current;
    if (!el) return;
    const range = el.offsetHeight - window.innerHeight;
    if (range <= 0) return;
    const top = el.getBoundingClientRect().top; // 0 at pin-start → -range at pin-end
    const p = clamp(-top / range, 0, 1);
    targetTime.current = p * (duration.current || 0);
    setProgress(p);
  };

  useMotionValueEvent(scrollY, "change", measure);

  useEffect(() => {
    if (reduced) return;
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => {
      duration.current = video.duration || 0;
      measure();
    };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    // Ease currentTime toward the scroll target so the scrub glides instead of
    // snapping frame-to-frame.
    const tick = () => {
      const v = videoRef.current;
      if (v && duration.current) {
        const cur = v.currentTime;
        const diff = targetTime.current - cur;
        if (Math.abs(diff) > 0.01) {
          try {
            v.currentTime = cur + diff * 0.12;
          } catch {
            /* seeking can throw mid-load; ignore and retry next frame */
          }
        }
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    window.addEventListener("resize", measure);
    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const words = statement.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative bg-paper"
      style={reduced ? undefined : { height: `${TRACK_VH}vh` }}
      aria-label="Studio film"
    >
      <div
        className={
          reduced
            ? "relative h-[68svh] min-h-[420px] overflow-hidden"
            : "sticky top-0 h-[100svh] overflow-hidden"
        }
      >
        {/* Poster colour behind the frame while it buffers */}
        <div className="absolute inset-0 bg-mount" aria-hidden="true" />

        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          muted
          playsInline
          preload="auto"
          autoPlay={reduced}
          loop={reduced}
          tabIndex={-1}
          aria-hidden="true"
        />

        {/* Legibility scrims, ink falloff (no colour) to keep the grade quiet */}
        <div className="absolute inset-0 bg-gradient-to-b from-paper/70 via-paper/15 to-paper/80" aria-hidden="true" />
        <div className="absolute inset-0 bg-paper/15" aria-hidden="true" />

        {/* Cinematic vignette on large screens */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden min-[1200px]:block"
          style={{
            background:
              "radial-gradient(120% 110% at 50% 45%, transparent 50%, rgba(15,15,15,0.34) 78%, rgba(15,15,15,0.66) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="shell-wide flex items-center justify-between pt-[clamp(5rem,12vh,8rem)]">
            <span className="font-mono text-2xs uppercase tracking-label text-ink/70">{label}</span>
            <span className="font-mono text-2xs uppercase tracking-label tabular-nums text-ink/55">
              {String(Math.round(progress * 100)).padStart(2, "0")}
              <span className="text-ink/30"> / 100</span>
            </span>
          </div>

          <div className="shell-wide pb-[clamp(3rem,9vh,6rem)]">
            <h2 className="max-w-[18ch] font-display text-[clamp(1.9rem,5vw,4rem)] font-light leading-[1.04] tracking-tight text-ink">
              {words.map((w, i) => {
                // Words brighten in sequence as the scrub advances.
                const at = i / words.length;
                const lit = progress >= at - 0.04;
                return (
                  <span key={i} className="inline-block overflow-hidden align-bottom">
                    <motion.span
                      animate={{ opacity: lit ? 1 : 0.28, y: lit ? 0 : 6 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block pr-[0.26em]"
                    >
                      {w}
                    </motion.span>
                  </span>
                );
              })}
            </h2>

            {/* Scrub progress line */}
            <div className="mt-8 h-px w-full max-w-md bg-ink/15" aria-hidden="true">
              <div className="h-px bg-ink/80" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
