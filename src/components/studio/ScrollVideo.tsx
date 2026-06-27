"use client";

import { useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
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
export function ScrollVideo({ src }: { src: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();

  const targetTime = useRef(0);
  const duration = useRef(0);
  const rafId = useRef<number | null>(null);

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

    // Ease currentTime toward the scroll target so the scrub glides. With the
    // all-intra encode every frame is a keyframe, so each seek is cheap.
    const tick = () => {
      const v = videoRef.current;
      if (v && duration.current && !seeking) {
        const cur = v.currentTime;
        const diff = targetTime.current - cur;
        if (Math.abs(diff) > 0.004) {
          try {
            v.currentTime = cur + diff * 0.3;
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
          style={{ objectPosition: "50% 18%" }}
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
      </div>
    </section>
  );
}
