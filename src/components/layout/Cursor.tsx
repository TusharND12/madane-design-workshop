"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Custom cursor, a hairline ink ring that trails the pointer and grows over
 * interactive / media elements. Desktop + fine-pointer only; off for reduced
 * motion and touch (native cursor restored).
 */
export function Cursor() {
  const reduced = usePrefersReducedMotion();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.dataset.cursor = "on";

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;

      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [data-cursor-grow], input, textarea, label");
      const media = t.closest("[data-cursor-view]");
      if (media) {
        setLabel("View");
        ring.current?.classList.add("is-view");
        ring.current?.classList.remove("is-grow");
      } else if (interactive) {
        setLabel("");
        ring.current?.classList.add("is-grow");
        ring.current?.classList.remove("is-view");
      } else {
        setLabel("");
        ring.current?.classList.remove("is-grow", "is-view");
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      delete document.body.dataset.cursor;
    };
  }, [reduced]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[80] -ml-[2px] -mt-[2px] h-1 w-1 rounded-full bg-ink mix-blend-difference" />
      <div
        ref={ring}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[80] -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-ink mix-blend-difference transition-[width,height,margin] duration-300 ease-editorial"
      >
        <span className="font-mono text-[0.5rem] uppercase tracking-label text-ink opacity-0">{label}</span>
      </div>
    </>
  );
}
