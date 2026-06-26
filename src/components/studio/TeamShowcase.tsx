"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Reveal } from "@/components/primitives/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The crew — the full studio team. A wide group portrait band, then a gallery of
 * portraits that each zoom in as they scroll through the viewport, with the name
 * and a diagonal arrow beneath. Editorial, monochrome, with a young kinetic feel.
 */
type Member = { src: string; name: string };

const TEAM: Member[] = [
  { src: "/assets/team/nidhi-jain.png", name: "Nidhi Jain" },
  { src: "/assets/team/shatbdi-ojha.png", name: "Shatbdi Ojha" },
  { src: "/assets/team/mahesh-khandekar.jpeg", name: "Mahesh Khandekar" },
  { src: "/assets/team/ajay-gupta.jpeg", name: "Ajay Gupta" },
  { src: "/assets/team/nikita-rane.jpeg", name: "Nikita Rane" },
  { src: "/assets/team/aishwarya-joil.png", name: "Aishwarya Joil" },
  { src: "/assets/team/ravindra.png", name: "Ravindra" },
  { src: "/assets/team/harshad.png", name: "Harshad" },
  { src: "/assets/team/komal-kharat.png", name: "Komal Kharat" },
  { src: "/assets/team/vaishnavi.png", name: "Vaishnavi" },
  { src: "/assets/team/shweta.png", name: "Shweta" },
  { src: "/assets/team/ajinkya.jpeg", name: "Ajinkya" },
  { src: "/assets/team/aasawari.png", name: "Aasawari" },
  { src: "/assets/team/priyanka-gupta.png", name: "Priyanka Gupta" },
  { src: "/assets/team/madhuri.jpeg", name: "Madhuri" },
  { src: "/assets/team/laveena.jpeg", name: "Laveena" },
  { src: "/assets/team/chaavi.png", name: "Chaavi" },
  { src: "/assets/team/pratik.png", name: "Pratik" },
  { src: "/assets/team/prince.png", name: "Prince" },
];

export function TeamShowcase() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="bg-paper">
      <div className="shell-wide py-section">
        <SectionHeader
          index="03"
          label="The crew"
          title="The people behind the calm."
          align="between"
          intro="Architects, designers and project leads — the team that turns the studio's quiet into built work."
        />

        {/* Group portrait band */}
        <Reveal className="relative mt-12 aspect-[1672/665] w-full overflow-hidden rounded-card bg-mount md:mt-14">
          <Image
            src="/assets/team/group.png"
            alt="The Madane Design Workshop studio team."
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </Reveal>

        {/* Portrait gallery — each photo zooms in on scroll */}
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 md:mt-16 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <MemberCard key={m.src} member={m} index={i} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MemberCard({ member, index, reduced }: { member: Member; index: number; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.26]);

  return (
    <Reveal as="div" delay={(index % 4) * 0.05} className="group">
      <div ref={ref} className="relative aspect-[3/4] w-full overflow-hidden rounded-card bg-mount">
        <ZoomImage src={member.src} name={member.name} scale={scale} reduced={reduced} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-hairline pt-3">
        <h3 className="min-w-0 truncate font-display text-lead tracking-tight transition-colors duration-300 group-hover:text-ink">
          {member.name}
        </h3>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
          className="shrink-0 text-ink-muted transition-all duration-300 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
        >
          <path d="M7 17 17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Reveal>
  );
}

function ZoomImage({
  src,
  name,
  scale,
  reduced,
}: {
  src: string;
  name: string;
  scale: MotionValue<number>;
  reduced: boolean;
}) {
  return (
    <motion.div className="absolute inset-0" style={reduced ? undefined : { scale }}>
      <Image
        src={src}
        alt={`${name} — Madane Design Workshop.`}
        fill
        sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
        className="object-cover grayscale transition-[filter] duration-500 ease-editorial group-hover:grayscale-0"
      />
    </motion.div>
  );
}
