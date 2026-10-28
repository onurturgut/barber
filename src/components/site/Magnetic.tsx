import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Subtle magnetic pull toward the cursor (pointer devices only). */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (
        !el ||
        !window.matchMedia(
          "(hover: hover) and (prefers-reduced-motion: no-preference)",
        ).matches
      )
        return;
      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: ref },
  );
  return (
    <span ref={ref} className={`inline-block ${className ?? ""}`}>
      {children}
    </span>
  );
}

export function SectionLabel({
  no,
  label,
  className,
}: {
  no: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`micro flex items-center gap-4 ${className ?? ""}`}>
      <span className="text-primary">{no}</span>
      <span className="h-px w-10 bg-current opacity-40" />
      <span>{label}</span>
    </div>
  );
}
