import Image from "next/image";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Button } from "@/components/primitives/Button";
import { Reveal } from "@/components/primitives/Reveal";

/** Two-sentence philosophy + site image, link to Studio (PRD H4). */
export function StudioIntro() {
  return (
    <section className="bg-paper">
      <div className="shell-wide grid gap-12 py-section md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-mount">
            <Reveal className="absolute inset-0">
              <Image src="/assets/hero/p-52.jpg" alt="Inside a completed Madane workspace." fill sizes="(max-width:768px) 100vw, 40vw" className="object-cover" />
            </Reveal>
          </div>
        </div>

        <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
          <SectionHeader index="02" label="Studio" />
          <Reveal>
            <p className="mt-10 max-w-prose font-display text-2xl leading-[1.25] tracking-tight md:text-3xl">
              We design the interior and exterior of homes and workspaces, and we try, above all, to disappear.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-7 max-w-prose text-base text-ink-muted">
              Two neutrals, a single material logic, and daylight doing the dramatic work. The result should feel
              inevitable, as though the space could not have been any other way.
            </p>
          </Reveal>
          <Reveal delay={0.14} className="mt-10">
            <Button href="/studio" variant="tertiary" arrow>
              Go deeper
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
