"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/schema";

// Smooth in-and-out easing (easeInOutQuart) for the image-expand transition.
const EXPAND = [0.76, 0, 0.24, 1] as const;
const DURATION = 0.85;

type ZoomArgs = { href: string; src: string; alt: string; rect: DOMRect };
type Zoom = ZoomArgs & { vw: number; vh: number };

const ZoomContext = createContext<{ open: (a: ZoomArgs) => void } | null>(null);

export function useProjectZoom() {
  return useContext(ZoomContext);
}

/**
 * Click helper: grows a project's cover from the given element's box to fullscreen
 * (yodezeen-style), then navigates. Modified clicks (new tab) fall through.
 */
export function zoomClick(
  e: React.MouseEvent,
  open: ((a: ZoomArgs) => void) | undefined,
  project: Pick<Project, "slug" | "cover" | "coverAlt">,
  el: HTMLElement | null
) {
  if (!open || !el) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  e.preventDefault();
  open({
    href: `/projects/${project.slug}`,
    src: project.cover,
    alt: project.coverAlt,
    rect: el.getBoundingClientRect(),
  });
}

/**
 * Mounted once in the site layout. Renders a single global expand overlay so any
 * project link across the site can trigger the same transition; the route curtain
 * (template.tsx) then reveals the detail page, and we clear once we've arrived.
 */
export function ProjectZoomProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [zoom, setZoom] = useState<Zoom | null>(null);

  const open = useCallback((a: ZoomArgs) => {
    setZoom({ ...a, vw: window.innerWidth, vh: window.innerHeight });
  }, []);

  // Clear after we've landed on the target route (curtain covers the swap).
  useEffect(() => {
    if (zoom && pathname === zoom.href) {
      const t = setTimeout(() => setZoom(null), 120);
      return () => clearTimeout(t);
    }
  }, [pathname, zoom]);

  return (
    <ZoomContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {zoom && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[60]"
            initial={{ backgroundColor: "rgba(15,15,15,0)" }}
            animate={{ backgroundColor: "rgba(15,15,15,0.65)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION, ease: EXPAND }}
          >
            <motion.div
              className="absolute left-0 top-0 overflow-hidden bg-mount [backface-visibility:hidden] will-change-transform"
              style={{ width: zoom.vw, height: zoom.vh, transformOrigin: "0 0" }}
              initial={{
                x: zoom.rect.left,
                y: zoom.rect.top,
                scaleX: zoom.rect.width / zoom.vw,
                scaleY: zoom.rect.height / zoom.vh,
              }}
              animate={{ x: 0, y: 0, scaleX: 1, scaleY: 1 }}
              transition={{ duration: DURATION, ease: EXPAND }}
              onAnimationComplete={() => router.push(zoom.href)}
            >
              <Image src={zoom.src} alt={zoom.alt} fill priority sizes="100vw" className="object-cover" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ZoomContext.Provider>
  );
}
