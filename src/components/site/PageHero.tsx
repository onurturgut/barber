import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

export function PageHero({
  no,
  label,
  title,
  text,
  image,
}: {
  no: string;
  label: string;
  title: string;
  text?: string;
  image?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const s = SplitText.create(".ph-title", {
          type: "chars",
          mask: "chars",
        });
        gsap.from(s.chars, {
          yPercent: 110,
          duration: 0.8,
          stagger: 0.025,
          ease: "power4.out",
        });
        gsap.from(".ph-meta", {
          autoAlpha: 0,
          y: 16,
          duration: 0.5,
          delay: 0.3,
          stagger: 0.08,
        });
        if (image)
          gsap.fromTo(
            ".ph-img",
            { clipPath: "inset(0 0 100% 0)", scale: 1.1 },
            {
              clipPath: "inset(0 0 0% 0)",
              scale: 1,
              duration: 1.2,
              ease: "power4.inOut",
            },
          );
        return () => s.revert();
      });
    },
    { scope: ref },
  );
  return (
    <section
      ref={ref}
      className="grain relative overflow-hidden bg-deep pb-16 pt-36 md:pt-44"
    >
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden
          className="ph-img duotone absolute inset-0 size-full object-cover opacity-30"
        />
      )}
      <div className="shell relative">
        <div className="ph-meta micro flex items-center gap-4 text-muted-foreground">
          <span className="text-primary">{no}</span>
          <span className="h-px w-10 bg-current" />
          {label}
        </div>
        <h1 className="ph-title font-display text-giant mt-6">
          {title}
          <span className="text-primary">.</span>
        </h1>
        {text && (
          <p className="ph-meta mt-6 max-w-lg text-lg text-foreground/75">
            {text}
          </p>
        )}
      </div>
    </section>
  );
}
