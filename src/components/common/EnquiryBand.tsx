import Image from "next/image";
import { site } from "@/content/site";
import { Bracket } from "@/components/primitives/Bracket";
import { Button } from "@/components/primitives/Button";
import { Reveal } from "@/components/primitives/Reveal";

/**
 * Full-width Ink enquiry band — the page's full stop (PRD H7). Reused as the
 * closing CTA across pages, optionally pre-tagged with a project.
 */
export function EnquiryBand({
  headline = "Let's design something that feels inevitable.",
  projectTag,
  image = "/assets/hero/p-77.jpg",
}: {
  headline?: string;
  projectTag?: string;
  image?: string;
}) {
  const enquireHref = projectTag ? `/contact?project=${encodeURIComponent(projectTag)}` : "/contact";

  return (
    <section className="on-ink relative isolate overflow-hidden bg-paper text-ink">
      <div className="absolute inset-0 opacity-25" aria-hidden="true">
        <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-paper/55" />
      </div>

      <div className="shell-wide relative py-section">
        <Reveal>
          <Bracket className="text-ink/55">Enquire</Bracket>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-8 max-w-[18ch] font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.0] tracking-tighter">
            {headline}
          </h2>
        </Reveal>

        <Reveal delay={0.12} className="mt-12 flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-5">
            <Button
              href={enquireHref}
              variant="secondary"
              arrow
              className="border-ink/40 text-ink hover:border-ink hover:bg-ink hover:text-paper"
            >
              Start an enquiry
            </Button>
            <Button
              href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(site.contact.whatsappMessage)}`}
              variant="tertiary"
              className="text-ink/80"
            >
              WhatsApp
            </Button>
            <Button href={site.contact.phoneHref} variant="tertiary" className="text-ink/80">
              {site.contact.phoneDisplay}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
