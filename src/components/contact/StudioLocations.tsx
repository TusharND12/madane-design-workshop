"use client";

import { useEffect, useState } from "react";
import { Bracket } from "@/components/primitives/Bracket";
import { site } from "@/content/site";

/**
 * Where we are - the studio's cities set in oversized type with a live local time
 * beside each, plus phone (P.), address (A.) and a maps link (yodezeen.com/contact
 * style). All three sit in IST; Mumbai is the studio, the others representatives.
 */
const CITIES = [
  {
    name: "Mumbai",
    role: "Studio",
    phone: site.contact.phoneDisplay,
    phoneHref: site.contact.phoneHref,
    address: site.contact.addressLine,
    map: `https://www.google.com/maps?q=${encodeURIComponent(site.contact.mapQuery)}`,
  },
  { name: "Pune", role: "Representative", map: "https://www.google.com/maps?q=Pune%2C%20India" },
  { name: "Hyderabad", role: "Representative", map: "https://www.google.com/maps?q=Hyderabad%2C%20India" },
];

const TZ = "Asia/Kolkata";

export function StudioLocations() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: TZ }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 20000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-paper">
      <div className="shell-wide py-section">
        <Bracket>Where we are</Bracket>

        <ul className="mt-10 md:mt-14">
          {CITIES.map((c) => (
            <li key={c.name} className="border-t border-hairline pt-3 first:border-t-0 first:pt-0">
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-display text-[clamp(3rem,13vw,10rem)] font-medium uppercase leading-[0.9] tracking-tight">
                  {c.name}
                </h2>
                <div className="mt-2 flex shrink-0 flex-col items-end gap-1 text-right md:mt-5">
                  <span className="font-mono text-2xs uppercase tracking-label tabular-nums text-ink">{time ? `${time}` : "·"}</span>
                  <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">{c.role}</span>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-10 gap-y-1.5 pb-7 font-mono text-2xs uppercase tracking-label text-ink-muted">
                {c.phone ? (
                  <a href={c.phoneHref} className="link-underline text-ink">
                    P · {c.phone}
                  </a>
                ) : (
                  <span>By appointment</span>
                )}
                {c.address && <span>A · {c.address}</span>}
                <a href={c.map} target="_blank" rel="noreferrer" className="link-underline inline-flex items-center gap-1.5 text-ink">
                  Contact us
                  <svg width="11" height="9" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                    <path d="M9 1l4 4-4 4M13 5H0" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
