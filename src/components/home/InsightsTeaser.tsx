import Link from "next/link";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Reveal } from "@/components/primitives/Reveal";
import { Button } from "@/components/primitives/Button";
import { insights } from "@/content/insights";

/** Homepage teaser - the three most recent journal entries, linking to /insights. */
export function InsightsTeaser() {
  const latest = insights.slice(0, 3);

  return (
    <section className="bg-paper">
      <div className="shell-wide py-section">
        <SectionHeader label="News & Insights" title="Latest from the studio." />

        <ul className="mt-12 md:mt-14">
          {latest.map((post, i) => (
            <Reveal as="li" key={post.title} delay={(i % 3) * 0.06}>
              <Link
                href="/insights"
                className="group flex flex-col gap-2 border-t border-hairline py-6 md:flex-row md:items-baseline md:justify-between md:gap-10"
              >
                <h3 className="max-w-[46ch] font-display text-xl leading-[1.2] tracking-tight text-ink/70 transition-colors duration-300 group-hover:text-ink md:text-2xl">
                  {post.title}
                </h3>
                <span className="shrink-0 font-mono text-2xs uppercase tracking-label text-ink-muted">
                  {post.kind} · {post.date}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1} className="mt-11">
          <Button href="/insights" variant="tertiary" arrow>
            All news &amp; insights
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
