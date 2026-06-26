import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Wordmark rendered as live text so it inherits colour (adapts to transparent
 * hero vs. solid header without swapping assets). The brand is lowercase
 * "madane / design workshop".
 */
export function Logo({ className, subdued = false }: { className?: string; subdued?: boolean }) {
  return (
    <Link href="/" aria-label="Madane Design Workshop, home" className={cn("group inline-flex flex-col leading-none", className)}>
      <span className="font-display text-[1.35rem] lowercase leading-[0.9] tracking-tight">madane</span>
      <span className={cn("mt-1 font-mono text-[0.5rem] uppercase tracking-[0.34em] transition-opacity duration-300", subdued ? "opacity-50" : "opacity-70")}>
        design workshop
      </span>
    </Link>
  );
}
