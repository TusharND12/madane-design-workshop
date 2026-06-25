"use client";

import { useEffect } from "react";

/**
 * Scales a single route down (or up) like a browser zoom, restoring the previous
 * value on unmount. Applied to the document root so full-bleed section
 * backgrounds and the fixed header all scale uniformly.
 */
export function PageZoom({ value = 0.9 }: { value?: number }) {
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.zoom;
    el.style.zoom = String(value);
    return () => {
      el.style.zoom = prev;
    };
  }, [value]);

  return null;
}
