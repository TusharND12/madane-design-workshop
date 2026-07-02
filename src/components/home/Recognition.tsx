"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * Trusted across India, a cinematic, scroll-driven interlude. The section pins;
 * the client logos read first, then a full-bleed monochrome handshake fades in
 * and is scrubbed frame-by-frame by scroll (all-intra encode). A slow push-in
 * rides the clasp. Once the hands meet the roster is gone, the film dissolves to
 * black, and the process statement rises in its place before the page releases
 * into the process steps.
 */
const LOGOS = [
  "/assets/clients/boomlet.png",
  "/assets/clients/finulent.png",
  "/assets/clients/insecticides.png",
  "/assets/clients/moneyboxx.png",
  "/assets/clients/osource.png",
  "/assets/clients/pb-partners.png",
];
const ROW_TOP = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];
const ROW_BOTTOM = (() => {
  const r = [...LOGOS].reverse();
  return [...r, ...r, ...r, ...r];
})();

// Scroll windows (section progress 0..1). The roster reads first and fully
// clears over black BEFORE the handshake appears, so the clasp never shows
// behind the logos.
const CONTENT_IN_END = 0.06; // the roster fades in as the section pins
const CONTENT_OUT_START = 0.14;
const CONTENT_OUT_END = 0.24;
const VIDEO_IN = 0.26; // handshake follows the roster with little delay
const SCRUB_START = 0.34;
const SCRUB_END = 0.6; // hands clasp; the film then holds and stays on screen
const STATEMENT_IN_START = 0.66; // statement + CTA compose into the clasp's empty spaces
const STATEMENT_IN_END = 0.8;

export function Recognition() {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <StaticClients />;
  return <Cinematic />;
}

function Cinematic() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);
  const duration = useRef(0);
  const rafId = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const videoOpacity = useTransform(scrollYProgress, [VIDEO_IN, SCRUB_START], [0, 1]); // fades in, then stays (holds the clasp)
  const pushIn = useTransform(scrollYProgress, [SCRUB_START, SCRUB_END], [1.06, 1.0]); // slow pull-back settles at the clasp
  const contentOpacity = useTransform(scrollYProgress, [0, CONTENT_IN_END, CONTENT_OUT_START, CONTENT_OUT_END], [0, 1, 1, 0]);
  const statementOpacity = useTransform(scrollYProgress, [STATEMENT_IN_START, STATEMENT_IN_END], [0, 1]);
  const statementY = useTransform(scrollYProgress, [STATEMENT_IN_START, STATEMENT_IN_END], [28, 0]);

  // Map scroll to target video time; after SCRUB_END it stays at the end (hold).
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const t = clamp((p - SCRUB_START) / (SCRUB_END - SCRUB_START), 0, 1);
    targetTime.current = t * (duration.current || 0);
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => (duration.current = video.duration || 0);
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    // Prime the first frame so it is decoded and painted before the section
    // fades the video in, otherwise it flashes/blinks on the first scroll.
    // Safari/iOS will NOT paint frames of a <video> that has never played when
    // it is scrubbed via currentTime (it stays black), so play it muted for a
    // beat and immediately pause - this unlocks frame painting on seek.
    const primeFirstFrame = () => {
      video.muted = true; // set the property (React's attribute alone is unreliable in Safari)
      try {
        video.currentTime = 0.0001;
      } catch {
        /* seeking can throw before data is ready; ignore */
      }
      // Safari/iOS only paints frames of a PLAYING <video>. Keep it playing but
      // frozen at playbackRate 0 so it never advances on its own, while our
      // currentTime scrubbing repaints each frame.
      const p = video.play();
      if (p && typeof p.then === "function") p.then(() => { video.playbackRate = 0; }).catch(() => {});
      else video.playbackRate = 0;
    };
    if (video.readyState >= 2) primeFirstFrame();
    else video.addEventListener("loadeddata", primeFirstFrame, { once: true });

    let seeking = false;
    const onSeeking = () => (seeking = true);
    const onSeeked = () => (seeking = false);
    video.addEventListener("seeking", onSeeking);
    video.addEventListener("seeked", onSeeked);

    const SMOOTH = 9;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const v = videoRef.current;
      if (v && duration.current && !seeking) {
        const cur = v.currentTime;
        const diff = targetTime.current - cur;
        if (Math.abs(diff) > 0.0008) {
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

    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("loadeddata", primeFirstFrame);
      video.removeEventListener("seeking", onSeeking);
      video.removeEventListener("seeked", onSeeked);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black" style={{ height: "440vh" }} aria-label="Trusted across India">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Handshake film, scrubbed by scroll with a slow push-in */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: videoOpacity, scale: pushIn, willChange: "transform, opacity" }}
          aria-hidden="true"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-contain"
            src="/assets/video/clients-handshake-8.mp4"
            muted
            playsInline
            preload="auto"
            tabIndex={-1}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(125% 115% at 50% 46%, transparent 52%, rgba(0,0,0,0.55) 82%, rgba(0,0,0,0.95) 100%)" }}
          />
          {/* Feather every edge into pure black (matching the footage) so the
              left and right sides melt into the background with no seam. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #000 0%, transparent 22%, transparent 78%, #000 100%), linear-gradient(to bottom, #000 0%, transparent 12%, transparent 88%, #000 100%)",
            }}
          />
        </motion.div>

        {/* Roster, reads first over black and clears before the handshake shows */}
        <motion.div
          style={{ opacity: contentOpacity, willChange: "opacity" }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center"
        >
          <div className="shell-wide text-center">
            <span className="font-mono text-2xs uppercase tracking-[0.5em] text-ink-muted">Our clients</span>
            <h2 className="mt-6 font-display text-[clamp(2rem,5.2vw,3.6rem)] font-light leading-[1.02] tracking-tight text-ink">
              Trusted across India.
            </h2>
          </div>
          <div className="mt-14 flex w-full flex-col gap-10 md:mt-20 md:gap-14">
            <LogoRow items={ROW_TOP} duration="40s" />
            <LogoRow items={ROW_BOTTOM} duration="46s" reverse />
          </div>
        </motion.div>

        {/* Statement above the hands, CTA below - composed into the clasp's empty spaces */}
        <motion.div
          style={{ opacity: statementOpacity, willChange: "opacity" }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-between px-6 py-[clamp(2.25rem,8vh,6rem)] text-center"
        >
          {/* Upper vacant space, above the clasped hands */}
          <motion.div style={{ y: statementY }} className="mx-auto max-w-3xl">
            <h2
              className="mt-5 font-display text-[clamp(1.4rem,3.4vw,2.7rem)] font-light leading-[1.14] tracking-tight text-ink"
              style={{ textShadow: "0 2px 30px rgba(0,0,0,0.85)" }}
            >
              We craft spaces and the life within them, we strive to resolve every detail and deliver the extraordinary.
            </h2>
          </motion.div>

          {/* Bottom vacant space, below the clasped hands */}
          <motion.div style={{ y: statementY }}>
            <Link
              href="/process"
              className="group inline-flex items-center gap-4 font-sans text-xs uppercase tracking-[0.2em] text-ink opacity-90 transition-opacity duration-300 hover:opacity-100"
            >
              Our process
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* Reduced motion, a calm clients strip, no pin, no film. */
function StaticClients() {
  return (
    <section className="relative z-10 overflow-hidden rounded-[clamp(1.75rem,5vw,3.25rem)] bg-paper shadow-[0_-30px_70px_-30px_rgba(0,0,0,0.6)]">
      <div className="py-section">
        <div className="shell-wide flex flex-col items-center text-center">
          <span className="font-mono text-2xs uppercase tracking-[0.5em] text-ink-muted">Our clients</span>
          <h2 className="mt-6 font-display text-[clamp(2rem,5.2vw,3.6rem)] font-light leading-[1.02] tracking-tight">Trusted across India.</h2>
        </div>
        <div className="mt-14 flex flex-col gap-10 md:mt-20 md:gap-14">
          <LogoRow items={ROW_TOP} duration="40s" />
          <LogoRow items={ROW_BOTTOM} duration="46s" reverse />
        </div>
      </div>
    </section>
  );
}

function LogoRow({ items, duration, reverse }: { items: string[]; duration: string; reverse?: boolean }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <div
        className="marquee-track flex w-max items-center gap-[clamp(3rem,7vw,7rem)]"
        style={{ animationDuration: duration, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {items.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={src} alt="" aria-hidden="true" className="h-7 w-auto shrink-0 object-contain opacity-70 md:h-9" />
        ))}
      </div>
    </div>
  );
}
