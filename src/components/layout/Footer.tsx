import Link from "next/link";
import { site } from "@/content/site";

/** The calm full stop — light footer: giant wordmark, link columns, status bar. */
const NAV = [
  { label: "Studio", href: "/studio" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = 2026;

  return (
    <footer className="relative z-0 -mt-[clamp(2rem,6vw,5rem)] overflow-hidden bg-[#ECEEF4] text-[#23262F]">
      {/* Giant wordmark watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[18%] select-none text-center font-display lowercase leading-[0.75] tracking-tighter text-[#23262F]/[0.06] text-[clamp(7rem,32vw,26rem)]"
      >
        madane
      </span>

      <div className="relative shell-wide pb-10 pt-[clamp(7rem,18vw,13rem)]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Logo + tagline */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex flex-col" aria-label="Madane Design Workshop — home">
              <span className="font-display text-2xl lowercase leading-none tracking-tight text-[#15171C]">madane</span>
              <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.34em] text-[#23262F]/45">Design Workshop</span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-[#23262F]/55">
              We design &amp; build — architecture, interiors and turnkey, since 2008.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-3 gap-6 sm:gap-8 lg:col-span-7">
            <nav aria-label="Navigate" className="flex flex-col gap-3.5">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="link-underline text-sm text-[#23262F]/70 hover:text-[#15171C]">
                  {n.label}
                </Link>
              ))}
            </nav>

            <nav aria-label="Contact" className="flex flex-col gap-3.5">
              <a href={`mailto:${site.contact.email}`} className="link-underline text-sm text-[#23262F]/70 hover:text-[#15171C]">Email</a>
              <a href={site.contact.phoneHref} className="link-underline text-sm text-[#23262F]/70 hover:text-[#15171C]">Phone</a>
              <a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noreferrer" className="link-underline text-sm text-[#23262F]/70 hover:text-[#15171C]">WhatsApp</a>
              <span className="mt-1 text-sm text-[#23262F]/40">{site.contact.addressLine}</span>
            </nav>

            <nav aria-label="Social" className="flex flex-col gap-3.5">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-underline text-sm text-[#23262F]/70 hover:text-[#15171C]">
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative shell-wide flex flex-col gap-5 border-t border-[#23262F]/12 py-7 sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#23262F]/12 bg-white px-4 py-2 font-mono text-2xs uppercase tracking-label text-[#23262F]/75 shadow-sm">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Available for new projects
        </span>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-2xs uppercase tracking-[0.12em] text-[#23262F]/45">
          <span>© {year} {site.legalName}. All rights reserved</span>
          <Link href="/privacy" className="link-underline hover:text-[#15171C]">Privacy Policy</Link>
          <Link href="/terms" className="link-underline hover:text-[#15171C]">Terms of Use</Link>
          <a href={site.credit.href} target="_blank" rel="noreferrer" className="link-underline text-[#23262F]/35 hover:text-[#15171C]">
            By {site.credit.by}
          </a>
        </div>
      </div>
    </footer>
  );
}
