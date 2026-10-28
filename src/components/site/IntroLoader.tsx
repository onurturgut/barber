import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

let played = false;

/** Short cinematic intro. Plays once per visit; click to skip. */
export function IntroLoader({ onDone }: { onDone?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(() => !played);

  useGSAP(
    () => {
      if (!show) {
        onDone?.();
        return;
      }
      played = true;
      const finish = () => {
        setShow(false);
        onDone?.();
      };
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.to(ref.current, {
          autoAlpha: 0,
          duration: 0.3,
          onComplete: finish,
        });
        return;
      }
      const tl = gsap.timeline({ onComplete: finish });
      tl.fromTo(
        ".il-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: "power4.inOut" },
      )
        .fromTo(
          ".il-logo",
          { yPercent: 110 },
          { yPercent: 0, duration: 0.6, ease: "power4.out" },
          "-=0.15",
        )
        .fromTo(
          ".il-sub",
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.3 },
          "-=0.3",
        )
        .to(".il-logo", {
          scaleX: 1.25,
          letterSpacing: "0.04em",
          duration: 0.3,
          ease: "power2.inOut",
        })
        .to(".il-logo", {
          scaleX: 1,
          letterSpacing: "0em",
          duration: 0.2,
          ease: "power2.out",
        })
        .to(
          ref.current,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.6,
            ease: "power4.inOut",
          },
          "+=0.05",
        );
      const skip = () => tl.progress(1);
      ref.current?.addEventListener("click", skip);
      return () => ref.current?.removeEventListener("click", skip);
    },
    { scope: ref },
  );

  if (!show) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="intro-failsafe fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-deep"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="overflow-hidden">
        <div className="il-logo font-display text-[clamp(6rem,24vw,18rem)] text-foreground">
          RAZE
        </div>
      </div>
      <div className="il-line my-4 h-px w-[min(60vw,520px)] origin-left bg-primary" />
      <div className="il-sub micro text-muted-foreground">
        BARBER CLUB / EST. 2026
      </div>
    </div>
  );
}
