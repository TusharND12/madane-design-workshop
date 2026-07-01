import Link from "next/link";
import { site } from "@/content/site";

/**
 * Closing CTA, a floating dark card on the light footer region (reference
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
  const enquireHref = projectTag ? `/lets-talk?project=${encodeURIComponent(projectTag)}` : "/lets-talk";

  return (
    <section className="relative z-10 bg-paper pb-[clamp(3rem,7vw,6rem)] pt-section">
      <div className="shell-wide">
        <div className="relative rounded-[clamp(1.5rem,3vw,2.5rem)] border border-white/10 p-8 md:p-14">
          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <h2 className="max-w-[15ch] font-display text-[clamp(1.75rem,3.6vw,2.9rem)] font-light leading-[1.06] tracking-tight text-ink">
              {headline}
            </h2>

            <div className="md:pl-8">
              <p className="max-w-sm text-sm leading-relaxed text-ink/55">
                Architecture, interiors and turnkey delivery, tell us about the space and we&rsquo;ll shape it with you.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link
                  href={enquireHref}
                  className="group inline-flex items-center gap-2.5 font-sans text-xs uppercase tracking-[0.14em] text-ink transition-opacity duration-300 hover:opacity-70"
                >
                  Let&apos;s build
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
