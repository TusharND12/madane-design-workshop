"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/**
 * Counts the numeric part of a value up from zero when it scrolls into view,
 * preserving any prefix (₹) and suffix (M+, %, Cr…). e.g. "₹51 Cr", "2M+".
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const m = value.match(/^(\D*)([\d.]+)(.*)$/);
  const prefix = m?.[1] ?? "";
  const target = m ? parseFloat(m[2]) : 0;
  const suffix = m?.[3] ?? "";
  const decimals = m && m[2].includes(".") ? m[2].split(".")[1].length : 0;

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || target === 0) return;
    const controls = animate(0, target, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(v),
    });
    return () => controls.stop();
    // `m`/`target` derive from the static `value` prop; depend only on inView + target.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target]);

  if (!m) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}
