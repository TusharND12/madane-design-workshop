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
        <SectionHeader
          index="—"
          label="News & Insights"
          title="Latest from the studio."
          align="between"
          intro="Perspectives on how we design and build, and what we are learning along the way."
        />

        <ul className="mt-12 md:mt-14">
          {latest.map((post, i) => (
            <Reveal as="li" key={post.title} delay={(i % 3) * 0.06}>
              <Link
                href="/insights"
                className="group grid grid-cols-1 gap-2 border-t border-hairline py-7 md:grid-cols-12 md:items-baseline md:gap-8"
              >
                <div className="flex items-center gap-4 font-mono text-2xs uppercase tracking-label text-ink-muted md:col-span-3">
                  <span className="text-ink/70">{post.kind}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="max-w-[30ch] font-display text-xl leading-[1.1] tracking-tight text-ink/80 transition-colors duration-300 group-hover:text-ink md:col-span-9 md:text-2xl">
                  {post.title}
                </h3>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1} className="mt-12">
          <Button href="/insights" variant="tertiary" arrow>
            All news &amp; insights
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
