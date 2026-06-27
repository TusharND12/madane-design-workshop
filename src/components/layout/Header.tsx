"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

const HEADER_LINE = 38; // px from top used to test the invert zone

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [solid, setSolid] = useState(false);
  const [invert, setInvert] = useState(true);
  const [hidden, setHidden] = useState(isHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastYRef = useRef(0);
  const hiddenRef = useRef(isHome);

  useEffect(() => {
    let ticking = false;
    const compute = () => {
      ticking = false;
      const y = window.scrollY;
      setSolid(y > 20);
      const zones = document.querySelectorAll<HTMLElement>("[data-invert-zone]");
      let over = false;
      zones.forEach((z) => {
        const r = z.getBoundingClientRect();
        if (r.top <= HEADER_LINE && r.bottom > HEADER_LINE) over = true;
      });
      setInvert(over);

      // Hide on scroll down, reveal on scroll up — on every page. Always shown
      // near the very top; small deadzone so tiny jitters don't toggle it.
      const last = lastYRef.current;
      let hide: boolean;
      if (y <= 80) hide = false;
      else if (y > last + 4) hide = true;
      else if (y < last - 4) hide = false;
      else hide = hiddenRef.current;
      lastYRef.current = y;

      // Page-specific overrides that force the header hidden regardless of
      // scroll direction:
      if (isHome) {
        // Keep it hidden while the Hero still fills the top of the viewport.
        const landing = document.querySelector<HTMLElement>("[data-invert-zone]");
        const bottom = landing?.getBoundingClientRect().bottom ?? 0;
        if (bottom > 120) hide = true;
      } else {
        // On the projects archive, stay hidden once the sticky filter bar
        // reaches the top, so the two bars never stack.
        const filter = document.querySelector<HTMLElement>("[data-filter-bar]");
        if (filter && filter.getBoundingClientRect().top <= 120) hide = true;
      }

      hiddenRef.current = hide;
      setHidden(hide);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname, isHome]);

  // Light text only when over a dark zone AND not yet solid.
  const light = invert && !solid;

  return (
    <>
      {/* Top fade, content dissolves as it scrolls up into the header band and
          returns to full opacity once it passes below. Hidden with the header. */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[6.75rem]"
        style={{ background: "linear-gradient(to bottom, var(--paper) 0%, var(--paper) 34%, transparent 100%)" }}
      />

      <motion.header
        initial={false}
        animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-[clamp(0.75rem,1.6vw,1.25rem)] z-50 flex justify-center px-4 transition-colors duration-300 ease-editorial",
          hidden && "pointer-events-none",
          light ? "text-ink on-ink" : "text-ink"
        )}
      >
        <div
          className={cn(
            "flex h-14 w-full max-w-5xl items-center justify-between gap-6 rounded-full pl-6 pr-3 transition-[background-color,border-color,box-shadow] duration-300 ease-editorial",
            solid
              ? "border border-white/10 bg-paper/20 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              : "border border-white/5 bg-paper/5 backdrop-blur-xl"
          )}
        >
          <Logo subdued={!light} />

          <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-7">
            {site.nav.filter((item) => item.href !== "/contact").map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn("link-underline font-sans text-xs uppercase tracking-[0.14em] transition-opacity duration-300", active ? "opacity-100" : "opacity-70 hover:opacity-100")}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className={cn(
                "inline-flex h-9 items-center rounded-full px-5 font-sans text-xs uppercase tracking-[0.14em] transition-colors duration-300",
                light ? "border border-ink/40 text-ink hover:bg-ink hover:text-paper" : "bg-ink text-paper hover:bg-ink/90"
              )}
            >
              Enquire
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="link-underline font-mono text-2xs uppercase tracking-label lg:hidden"
          >
            [ menu ]
          </button>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
