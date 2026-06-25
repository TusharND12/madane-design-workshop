import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { Bracket } from "@/components/primitives/Bracket";
import { Reveal } from "@/components/primitives/Reveal";

/** The calm full stop (PRD §6.4 Footer) — ink, large studio name, full nav. */
export function Footer() {
  const year = 2026;
  return (
    <footer className="on-ink relative overflow-hidden bg-paper text-ink">
      {/* Oversized wordmark band */}
      <div className="shell-wide pb-12 pt-section">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Bracket className="text-ink/50">Madane Design Workshop</Bracket>
            <Reveal>
              <p className="mt-8 max-w-prose font-display text-3xl leading-[1.08] tracking-tight text-ink md:text-4xl">
                Let&rsquo;s design something quiet, precise, and built to last.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <Link
                href="/contact"
                className="mt-10 inline-flex h-12 items-center rounded-none border border-ink/30 px-7 font-sans text-xs uppercase tracking-[0.16em] transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                Start an enquiry
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-5">
            <nav aria-label="Footer" className="flex flex-col gap-3">
              <Bracket className="mb-2 text-ink/40">Index</Bracket>
              <Link href="/" className="link-underline text-sm text-ink/75">Home</Link>
              {site.nav.map((n) => (
                <Link key={n.href} href={n.href} className="link-underline text-sm text-ink/75">{n.label}</Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <Bracket className="mb-2 text-ink/40">Contact</Bracket>
              <a href={site.contact.phoneHref} className="link-underline text-sm text-ink/75">{site.contact.phoneDisplay}</a>
              <a href={`mailto:${site.contact.email}`} className="link-underline text-sm text-ink/75">{site.contact.email}</a>
              <a href={`https://wa.me/${site.contact.whatsapp}`} className="link-underline text-sm text-ink/75">WhatsApp</a>
              <p className="mt-2 text-sm text-ink/45">{site.contact.addressLine}</p>
              <p className="text-sm text-ink/45">{site.contact.hours}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                {site.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-underline font-mono text-2xs uppercase tracking-label text-ink/55">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Giant lockup */}
      <div className="shell-wide border-t border-ink/12 py-12">
        <div className="flex items-center justify-center opacity-90">
          <Image src="/assets/logo-white.png" alt="Madane Design Workshop" width={307} height={409} className="h-28 w-auto md:h-36" />
        </div>
      </div>

      <div className="shell-wide flex flex-col gap-3 border-t border-ink/12 py-7 font-mono text-2xs uppercase tracking-[0.12em] text-ink/45 sm:flex-row sm:items-center sm:justify-between">
        <span>© {year} {site.legalName}</span>
        <div className="flex gap-6">
          <Link href="/privacy" className="link-underline">Privacy</Link>
          <Link href="/terms" className="link-underline">Terms</Link>
        </div>
        <span>
          Crafted by{" "}
          <a href={site.credit.href} target="_blank" rel="noreferrer" className="link-underline">{site.credit.by}</a>
        </span>
      </div>
    </footer>
  );
}
