import Link from "next/link";
import Image from "next/image";
import { getServices } from "@/lib/cms";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Reveal } from "@/components/primitives/Reveal";

/** Four soft teaser cards — the GrandPool density block (PRD H5, §6.3 radius). */
export function ServicesTeaser() {
  const services = getServices();
  return (
    <section className="bg-paper">
      <div className="shell-wide py-section">
        <SectionHeader
          index="03"
          label="Services"
          title="Four ways we work."
          intro="From a single room to a whole building, designed and — when you want it — delivered."
          align="between"
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.07}>
              <Link
                href={`/services#${s.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-card bg-sand transition-colors duration-300 hover:bg-stone"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-2xs tracking-label text-ink-muted">{s.index}</span>
                  <h3 className="mt-3 font-display text-2xl tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.tagline}</p>
                  <span className="link-underline mt-6 inline-flex font-mono text-2xs uppercase tracking-label">Explore</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
