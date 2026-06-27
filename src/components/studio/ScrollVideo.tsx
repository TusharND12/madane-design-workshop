"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// How tall the scroll track is - taller reads as a slower, more deliberate
// scrub. The video is pinned for the whole track and its playback is driven by
// scroll position (yodezeen.com/about style), eased so it glides. A longer track
// spreads the reveal over more scroll, so each frame gets finer control and the
// scrub reads smoother.
const TRACK_VH = 230;

/**
 * A cinematic interlude: a full-bleed video whose playback is scrubbed by scroll
 * rather than auto-playing. The section pins; scrolling down advances the video
 * forward, scrolling up rewinds it. Reduced-motion falls back to a quiet looping
 * clip. Styled to the studio's dark, editorial theme.
 */
export function ScrollVideo({ src }: { src: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();

  const targetTime = useRef(0);
  const duration = useRef(0);
  const rafId = useRef<number | null>(null);

  // Scroll progress through the section (0..1), used to drive the storytelling
  // overlays - a kicker caption that fades through, and a hairline that fills.
  const progress = useMotionValue(0);
  const kickerOpacity = useTransform(progress, [0, 0.12, 0.68, 0.9], [0, 1, 1, 0]);

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
    progress.set(p);
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

    // Gate seeks on the seek lifecycle: never issue a new seek while one is
    // still in flight, otherwise requests pile up and the playback stutters.
    let seeking = false;
    const onSeeking = () => (seeking = true);
    const onSeeked = () => (seeking = false);
    video.addEventListener("seeking", onSeeking);
    video.addEventListener("seeked", onSeeked);

    // Ease currentTime toward the scroll target so the scrub glides. The easing
    // is frame-rate independent (exponential smoothing on elapsed time), so the
    // motion stays steady at 60Hz, 120Hz or under load. With the all-intra
    // encode every frame is a keyframe, so each seek is cheap.
    const SMOOTH = 5.5; // higher = snappier, lower = silkier/more trailing
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const v = videoRef.current;
      if (v && duration.current && !seeking) {
        const cur = v.currentTime;
        const diff = targetTime.current - cur;
        if (Math.abs(diff) > 0.0015) {
          const f = 1 - Math.exp(-SMOOTH * dt);
          try {
            v.currentTime = cur + diff * f;
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
      video.removeEventListener("seeking", onSeeking);
      video.removeEventListener("seeked", onSeeked);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black pt-[var(--header-h)]"
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
        {/* Black field behind the frame so the full composition reads edge to
            edge (and any letterbox bars stay invisible against the clip). */}
        <div className="absolute inset-0 bg-black" aria-hidden="true" />

        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-contain"
          style={{ objectPosition: "50% 50%" }}
          src={src}
          muted
          playsInline
          preload="auto"
          autoPlay={reduced}
          loop={reduced}
          tabIndex={-1}
          aria-hidden="true"
        />

        {/* Cinematic vignette - darkens the corners toward black so the frame
            reads graded. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(130% 120% at 50% 42%, transparent 52%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.95) 100%)",
          }}
        />
        {/* Feather every edge into black so the video melts softly at its borders. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #000 0%, transparent 16%, transparent 84%, #000 100%), linear-gradient(to bottom, #000 0%, transparent 14%, transparent 86%, #000 100%)",
          }}
        />
        {/* Very bottom blends into the next (paper) section cleanly. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[10%]"
          style={{ background: "linear-gradient(to bottom, transparent, #000)" }}
        />

        {/* Kicker caption - fades in over the film and out as you scroll past. */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: kickerOpacity }}
          className="pointer-events-none absolute left-[clamp(1.25rem,4vw,3rem)] top-[clamp(5.5rem,14vh,9rem)] z-30"
        >
          <span className="block font-mono text-2xs uppercase tracking-label text-ink/70">Since 2008</span>
          <span className="mt-1 block max-w-[18ch] font-display text-xl font-light leading-tight tracking-tight text-ink/90 md:text-2xl">
            The people behind the practice.
          </span>
        </motion.div>

      </div>
    </section>
  );
}
