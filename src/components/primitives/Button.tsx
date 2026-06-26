"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { MagneticWrap } from "./MagneticWrap";

type Variant = "primary" | "secondary" | "tertiary";

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 font-sans text-xs uppercase tracking-[0.16em] transition-colors duration-300 ease-editorial select-none";

const variants: Record<Variant, string> = {
  // Ink fill, paper text, one primary per view (PRD §6.4)
  primary: "h-12 rounded-none bg-ink px-7 text-paper hover:bg-ink/90",
  // Hairline outline
  secondary: "h-12 rounded-none border border-ink/25 px-7 text-ink hover:border-ink",
  // Underlined text link
  tertiary: "h-auto p-0 text-ink",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  magnetic?: boolean;
  arrow?: boolean;
};

function Inner({ children, arrow, variant }: { children: React.ReactNode; arrow?: boolean; variant: Variant }) {
  if (variant === "tertiary") {
    return (
      <span className="link-underline inline-flex items-center gap-2">
        {children}
        {arrow && <Arrow />}
      </span>
    );
  }
  return (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && <Arrow />}
    </>
  );
}

function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true" className="transition-transform duration-300 ease-editorial group-hover/btn:translate-x-1">
      <path d="M9 1l4 4-4 4M13 5H0" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function Button({
  href,
  variant = "primary",
  className,
  children,
  magnetic = true,
  arrow = false,
  ...rest
}: CommonProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("https://wa.me");
  const cls = cn(base, variants[variant], className);
  const content = <Inner variant={variant} arrow={arrow}>{children}</Inner>;

  const anchor = isExternal ? (
    <a href={href} className={cls} {...rest}>{content}</a>
  ) : (
    <Link href={href} className={cls} {...rest}>{content}</Link>
  );

  return magnetic && variant !== "tertiary" ? <MagneticWrap>{anchor}</MagneticWrap> : anchor;
}

export function ButtonAction({
  variant = "primary",
  className,
  children,
  magnetic = true,
  arrow = false,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const btn = (
    <button className={cn(base, variants[variant], className)} {...rest}>
      <Inner variant={variant} arrow={arrow}>{children}</Inner>
    </button>
  );
  return magnetic && variant !== "tertiary" ? <MagneticWrap>{btn}</MagneticWrap> : btn;
}
