import Image from "next/image";
import type { TeamMember } from "@/lib/schema";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Reveal } from "@/components/primitives/Reveal";

/** Team grid — B&W circular portraits; initial-monogram fallback where no clean
 * portrait exists (PRD §8.4 optional team grid). */
export function TeamGrid({ team }: { team: TeamMember[] }) {
  return (
    <section className="bg-paper">
      <div className="shell-wide py-section">
        <SectionHeader index="02" label="The people" title="A small studio, by design." align="between"
          intro="One accountable team from first sketch to final snag — the same people you start with finish with you." />
        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.slug} delay={(i % 4) * 0.06} className="flex flex-col items-center text-center">
              <div className="relative aspect-square w-full max-w-[180px] overflow-hidden rounded-full bg-mount">
                {m.portrait ? (
                  <Image
                    src={m.portrait}
                    alt={`${m.name} — ${m.role}, Madane Design Workshop.`}
                    fill
                    sizes="180px"
                    className="object-cover grayscale"
                  />
                ) : (
                  <span aria-hidden="true" className="flex h-full w-full items-center justify-center font-display text-4xl text-ink/85">
                    {m.name.charAt(0)}
                  </span>
                )}
              </div>
              <h3 className="mt-5 font-display text-lead tracking-tight">{m.name}</h3>
              <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-label text-ink-muted">{m.role}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
