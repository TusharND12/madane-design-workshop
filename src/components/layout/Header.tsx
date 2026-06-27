"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

const HEADER_LINE = 38; // px from top used to test the invert zone

// Nav items with a full-page hover panel of sub-links (yodezeen style).
type SubItem = { label: string; href: string; img: string };
const SUBMENUS: Record<string, SubItem[]> = {
  "/services": [
    { label: "Architecture", href: "/services#architecture", img: "/assets/services/architecture.jpg" },
    { label: "Interior", href: "/services#interior", img: "/assets/services/interior.jpg" },
    { label: "Exterior", href: "/services#exterior", img: "/assets/services/exterior.jpg" },
    { label: "Turnkey", href: "/services#turnkey", img: "/assets/services/turnkey.jpg" },
  ],
  "/projects": [
    { label: "Architecture", href: "/projects?type=Architecture", img: "/assets/services/architecture.jpg" },
    { label: "Interior", href: "/projects?type=Interior", img: "/assets/services/interior.jpg" },
    { label: "Exterior", href: "/projects?type=Exterior", img: "/assets/services/exterior.jpg" },
    { label: "Turnkey", href: "/projects?type=Turnkey", img: "/assets/services/turnkey.jpg" },
  ],
};

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [solid, setSolid] = useState(false);
  const [invert, setInvert] = useState(true);
  const [hidden, setHidden] = useState(isHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaMenu, setMegaMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastYRef = useRef(0);
  const hiddenRef = useRef(isHome);
  const wasOverHeroRef = useRef(isHome);

  const openMega = (href: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaMenu(href);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaMenu(null), 180);
  };

  // Close the mega menu whenever the route changes.
  useEffect(() => setMegaMenu(null), [pathname]);

  const activeSub = megaMenu ? SUBMENUS[megaMenu] : undefined;

  // The image shown behind the mega menu — none by default, then follows
  // whichever sub-link is hovered. Reset whenever the menu opens/closes.
  const [hoverImg, setHoverImg] = useState<string | null>(null);
  useEffect(() => {
    setHoverImg(null);
  }, [megaMenu]);

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
        // Keep the header hidden while the Hero fills the viewport so it opens
        // clean. The moment the Hero scrolls away (reaching the next section),
        // reveal the header for the first time; from there the direction logic
        // governs — it tucks away on scroll down and returns on scroll up.
        const landing = document.querySelector<HTMLElement>("[data-invert-zone]");
        const bottom = landing?.getBoundingClientRect().bottom ?? 0;
        const overHero = bottom > 120;
        if (overHero) hide = true;
        else if (wasOverHeroRef.current) hide = false;
        wasOverHeroRef.current = overHero;
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

  // Split the nav evenly to sit on either side of the centred logo.
  const navItems = site.nav.filter((item) => item.href !== "/contact");
  const mid = Math.ceil(navItems.length / 2);
  const leftItems = navItems.slice(0, mid);
  const rightItems = navItems.slice(mid);

  const renderItem = (item: (typeof navItems)[number]) => {
    const active = pathname === item.href || pathname.startsWith(item.href + "/");
    return (
      <Link
        key={item.href}
        href={item.href}
        onMouseEnter={() => openMega(item.href)}
        className={cn(
          "inline-flex items-center justify-center px-2 py-1 font-sans text-xs uppercase tracking-[0.14em] transition-opacity duration-300",
          active ? "opacity-100" : "opacity-70 hover:opacity-100",
        )}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <>
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
            "relative flex h-14 w-full max-w-6xl items-center justify-between gap-4 rounded-full px-6 transition-[background-color,border-color,box-shadow] duration-300 ease-editorial",
            solid
              ? "border border-white/10 bg-paper/20 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              : "border border-white/5 bg-paper/5 backdrop-blur-xl"
          )}
        >
          {/* Left nav (desktop) */}
          <nav aria-label="Primary" className="hidden items-center justify-start gap-6 lg:flex xl:gap-7" onMouseLeave={scheduleCloseMega}>
            {leftItems.map(renderItem)}
          </nav>
          {/* Mobile spacer to balance the menu button so the logo stays centred */}
          <div className="w-8 lg:hidden" aria-hidden="true" />

          {/* Centre logo — absolutely centred so side widths never shift it */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Logo subdued={!light} />
          </div>

          {/* Right nav + enquire / mobile menu */}
          <div className="flex items-center justify-end gap-6">
            <nav aria-label="More" className="hidden items-center gap-6 lg:flex xl:gap-7" onMouseLeave={scheduleCloseMega}>
              {rightItems.map(renderItem)}
            </nav>
            <Link
              href="/contact"
              className={cn(
                "hidden h-9 items-center rounded-full px-5 font-sans text-xs uppercase tracking-[0.14em] transition-colors duration-300 lg:inline-flex",
                light ? "border border-ink/40 text-ink hover:bg-ink hover:text-paper" : "bg-ink text-paper hover:bg-ink/90"
              )}
            >
              Enquire
            </Link>
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
        </div>
      </motion.header>

      {/* Full-page hover mega menu (yodezeen style) */}
      <AnimatePresence>
        {activeSub && (
          <motion.div
            key={megaMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => megaMenu && openMega(megaMenu)}
            onMouseLeave={scheduleCloseMega}
            className="fixed inset-0 z-40 hidden overflow-hidden bg-black lg:block"
          >
            {/* Full-bleed image of the hovered discipline, crossfading */}
            <AnimatePresence>
              {hoverImg && (
                <motion.div
                  key={hoverImg}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={hoverImg} alt="" fill sizes="100vw" className="object-cover" priority />
                </motion.div>
              )}
            </AnimatePresence>
            {/* Scrim for legibility, darker on the left where the words sit */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/15" aria-hidden="true" />

            <div className="relative shell-wide flex h-full items-center pt-[var(--header-h)]">
              <ul className="space-y-1">
                {activeSub.map((s, i) => (
                  <motion.li
                    key={s.href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setHoverImg(s.img)}
                  >
                    <Link
                      href={s.href}
                      onClick={() => setMegaMenu(null)}
                      className="block font-display text-[clamp(2.5rem,7vw,6rem)] font-bold uppercase leading-[1.05] tracking-tight text-ink/70 drop-shadow-[0_2px_24px_rgba(0,0,0,0.65)] transition-colors duration-300 hover:text-ink"
                    >
                      {s.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
