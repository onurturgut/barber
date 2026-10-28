import { useRef } from "react";
import { IMAGES } from "@/data/demo";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { SectionLabel } from "./Magnetic";

export function BrandManifesto() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(".mf-title", {
          type: "words",
          mask: "words",
        });
        gsap.from(split.words, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.07,
          ease: "power4.out",
          scrollTrigger: { trigger: ".mf-title", start: "top 80%" },
        });
        gsap.utils.toArray<HTMLElement>(".mf-img").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 1.2,
              ease: "power4.inOut",
              scrollTrigger: { trigger: el, start: "top 85%" },
            },
          );
          gsap.fromTo(
            el.querySelector("img"),
            { yPercent: -10 },
            {
              yPercent: 10,
              ease: "none",
              scrollTrigger: { trigger: el, scrub: true },
            },
          );
        });
        gsap.fromTo(
          ".mf-outline",
          { xPercent: 5 },
          {
            xPercent: -25,
            ease: "none",
            scrollTrigger: { trigger: ref.current, scrub: true },
          },
        );
        gsap.from(".mf-accent", {
          scaleX: 0,
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".mf-accent", start: "top 90%" },
        });
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-bone py-24 text-ink md:py-36"
      aria-labelledby="mf-title"
    >
      <div
        aria-hidden
        className="mf-outline text-outline-ink pointer-events-none absolute -bottom-6 left-0 whitespace-nowrap font-display text-[clamp(10rem,30vw,28rem)]"
      >
        CHARACTER
      </div>
      <div className="shell relative grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <SectionLabel no="01" label="OUR PHILOSOPHY" />
          <h2
            id="mf-title"
            className="mf-title font-display mt-8 text-[clamp(3.25rem,8vw,8rem)]"
          >
            WE DON'T FOLLOW STYLE. WE{" "}
            <span className="text-primary">DEFINE</span> IT.
          </h2>
          <div className="mf-accent mt-10 h-1 w-40 origin-left bg-primary" />
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <p className="text-lg leading-relaxed">
              Her kesim bir imza. Her detay bir duruş. Biz yalnızca saç
              kesmiyoruz, karakterine şekil veriyoruz.
            </p>
            <div className="micro space-y-3 border-l border-ink/20 pl-5 text-ink/60">
              <p>/ BETON. ÇELİK. IŞIK.</p>
              <p>/ RANDEVU ODAKLI STÜDYO</p>
              <p>/ ACELE YOK, TAVİZ YOK</p>
            </div>
          </div>
        </div>
        <div className="relative md:col-span-5">
          <figure className="mf-img relative ml-auto aspect-[3/4] w-[85%] overflow-hidden md:mt-24">
            <img
              src={IMAGES.portrait}
              alt="Modern kesim ve sakallı erkek portresi"
              loading="lazy"
              width={864}
              height={1152}
              className="size-full scale-110 object-cover"
            />
          </figure>
          <figure className="mf-img absolute -bottom-10 left-0 aspect-square w-[45%] overflow-hidden border-8 border-bone">
            <img
              src={IMAGES.craft}
              alt="Makas ve saç makinesi"
              loading="lazy"
              width={1600}
              height={1008}
              className="size-full scale-110 object-cover"
            />
          </figure>
          <span className="micro vertical absolute right-[-1.5rem] top-24 hidden text-ink/50 md:block">
            FIG. 01 — PORTRAIT STUDY
          </span>
        </div>
      </div>
    </section>
  );
}
