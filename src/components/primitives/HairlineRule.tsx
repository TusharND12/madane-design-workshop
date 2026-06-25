import { cn } from "@/lib/cn";

/** 1px hairline (1.5px Ink for emphasis). The site's only chrome. */
export function HairlineRule({ ink = false, className }: { ink?: boolean; className?: string }) {
  return <div role="separator" className={cn(ink ? "rule-ink" : "rule", className)} />;
}
