import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

/** On-brand 404 that routes back to the work (PRD §8.9). Self-contained. */
export default function NotFound() {
  return (
    <main className="on-ink flex min-h-screen flex-col bg-paper text-ink">
      <div className="shell-wide flex h-[var(--header-h)] items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-display text-[1.35rem] lowercase tracking-tight">madane</span>
          <span className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.34em] text-ink/55">design workshop</span>
        </Link>
        <span className="font-mono text-2xs uppercase tracking-label text-ink/50">[ 404 ]</span>
      </div>

      <div className="shell-wide flex flex-1 flex-col justify-center py-24">
        <span className="font-mono text-2xs uppercase tracking-label text-ink/50">[ Off the plan ]</span>
        <h1 className="mt-8 font-display text-[clamp(3.5rem,16vw,11rem)] leading-[0.85] tracking-tighter">404</h1>
        <p className="mt-8 max-w-prose text-lead font-light text-ink/75">
          This room isn&rsquo;t on the floor plan. Let&rsquo;s walk you back to the work.
        </p>
        <div className="mt-12 flex flex-wrap gap-6">
          <Link href="/projects" className="inline-flex h-12 items-center rounded-none border border-ink/40 px-7 font-sans text-xs uppercase tracking-[0.16em] transition-colors duration-300 hover:bg-ink hover:text-paper">
            View the projects
          </Link>
          <Link href="/" className="link-underline inline-flex items-center font-sans text-xs uppercase tracking-[0.16em] text-ink/80">
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
