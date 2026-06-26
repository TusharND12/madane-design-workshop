"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { site } from "@/content/site";

/** On-scroll map reveal, desaturated to hold the monochrome system (PRD §8.7). */
export function MapReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [loaded, setLoaded] = useState(false);
  const src = `https://www.google.com/maps?q=${encodeURIComponent(site.contact.mapQuery)}&z=12&output=embed`;

  return (
    <div ref={ref} className="relative h-[52vh] min-h-[360px] w-full overflow-hidden bg-stone">
      {inView && (
        <iframe
          title={`Map, ${site.contact.city}`}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full grayscale contrast-[1.05] transition-opacity duration-700 ease-editorial ${loaded ? "opacity-90" : "opacity-0"}`}
        />
      )}
      <div className="pointer-events-none absolute inset-0 mix-blend-multiply" aria-hidden="true" />
    </div>
  );
}
