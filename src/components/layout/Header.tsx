"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    let ticking = false;
    const compute = () => {
      ticking = false;
      setSolid(window.scrollY > 20);
      const zones = document.querySelectorAll<HTMLElement>("[data-invert-zone]");
      let over = false;
      zones.forEach((z) => {
        const r = z.getBoundingClientRect();
        if (r.top <= HEADER_LINE && r.bottom > HEADER_LINE) over = true;
      });
      setInvert(over);

      // On the landing page, keep the header hidden while the Hero (the first
      // invert zone) still fills the top of the viewport; reveal it once the
      // visitor scrolls past the landing section.
      if (isHome) {
        const landing = document.querySelector<HTMLElement>("[data-invert-zone]");
        const bottom = landing?.getBoundingClientRect().bottom ?? 0;
        setHidden(bottom > 120);
      } else {
        // On pages with a sticky filter bar (the projects archive), hide the
        // main header once that bar scrolls up and sticks to the top, so the
        // two bars never stack.
        const filter = document.querySelector<HTMLElement>("[data-filter-bar]");
        if (filter) {
          setHidden(filter.getBoundingClientRect().top <= 120);
        } else {
          setHidden(false);
        }
      }
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
            "flex h-14 w-full max-w-4xl items-center justify-between gap-6 rounded-full pl-6 pr-3 transition-[background-color,border-color,box-shadow] duration-300 ease-editorial",
            solid
              ? "border border-white/10 bg-paper/20 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              : "border border-white/5 bg-paper/5 backdrop-blur-xl"
          )}
        >
          <Logo subdued={!light} />

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {site.nav.slice(0, 4).map((item) => {
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
