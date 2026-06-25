import Link from "next/link";
import { site } from "@/content/site";
import { FooterMark } from "@/components/layout/FooterMark";

/** The calm full stop — giant wordmark, link columns, status bar (dark theme). */
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
    <footer className="on-ink relative z-0 overflow-hidden bg-paper text-ink">
      {/* Giant wordmark — sits in the band between the CTA card and the columns */}
      <FooterMark />

      <div className="relative shell-wide pb-10 pt-[clamp(2.5rem,6vw,4.5rem)]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Logo + tagline */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex flex-col" aria-label="Madane Design Workshop — home">
              <span className="font-display text-2xl lowercase leading-none tracking-tight text-ink">madane</span>
              <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.34em] text-ink/45">Design Workshop</span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink/55">
              We design &amp; build — architecture, interiors and turnkey, since 2008.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-3 gap-6 sm:gap-8 lg:col-span-7">
            <nav aria-label="Navigate" className="flex flex-col gap-3.5">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="link-underline text-sm text-ink/70 hover:text-ink">
                  {n.label}
                </Link>
              ))}
            </nav>

            <nav aria-label="Contact" className="flex flex-col gap-3.5">
              <a href={`mailto:${site.contact.email}`} className="link-underline text-sm text-ink/70 hover:text-ink">Email</a>
              <a href={site.contact.phoneHref} className="link-underline text-sm text-ink/70 hover:text-ink">Phone</a>
              <a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noreferrer" className="link-underline text-sm text-ink/70 hover:text-ink">WhatsApp</a>
              <span className="mt-1 text-sm text-ink/40">{site.contact.addressLine}</span>
            </nav>

            <nav aria-label="Social" className="flex flex-col gap-3.5">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-underline text-sm text-ink/70 hover:text-ink">
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative shell-wide flex flex-col gap-5 border-t border-ink/12 py-7 sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex w-fit items-center gap-2.5 rounded-full border border-hairline bg-mount px-4 py-2 font-mono text-2xs uppercase tracking-label text-ink/75">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for new projects
        </span>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-2xs uppercase tracking-[0.12em] text-ink/45">
          <span>© {year} {site.legalName}. All rights reserved</span>
          <Link href="/privacy" className="link-underline hover:text-ink">Privacy Policy</Link>
          <Link href="/terms" className="link-underline hover:text-ink">Terms of Use</Link>
          <a href={site.credit.href} target="_blank" rel="noreferrer" className="link-underline text-ink/35 hover:text-ink">
            By {site.credit.by}
          </a>
        </div>
      </div>
    </footer>
  );
}
