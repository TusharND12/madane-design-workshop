import { Bracket } from "@/components/primitives/Bracket";
import { Reveal } from "@/components/primitives/Reveal";
import { cn } from "@/lib/cn";

/**
 * Calm inner-page opener, bracket label + oversized Gantari title + lead.
 * Sits below the fixed header (top padding reserved). No layout shift.
 */
export function PageIntro({
  label,
  title,
  lead,
  meta,
  className,
}: {
  label: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  meta?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("shell-wide pb-12 pt-[calc(var(--header-h)+clamp(3rem,9vw,7rem))]", className)}>
      <Reveal>
        <Bracket>{label}</Bracket>
      </Reveal>
      <Reveal delay={0.06}>
        <h1 className="mt-8 max-w-[16ch] font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.98] tracking-tighter">
          {title}
        </h1>
      </Reveal>
      {(lead || meta) && (
        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {lead && (
            <Reveal delay={0.1}>
              <p className="max-w-prose text-lead font-light text-ink-muted">{lead}</p>
            </Reveal>
          )}
          {meta && (
            <Reveal delay={0.14}>
              <div className="font-mono text-2xs uppercase tracking-label text-ink-muted">{meta}</div>
            </Reveal>
          )}
        </div>
      )}
    </header>
  );
}
