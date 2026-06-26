"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";
import type { GalleryImage } from "@/lib/schema";
import { Bracket } from "@/components/primitives/Bracket";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Mixed-ratio image sequence, full-bleed, two-up, detail crops (PRD P3). */
export function Gallery({ images, name }: { images: GalleryImage[]; name: string }) {
  return (
    <section className="bg-paper">
      <div className="shell-wide pt-section">
        <Bracket>Gallery</Bracket>
      </div>
      <div className="shell-wide mt-10 grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-12 md:gap-y-12">
        {images.map((img, i) => (
          <Figure key={i} img={img} name={name} index={i} />
        ))}
      </div>
    </section>
  );
}

const SPAN_CLASS: Record<GalleryImage["span"], string> = {
  full: "md:col-span-12",
  wide: "md:col-span-12",
  half: "md:col-span-6",
  tall: "md:col-span-6",
};
const ASPECT: Record<GalleryImage["span"], string> = {
  full: "aspect-[2/1] md:aspect-[21/9]",
  wide: "aspect-[16/9]",
  half: "aspect-[4/3]",
  tall: "aspect-[4/5]",
};

function Figure({ img, name, index }: { img: GalleryImage; name: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // 8% parallax travel, felt, not seen (PRD §6.5).
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <motion.figure
      ref={ref}
      className={cn(SPAN_CLASS[img.span])}
      initial={{ clipPath: "inset(8% 0% 8% 0%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={cn("relative w-full overflow-hidden bg-mount", ASPECT[img.span])} data-cursor-view>
        <motion.div className="absolute inset-[-9%]" style={{ y }}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={img.span === "half" || img.span === "tall" ? "(max-width:768px) 100vw, 50vw" : "100vw"}
            className="object-cover"
            loading={index < 2 ? "eager" : "lazy"}
          />
        </motion.div>
      </div>
      <figcaption className="mt-3 font-mono text-2xs uppercase tracking-label text-ink-muted">
        {String(index + 1).padStart(2, "0")} · {img.alt.replace(`${name}, `, "")}
      </figcaption>
    </motion.figure>
  );
}
