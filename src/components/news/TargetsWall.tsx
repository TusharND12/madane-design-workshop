"use client";

import { useState } from "react";

type Target = { v: string; l: string };

/**
 * Six 2030 targets as a centered wall: each value is ghosted and brightens on
 * hover, revealing its label (yodezeen list style). On mobile the labels stay
 * visible since there is no hover.
 */
export function TargetsWall({ items }: { items: Target[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center text-center">
      {items.map((t, i) => {
        const on = active === i;
        return (
          <div
            key={t.l}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className="flex flex-col items-center py-1"
          >
            <span
              className={`font-display text-[clamp(2rem,6vw,4.5rem)] font-bold uppercase leading-[1.05] tracking-tight transition-colors duration-300 ${
                on ? "text-ink" : "text-ink/25"
              }`}
            >
              {t.v}
            </span>
            <span
              className={`overflow-hidden font-mono text-2xs uppercase tracking-label text-ink-muted transition-all duration-300 max-h-8 opacity-100 sm:opacity-0 sm:max-h-0 ${
                on ? "sm:max-h-8 sm:opacity-100" : ""
              }`}
            >
              {t.l}
            </span>
          </div>
        );
      })}
    </div>
  );
}
