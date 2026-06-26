"use client";

import { useRef } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/primitives/SectionHeader";

/**
 * The crew — a horizontal carousel of vertical "pill" (stadium) cards, one per
 * team member. A dark-toned header holds the name; the portrait fills the lower,
 * fully-rounded section. Drag, swipe or trackpad-scroll through the whole team.
 */
type Member = { name: string; src: string };

// Left→right order, individual high-res portraits from /assets/team.
const TEAM: Member[] = [
  { name: "Aasawari", src: "/assets/team/aasawari.png" },
  { name: "Aishwarya Joil", src: "/assets/team/aishwarya-joil.png" },
  { name: "Chaavi", src: "/assets/team/chaavi.png" },
  { name: "Nidhi Jain", src: "/assets/team/nidhi-jain.png" },
  { name: "Shatbdi Ojha", src: "/assets/team/shatbdi-ojha.png" },
  { name: "Mahesh Khandekar", src: "/assets/team/mahesh-khandekar.jpeg" },
  { name: "Ajay Gupta", src: "/assets/team/ajay-gupta.jpeg" },
  { name: "Nikita Rane", src: "/assets/team/nikita-rane.jpeg" },
  { name: "Ravindra", src: "/assets/team/ravindra.png" },
  { name: "Harshad", src: "/assets/team/harshad.png" },
  { name: "Komal Kharat", src: "/assets/team/komal-kharat.png" },
  { name: "Vaishnavi", src: "/assets/team/vaishnavi.png" },
  { name: "Shweta", src: "/assets/team/shweta.png" },
  { name: "Ajinkya", src: "/assets/team/ajinkya.jpeg" },
  { name: "Priyanka Gupta", src: "/assets/team/priyanka-gupta.png" },
  { name: "Madhuri", src: "/assets/team/madhuri.jpeg" },
  { name: "Laveena", src: "/assets/team/laveena.jpeg" },
  { name: "Pratik", src: "/assets/team/pratik.png" },
  { name: "Prince", src: "/assets/team/prince.png" },
];

// Dark-theme header tones, cycled across the cards for subtle variety.
const TONES = ["#23262F", "#2A241E", "#272A2E", "#2C2622"];

export function TeamShowcase() {
  return (
    <section className="overflow-hidden bg-paper">
      <div className="shell-wide pt-section">
        <SectionHeader
          index="03"
          label="The crew"
          title="The people behind the calm."
          align="between"
          intro="Architects, designers and project leads — the team that turns the studio's quiet into built work."
        />
      </div>

      <Carousel />
    </section>
  );
}

function Carousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });

  function onDown(e: React.PointerEvent) {
    const el = scroller.current;
    if (!el) return;
    drag.current = { down: true, startX: e.pageX, startLeft: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  }
  function onMove(e: React.PointerEvent) {
    const el = scroller.current;
    if (!el || !drag.current.down) return;
    const dx = e.pageX - drag.current.startX;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  }
  function onUp(e: React.PointerEvent) {
    const el = scroller.current;
    drag.current.down = false;
    if (el && el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  }

  return (
    <div className="pb-section pt-12 md:pt-14">
      <div
        ref={scroller}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="flex cursor-grab snap-x snap-proximity gap-5 overflow-x-auto px-[max(1.25rem,calc((100vw-1440px)/2+1.25rem))] pb-4 active:cursor-grabbing md:gap-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TEAM.map((m, i) => (
          <PillCard key={m.src} member={m} tone={TONES[i % TONES.length]} priority={i < 5} />
        ))}
      </div>

      <div className="shell-wide mt-7 flex items-center justify-between font-mono text-2xs uppercase tracking-label text-ink-muted">
        <span>Drag to meet the team</span>
        <span>
          {String(TEAM.length).padStart(2, "0")} <span className="text-ink/30">people</span>
        </span>
      </div>
    </div>
  );
}

function PillCard({ member, tone, priority }: { member: Member; tone: string; priority: boolean }) {
  return (
    <div
      className="group relative aspect-[1/2.35] w-[clamp(11rem,17vw,13.5rem)] shrink-0 snap-center select-none overflow-hidden rounded-full"
      style={{ backgroundColor: tone }}
    >
      {/* Name header */}
      <div className="absolute inset-x-0 top-[7.5%] z-10 px-5 text-center">
        <span className="block truncate font-display text-lg leading-tight tracking-tight text-ink md:text-xl">
          {member.name}
        </span>
      </div>

      {/* Portrait — fully rounded bottom to follow the pill, gentle top corners */}
      <div className="absolute inset-x-2 bottom-2 top-[22%] overflow-hidden rounded-b-full rounded-t-[1.75rem] bg-mount">
        <Image
          src={member.src}
          alt={`${member.name} — Madane Design Workshop.`}
          fill
          draggable={false}
          sizes="(max-width:640px) 45vw, 220px"
          priority={priority}
          className="object-cover object-[50%_18%] grayscale transition-[filter,transform] duration-700 ease-editorial group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      </div>
    </div>
  );
}
