"use client";

import { useEffect, useRef, useState } from "react";
import {
  cubicBezier,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const TAIL = 0.05;

const FRONT_SRC = "/assets/video/architecture-gesture.mp4";
const BACK_SRC = "/assets/video/living-daylight.mp4";

// Three taglines that cross-fade over the fullscreen film as you keep scrolling.
const TAGLINES = [
  "We design & build bharat & beyond.",
  "Architecture, interiors & turnkey, end to end.",
  "From first sketch to final key.",
];

/**
 * The studio statement (yodezeen style), one continuous scroll-driven move:
 *   1. a sharp-edged rectangle window grows over the centred heading,
 *   2. the video inside flips in 3D to a second clip,
 *   3. the window opens out to a full-screen rectangle (a clip-path reveal - the
 *      video keeps its scale, it is not zoomed),
 *   4. a closing line fades in over it.
 * Pinned, geometric progress (survives the route's `zoom`), spring-smoothed.
 */
export function StatementReveal() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const raw = useMotionValue(0);
  // Smooth the scroll progress so every phase glides.
  const p = useSpring(raw, { stiffness: 200, damping: 40, mass: 0.4 });

  // Track the viewport so the window can hold a true 9:16 ratio (clip-path
  // insets are computed in px from these dimensions).
  const [vp, setVp] = useState({ w: 1920, h: 1080 });

  const update = () => {
    const el = ref.current;
    if (!el) return;
    const range = el.offsetHeight - window.innerHeight;
    if (range <= 0) return;
    const top = el.getBoundingClientRect().top; // 0 at pin-start → -range at pin-end
    raw.set(clamp(-top / range / (1 - TAIL), 0, 1));
  };

  useMotionValueEvent(scrollY, "change", update);
  useEffect(() => {
    const onResize = () => {
      setVp({ w: window.innerWidth, h: window.innerHeight });
      update();
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A small 9:16 portrait window during the grow/flip phases, opening to the
  // full screen at the end. Insets in px keep the ratio exact on any viewport.
  const RATIO = 9 / 16;
  const H_SMALL = 0.16; // tiny entrance, as a fraction of viewport height
  const H_PORTRAIT = 0.55; // the small 9:16 window it settles to
  const sideFor = (hFrac: number) => Math.max(0, (vp.w - hFrac * vp.h * RATIO) / 2);
  const topFor = (hFrac: number) => (vp.h * (1 - hFrac)) / 2;

  const cardOpacity = useTransform(p, [0.03, 0.1], [0, 1]);
  // Grow → hold → slow flip → open to full, then hold fullscreen for the taglines.
  const topInset = useTransform(
    p,
    [0.04, 0.18, 0.42, 0.5],
    [topFor(H_SMALL), topFor(H_PORTRAIT), topFor(H_PORTRAIT), 0],
  );
  const sideInset = useTransform(
    p,
    [0.04, 0.18, 0.42, 0.5],
    [sideFor(H_SMALL), sideFor(H_PORTRAIT), sideFor(H_PORTRAIT), 0],
  );
  const clip = useMotionTemplate`inset(${topInset}px ${sideInset}px)`;
  // A long, eased flip so it turns slowly and smoothly.
  const rotateY = useTransform(p, [0.22, 0.4], [0, 180], { ease: cubicBezier(0.45, 0, 0.55, 1) });
  const headOpacity = useTransform(p, [0.2, 0.36], [1, 0]);
  const headSpread = useTransform(p, [0.08, 0.34], ["0em", "0.05em"]);

  // Fullscreen overlay: a scrim + kicker, then three taglines that cross-fade as
  // you keep scrolling, before the section releases to the next.
  const scrimOpacity = useTransform(p, [0.44, 0.52], [0, 1]);
  const kickerOpacity = useTransform(p, [0.48, 0.56], [0, 1]);
  const tag1Opacity = useTransform(p, [0.5, 0.56, 0.66, 0.7], [0, 1, 1, 0]);
  const tag2Opacity = useTransform(p, [0.7, 0.75, 0.83, 0.87], [0, 1, 1, 0]);
  const tag3Opacity = useTransform(p, [0.87, 0.92, 1, 1], [0, 1, 1, 1]);
  const tagOpacities = [tag1Opacity, tag2Opacity, tag3Opacity];
  // Fade the bright film to black at the very end so it joins the dark section
  // below with no seam.
  const endFade = useTransform(p, [0.93, 1], [0, 1]);

  if (reduced) {
    return (
      <section className="bg-black">
        <div className="shell-wide flex flex-col items-center gap-12 py-[clamp(5rem,16vh,10rem)] text-center">
          <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">Mumbai · since 2008</span>
          <h2 className="max-w-[16ch] font-display text-[clamp(2.2rem,6vw,5rem)] font-light leading-[1.02] tracking-tight">
            Giving the world things they haven&rsquo;t imagined before.
          </h2>
          <div className="relative aspect-[3/4] w-[62vw] max-w-[420px] overflow-hidden">
            <video className="absolute inset-0 h-full w-full object-cover" src={BACK_SRC} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative bg-black" style={{ height: "360vh" }} aria-label="Studio statement">
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden [perspective:1600px]">
        {/* Heading behind the film */}
        <motion.h2
          style={{ opacity: headOpacity, letterSpacing: headSpread }}
          className="pointer-events-none relative z-0 max-w-[18ch] px-6 text-center font-display text-[clamp(2.2rem,7vw,6rem)] font-light leading-[1.0] tracking-tight text-ink"
        >
          Giving the world things they haven&rsquo;t imagined before.
        </motion.h2>

        {/* Full-screen film, revealed through an expanding rectangle window. The
            video keeps its scale (clip-path reveal) so it never looks zoomed. */}
        <motion.div
          style={{ clipPath: clip, opacity: cardOpacity }}
          className="absolute inset-0 z-10 will-change-[clip-path]"
        >
          <motion.div style={{ rotateY, transformStyle: "preserve-3d" }} className="relative h-full w-full">
            {/* Front face (slight overscan so it always bleeds past the edges) */}
            <div className="absolute inset-0 [backface-visibility:hidden]">
              <video className="absolute left-[-1%] top-[-1%] h-[102%] w-[102%] object-cover" style={{ objectPosition: "50% 82%" }} src={FRONT_SRC} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
            </div>
            {/* Back face */}
            <motion.div style={{ rotateY: 180 }} className="absolute inset-0 [backface-visibility:hidden]">
              <video className="absolute left-[-1%] top-[-1%] h-[102%] w-[102%] object-cover" style={{ objectPosition: "50% 82%" }} src={BACK_SRC} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Taglines over the fullscreen film - cross-fade one to the next */}
        <div className="pointer-events-none absolute inset-0 z-20">
          <motion.div style={{ opacity: scrimOpacity }} className="absolute inset-0 bg-black/55" aria-hidden="true" />
          <motion.div style={{ opacity: endFade }} className="absolute inset-0 bg-black" aria-hidden="true" />
          <motion.span
            style={{ opacity: kickerOpacity }}
            className="absolute inset-x-0 top-[16%] text-center font-mono text-2xs uppercase tracking-label text-ink/75"
          >
            Madane Design Workshop
          </motion.span>
          {TAGLINES.map((line, i) => (
            <motion.h3
              key={i}
              style={{ opacity: tagOpacities[i] }}
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 text-center font-display text-[clamp(2rem,6vw,5rem)] font-light leading-[1.04] tracking-tight text-ink"
            >
              {line}
            </motion.h3>
          ))}
        </div>
      </div>
    </section>
  );
}
