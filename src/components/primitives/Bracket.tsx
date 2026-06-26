import { cn } from "@/lib/cn";

/**
 * The site's signature: a monospaced label in square brackets, [ Selected Work ].
 * Appears in nav, section heads and captions (PRD §5, §6 motif).
 */
export function Bracket({
  children,
  className,
  as: Comp = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "div" | "h2" | "p";
}) {
  return (
    <Comp className={cn("bracket-label", className)}>
      <span aria-hidden="true" className="mr-[0.4em] opacity-60">
        [
      </span>
      {children}
      <span aria-hidden="true" className="ml-[0.4em] opacity-60">
        ]
      </span>
    </Comp>
  );
}
