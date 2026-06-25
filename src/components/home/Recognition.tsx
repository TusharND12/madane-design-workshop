import { getClients, getStudio } from "@/lib/cms";
import { Bracket } from "@/components/primitives/Bracket";
import { Reveal } from "@/components/primitives/Reveal";

/** Trust strip — real client names + accreditations (PRD recognition / proof). */
export function Recognition() {
  const clients = getClients();
  const { accreditations } = getStudio();
  return (
    <section className="bg-paper">
      <div className="shell-wide py-section-sm">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4">
          {/* Accent statement cell */}
          <Reveal className="flex flex-col justify-between gap-8 rounded-card border border-hairline bg-stone/60 p-7 md:col-span-4 md:p-8">
            <Bracket>Trusted by</Bracket>
            <p className="font-display text-lead leading-snug tracking-tight">
              Homes and workspaces delivered for families, founders and established institutions across India.
            </p>
            <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">75+ clients · since 2008</span>
          </Reveal>

          {/* Name wall — each client set in its own chip for an even, intentional grid */}
          <Reveal delay={0.08} className="rounded-card border border-hairline bg-mount p-4 md:col-span-8 md:p-5">
            <div className="grid h-full grid-cols-2 content-center gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {clients.map((c) => (
                <div
                  key={c.name}
                  title={c.name}
                  className="group flex h-[76px] items-center justify-center rounded-lg border border-hairline/70 bg-paper px-4 text-center transition-colors duration-500 ease-editorial hover:border-ink/20"
                >
                  <span className="font-display text-sm leading-tight tracking-tight text-ink/70 transition-colors duration-500 ease-editorial group-hover:text-ink md:text-base">
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Accreditations strip */}
        <Reveal delay={0.12} className="mt-3 flex flex-col items-center gap-6 rounded-card border border-hairline bg-mount p-8 md:mt-4">
          <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">Accreditations</span>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {accreditations.map((a) => (
              <span key={a} className="font-display text-xl tracking-tight text-ink/65 md:text-2xl">
                {a}
              </span>
            ))}
          </div>
          <span className="font-mono text-2xs uppercase tracking-label text-ink-muted">
            IGBC &amp; USGBC Platinum / Gold certified
          </span>
        </Reveal>
      </div>
    </section>
  );
}
