import { Bracket } from "./Bracket";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

/**
 * The repeating editorial unit (PRD §6.4): index number + mono bracket label
 * + Gantari H2 + hairline rule.
 */
export function SectionHeader({
  index,
  label,
  title,
  intro,
  align = "left",
  onInk = false,
  className,
}: {
  index?: string;
  label?: string;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "between";
  onInk?: boolean;
  className?: string;
}) {
  return (
    <header className={cn("w-full", className)}>
      {(index || label) && (
        <Reveal as="div">
          <div className="flex items-baseline justify-between gap-6">
            <div className="flex items-baseline gap-4">
              {index && <span className={cn("section-index", onInk && "text-ink/55")}>{index}</span>}
              {label && <Bracket className={cn(onInk && "text-ink/70")}>{label}</Bracket>}
            </div>
          </div>
          <div className={cn("mt-6 h-px w-full", onInk ? "bg-ink/15" : "bg-hairline")} />
        </Reveal>
      )}

      {(title || intro) && (
        <div className={cn("mt-8 flex flex-col gap-6 md:mt-10", align === "between" && "md:flex-row md:items-end md:justify-between")}>
          {title && (
            <Reveal>
              <h2 className={cn("font-display text-3xl leading-[1.05] tracking-tighter md:text-4xl", onInk ? "text-ink" : "text-ink", align === "between" && "md:max-w-[16ch]")}>
                {title}
              </h2>
            </Reveal>
          )}
          {intro && (
            <Reveal delay={0.08}>
              <p className={cn("max-w-lead text-lead font-light", onInk ? "text-ink/70" : "text-ink-muted")}>{intro}</p>
            </Reveal>
          )}
        </div>
      )}
    </header>
  );
}
