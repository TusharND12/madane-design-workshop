"use client";

import { cn } from "@/lib/cn";
import type { ProjectType } from "@/lib/schema";

// Native <option>s can't take Tailwind classes reliably; style them to the dark
// theme tokens (mount / ink) so the dropdown popup matches the site.
const OPTION_STYLE: React.CSSProperties = { backgroundColor: "#181818", color: "#ECECE6" };

/**
 * Archive filter — by type and location, instant + animated + URL-synced.
 * Stateless; parent owns the active values and persists them to the URL.
 */
export function FilterBar({
  types,
  locations,
  activeType,
  activeLocation,
  counts,
  onType,
  onLocation,
  total,
}: {
  types: ProjectType[];
  locations: string[];
  activeType: ProjectType | "All";
  activeLocation: string | "All";
  counts: Record<string, number>;
  onType: (t: ProjectType | "All") => void;
  onLocation: (l: string | "All") => void;
  total: number;
}) {
  return (
    <div data-filter-bar className="sticky top-[clamp(0.75rem,1.6vw,1.25rem)] z-30 flex justify-center">
      <div className="flex w-full max-w-4xl flex-col gap-4 rounded-[1.75rem] border border-hairline bg-paper/80 px-5 py-3 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.5)] backdrop-blur-md lg:h-14 lg:flex-row lg:items-center lg:justify-between lg:gap-2 lg:rounded-full lg:py-0 lg:pl-6 lg:pr-3">
        {/* Type */}
        <div className="flex flex-wrap items-center gap-x-1 gap-y-2 lg:flex-nowrap lg:gap-x-0" role="group" aria-label="Filter by type">
          <Chip label="All" count={total} active={activeType === "All"} onClick={() => onType("All")} />
          {types.map((t) => (
            <Chip key={t} label={t} count={counts[t] ?? 0} active={activeType === t} onClick={() => onType(t)} />
          ))}
        </div>

        {/* Location */}
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden font-mono text-2xs uppercase tracking-label text-ink-muted xl:inline">Location</span>
          <div className="relative">
            <select
              value={activeLocation}
              onChange={(e) => onLocation(e.target.value as string)}
              aria-label="Filter by location"
              style={{ colorScheme: "dark" }}
              className="appearance-none rounded-full border border-hairline bg-transparent py-1.5 pl-3.5 pr-8 font-mono text-2xs uppercase tracking-label text-ink transition-colors duration-300 hover:border-ink focus:border-ink"
            >
              <option value="All" style={OPTION_STYLE}>
                All cities
              </option>
              {locations.map((l) => (
                <option key={l} value={l} style={OPTION_STYLE}>
                  {l}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted" aria-hidden="true">
              ↓
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({ label, count, active, onClick }: { label: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 font-sans text-[0.7rem] uppercase tracking-[0.1em] transition-colors duration-300 lg:px-2.5",
        active ? "bg-ink text-paper" : "text-ink-muted hover:text-ink"
      )}
    >
      {label}
      <span className={cn("font-mono text-[0.55rem]", active ? "text-paper/60" : "text-ink-muted/60")}>{String(count).padStart(2, "0")}</span>
    </button>
  );
}
