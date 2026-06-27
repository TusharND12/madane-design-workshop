import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Brand lockup (wordmark + brush monogram) rendered as a white-on-transparent
 * image so it reads on the dark theme. `subdued` slightly dims it over the solid
 * header state.
 */
export function Logo({ className, subdued = false }: { className?: string; subdued?: boolean }) {
  return (
    <Link href="/" aria-label="Madane Design Workshop, home" className={cn("inline-flex items-center", className)}>
      <Image
        src="/assets/madane-logo-header.png"
        alt="Madane Design Workshop"
        width={876}
        height={348}
        priority
        className={cn("h-11 w-auto md:h-12", subdued ? "opacity-95" : "opacity-100")}
      />
    </Link>
  );
}
