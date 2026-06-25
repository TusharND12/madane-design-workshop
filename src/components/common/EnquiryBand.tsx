import Link from "next/link";
import { site } from "@/content/site";

/**
 * Closing CTA — a floating dark card on the light footer region (reference
 * layout). Heading on the left, supporting line + actions on the right.
 */
export function EnquiryBand({
  headline = "Let's design something that feels inevitable.",
  projectTag,
}: {
  headline?: string;
  projectTag?: string;
  image?: string;
}) {
  const enquireHref = projectTag ? `/contact?project=${encodeURIComponent(projectTag)}` : "/contact";

  return (
    <section className="relative z-10 bg-paper pt-section">
      <div className="shell-wide">
        <div className="relative overflow-hidden rounded-[clamp(1.5rem,3vw,2.5rem)] border border-white/5 bg-gradient-to-br from-stone to-mount p-8 shadow-[0_44px_100px_-46px_rgba(0,0,0,0.7)] md:p-14">
          {/* sheen + dotted accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(130% 150% at 88% 130%, rgba(96,116,176,0.20), transparent 55%)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-8 top-8 h-24 w-40 opacity-40"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
              backgroundSize: "12px 12px",
              maskImage: "linear-gradient(120deg, #000, transparent)",
              WebkitMaskImage: "linear-gradient(120deg, #000, transparent)",
            }}
          />

          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <h2 className="max-w-[15ch] font-display text-[clamp(1.75rem,3.6vw,2.9rem)] font-light leading-[1.06] tracking-tight text-ink">
              {headline}
            </h2>

            <div className="md:pl-8">
              <p className="max-w-sm text-sm leading-relaxed text-ink/55">
                Architecture, interiors and turnkey delivery — tell us about the space and we&rsquo;ll shape it with you.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link
                  href={enquireHref}
                  className="inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 font-sans text-xs uppercase tracking-[0.14em] text-paper transition-colors duration-300 hover:bg-ink/85"
                >
                  Get started
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
                <a
                  href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(site.contact.whatsappMessage)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 font-sans text-xs uppercase tracking-[0.14em] text-ink/75 transition-colors duration-300 hover:text-ink"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-ink/30">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  WhatsApp the studio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
