"use client";

import { cn } from "@/lib/cn";
import type { ProjectType } from "@/lib/schema";

// Native <option>s can't take Tailwind classes reliably; style them to the dark
// theme tokens (mount / ink) so the dropdown popup matches the site.
const OPTION_STYLE: React.CSSProperties = { backgroundColor: "#181818", color: "#ECECE6" };

/**
 * Archive filter, by type and location, instant + animated + URL-synced.
 * Stateless; parent owns the active values and persists them to the URL.
 */
export function FilterBar({
  types,
  locations,
  categories,
  activeType,
  activeLocation,
  activeCategory,
  counts,
  onType,
  onLocation,
  onCategory,
  total,
}: {
  types: ProjectType[];
  locations: string[];
  categories: string[];
  activeType: ProjectType | "All";
  activeLocation: string | "All";
  activeCategory: string | "All";
  counts: Record<string, number>;
  onType: (t: ProjectType | "All") => void;
  onLocation: (l: string | "All") => void;
  onCategory: (c: string | "All") => void;
  total: number;
}) {
  return (
    <div data-filter-bar className="sticky top-[clamp(0.75rem,1.6vw,1.25rem)] z-30 flex justify-center">
      <div className="flex w-full max-w-5xl items-center gap-2 overflow-x-auto rounded-full border border-white/10 bg-paper/70 py-2 pl-4 pr-2 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.5)] backdrop-blur-xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:h-14 lg:justify-between lg:overflow-visible lg:border-hairline lg:bg-paper/80 lg:py-0 lg:pl-6 lg:pr-3 lg:backdrop-blur-md">
        {/* Type */}
        <div className="flex shrink-0 items-center gap-x-1 lg:gap-x-0" role="group" aria-label="Filter by type">
          <Chip label="All" count={total} active={activeType === "All"} onClick={() => onType("All")} />
          {types.map((t) => (
            <Chip key={t} label={t} count={counts[t] ?? 0} active={activeType === t} onClick={() => onType(t)} />
          ))}
        </div>

        {/* Sector + Location */}
        <div className="flex shrink-0 items-center gap-2">
          <FilterSelect
            label="Sector"
            allLabel="All sectors"
            value={activeCategory}
            options={categories}
            onChange={(v) => onCategory(v)}
            maxW="max-w-[11rem]"
          />
          <FilterSelect
            label="Location"
            allLabel="All cities"
            value={activeLocation}
            options={locations}
            onChange={(v) => onLocation(v)}
            maxW="max-w-[9rem]"
          />
        </div>
      </div>
    </div>
  );
}

/** One pill dropdown styled to the glass bar (matches the original location control). */
function FilterSelect({
  label,
  allLabel,
  value,
  options,
  onChange,
  maxW = "max-w-[9rem]",
}: {
  label: string;
  allLabel: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  maxW?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="hidden font-mono text-2xs uppercase tracking-label text-ink-muted xl:inline">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`Filter by ${label.toLowerCase()}`}
          style={{ colorScheme: "dark" }}
          className={cn(
            "appearance-none truncate rounded-full border border-hairline bg-transparent py-1.5 pl-3.5 pr-8 font-mono text-2xs uppercase tracking-label text-ink transition-colors duration-300 hover:border-ink focus:border-ink",
            maxW
          )}
        >
          <option value="All" style={OPTION_STYLE}>
            {allLabel}
          </option>
          {options.map((o) => (
            <option key={o} value={o} style={OPTION_STYLE}>
              {o}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted" aria-hidden="true">
          ↓
        </span>
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
        "group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 font-sans text-[0.7rem] uppercase tracking-[0.1em] transition-colors duration-300",
        active ? "bg-ink text-paper" : "text-ink-muted hover:text-ink"
      )}
    >
      {label}
      <span className={cn("font-mono text-[0.55rem]", active ? "text-paper/60" : "text-ink-muted/60")}>{String(count).padStart(2, "0")}</span>
    </button>
  );
}
