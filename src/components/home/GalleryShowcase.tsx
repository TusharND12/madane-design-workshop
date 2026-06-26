"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Apple-style "Gallery" showcase (reference: apple.com/in/iphone-17-pro). A dark
 * paged carousel of rounded cinematic cards: a floating pill header with title +
 * actions, a per-slide headline statement overlaid on full-bleed media, side-
 * peeking neighbour cards, and a bottom control bar with a segmented dot pager
 * that fills on autoplay + a play/pause toggle. Click dots, drag or swipe to move.
 */
type Slide = {
  eyebrow: string;
  headline: string;
  video: string;
  poster: string;
  alt: string;
};

const SLIDES: Slide[] = [
  {
    eyebrow: "Living",
    headline: "Daylight does the dramatic work.",
    video: "/assets/video/living-daylight.mp4",
    poster: "/assets/video/living-daylight.jpg",
    alt: "A daylit living space, planned around its light edges.",
  },
  {
    eyebrow: "Detail",
    headline: "Detailed to the tolerance of furniture.",
    video: "/assets/video/detail-furniture.mp4",
    poster: "/assets/video/detail-furniture.jpg",
    alt: "A kitchen resolved to near-furniture tolerance.",
  },
  {
    eyebrow: "Material",
    headline: "Two neutrals and a single material logic.",
    video: "/assets/video/material-neutrals.mp4",
    poster: "/assets/video/material-neutrals.jpg",
    alt: "A villa interior in two neutrals and one material logic.",
  },
  {
    eyebrow: "Architecture",
    headline: "Architecture and interior, one continuous gesture.",
    video: "/assets/video/architecture-gesture.mp4",
    poster: "/assets/video/architecture-gesture.jpg",
    alt: "Dawn Villa, architecture and interior conceived as one.",
  },
  {
    eyebrow: "Restraint",
    headline: "Finished when there is nothing left to remove.",
    video: "/assets/video/restraint-quiet.mp4",
    poster: "/assets/video/restraint-quiet.jpg",
    alt: "A quiet, resolved space, restraint reading as confidence.",
  },
];

const DURATION = 5.2; // seconds per slide on autoplay

export function GalleryShowcase() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(!reduced);
  const N = SLIDES.length;

  const go = useCallback((i: number) => setActive(((i % N) + N) % N), [N]);

  // Pause autoplay when the section leaves the viewport (saves work + battery).
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  // Swipe / drag to flick between slides.
  const dragStart = useRef<number | null>(null);
  function onPointerDown(e: React.PointerEvent) {
    dragStart.current = e.clientX;
  }
  function onPointerUp(e: React.PointerEvent) {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
  }

  return (
    <section ref={ref} className="overflow-hidden bg-paper pt-section pb-[18vh] text-ink md:pb-[28vh]">
      <div className="shell-wide">
        <div className="flex items-baseline gap-4">
          <span className="section-index">04</span>
          <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">[ The Workshop ]</span>
        </div>
      </div>

      {/* Carousel viewport, narrower than the section so neighbours peek */}
      <div
        className="relative mx-auto mt-10 w-[88%] max-w-[1320px] touch-pan-y md:mt-14"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <motion.div
          className="flex"
          animate={{ x: `-${active * 100}%` }}
          transition={reduced ? { duration: 0 } : { duration: 0.9, ease: EASE }}
        >
          {SLIDES.map((s, i) => (
            <div key={s.headline} className="w-full shrink-0 px-2 md:px-3">
              <Card slide={s} isActive={i === active} priority={i === 0} playing={playing} reduced={reduced} />
            </div>
          ))}
        </motion.div>

        {/* Bottom control bar, segmented dot pager + play/pause */}
        <div className="absolute inset-x-0 bottom-5 z-30 flex justify-center md:bottom-7">
          <div className="flex items-center gap-4 rounded-full border border-ink/12 bg-paper/55 px-4 py-2.5 backdrop-blur-md">
            <div className="flex items-center gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.headline}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to ${s.eyebrow}`}
                  aria-current={i === active}
                  className="group relative h-1.5 overflow-hidden rounded-full bg-ink/25 transition-all duration-500 ease-editorial"
                  style={{ width: i === active ? 38 : 8 }}
                >
                  {i === active &&
                    (reduced ? (
                      <span className="absolute inset-0 bg-ink" />
                    ) : (
                      <span
                        key={`${active}-${playing}`}
                        className="bar-fill absolute inset-y-0 left-0 bg-ink"
                        style={{ animationDuration: `${DURATION}s`, animationPlayState: playing ? "running" : "paused" }}
                        onAnimationEnd={() => go(active + 1)}
                      />
                    ))}
                </button>
              ))}
            </div>

            {!reduced && (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause" : "Play"}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/10 text-ink transition-colors duration-300 hover:bg-ink/20"
              >
                {playing ? (
                  <svg width="10" height="11" viewBox="0 0 10 11" fill="currentColor" aria-hidden="true">
                    <rect x="0" y="0" width="3" height="11" rx="0.6" />
                    <rect x="7" y="0" width="3" height="11" rx="0.6" />
                  </svg>
                ) : (
                  <svg width="10" height="11" viewBox="0 0 10 11" fill="currentColor" aria-hidden="true">
                    <path d="M0 0l10 5.5L0 11z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({
  slide,
  isActive,
  priority,
  playing,
  reduced,
}: {
  slide: Slide;
  isActive: boolean;
  priority: boolean;
  playing: boolean;
  reduced: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only the active card plays; rewind + play on becoming active, pause otherwise.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    if (isActive && playing) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [isActive, playing, reduced]);

  return (
    <div className="relative h-[64vh] min-h-[460px] overflow-hidden rounded-[clamp(1.5rem,3vw,2.25rem)] bg-mount md:h-[72vh]">
      <video
        ref={videoRef}
        poster={slide.poster}
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        aria-label={slide.alt}
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-editorial ${
          isActive ? "scale-100 grayscale-0 brightness-[1.04]" : "scale-[1.04] grayscale brightness-[0.35]"
        }`}
      >
        <source src={slide.video} type="video/mp4" />
      </video>
      {/* Cinematic scrims, lighter on the active card so the centre reads bright */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-paper/60 via-transparent to-paper/55"
        animate={{ opacity: isActive ? 0.65 : 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        aria-hidden="true"
      />
      {/* Dim non-active neighbours further */}
      <motion.div
        className="absolute inset-0 bg-paper"
        animate={{ opacity: isActive ? 0 : 0.62 }}
        transition={{ duration: 0.6, ease: EASE }}
        aria-hidden="true"
      />

      {/* Readability scrim concentrated behind the headline so white type reads
          on bright, daylit footage, the cinematic centre stays bright. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-paper/75 via-paper/35 to-transparent"
        aria-hidden="true"
      />

      {/* Headline statement */}
      <motion.div
        className="absolute inset-x-0 top-[16%] z-10 px-6 text-center md:top-[18%]"
        style={{ textShadow: "0 2px 28px rgba(15,15,15,0.55)" }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 18 }}
        transition={{ duration: 0.7, ease: EASE, delay: isActive ? 0.18 : 0 }}
      >
        <span className="font-mono text-2xs uppercase tracking-[0.4em] text-ink/70">{slide.eyebrow}</span>
        <h3 className="mx-auto mt-5 max-w-[18ch] font-display text-[clamp(1.85rem,4.6vw,3.5rem)] font-medium leading-[1.04] tracking-tight text-ink">
          {slide.headline}
        </h3>
      </motion.div>
    </div>
  );
}
