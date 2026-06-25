import { site } from "@/content/site";
import { Bracket } from "@/components/primitives/Bracket";

/** Direct channels beside the form — WhatsApp-first for Indian enquiries (PRD §8.7). */
export function ContactRail() {
  const channels = [
    { label: "WhatsApp", value: "Message the studio", href: `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(site.contact.whatsappMessage)}` },
    { label: "Call", value: site.contact.phoneDisplay, href: site.contact.phoneHref },
    { label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
  ];
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Bracket>Direct</Bracket>
        <ul className="mt-6 flex flex-col">
          {channels.map((c) => (
            <li key={c.label}>
              <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-baseline justify-between gap-4 border-t border-hairline py-4">
                <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">{c.label}</span>
                <span className="link-underline text-base text-ink">{c.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Bracket>Studio</Bracket>
        <div className="mt-6 flex flex-col gap-2 border-t border-hairline pt-4 text-base text-ink-muted">
          <p className="text-ink">{site.contact.addressLine}</p>
          <p>{site.contact.city}, {site.contact.region}</p>
          <p>{site.contact.hours}</p>
        </div>
      </div>

      <div>
        <Bracket>Elsewhere</Bracket>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-hairline pt-4">
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-underline font-mono text-2xs uppercase tracking-label text-ink-muted">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
