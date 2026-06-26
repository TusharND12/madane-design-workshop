import { getStudio } from "@/lib/cms";
import { Reveal } from "@/components/primitives/Reveal";
import { RecognitionGrid } from "@/components/home/RecognitionGrid";

/**
 * Trusted by, the real client roster grouped by sector into a bento grid whose
 * card outlines draw in with scroll. The whole section is one rounded stone
 * panel (the card colour is the field; outlines define the boxes).
 */
export function Recognition() {
  const { accreditations } = getStudio();

  return (
    <section className="relative z-10 overflow-hidden rounded-[clamp(1.75rem,5vw,3.25rem)] bg-gradient-to-br from-[#202228] via-[#1e2025] to-[#1d1f23] shadow-[0_-30px_70px_-30px_rgba(0,0,0,0.6)]">
      <div className="shell-wide py-section">
        {/* Header, centered pill + title */}
        <Reveal className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-mount px-4 py-1.5 font-mono text-2xs uppercase tracking-label text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-ink/60" aria-hidden="true" />
            Trusted by
          </span>
          <h2 className="mt-7 font-display text-[clamp(2rem,5.2vw,3.6rem)] font-light leading-[1.02] tracking-tight">
            Trusted across India.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted">
            Homes and workspaces delivered for families, founders and established institutions, 75+ clients, since 2008.
          </p>
        </Reveal>

        {/* Bento grid, outlines draw in with scroll */}
        <RecognitionGrid accreditations={accreditations} />
      </div>
    </section>
  );
}
