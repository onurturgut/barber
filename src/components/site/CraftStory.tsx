import { useRef } from "react";
import { IMAGES } from "@/data/demo";
import {
  gsap,
  SplitText,
  useGSAP,
  MOTION_OK,
  DESKTOP_MOTION,
} from "@/lib/gsap";
import { SectionLabel } from "./Magnetic";

export function CraftStory({ no = "03" }: { no?: string }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".cr-pin",
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 0.6,
          },
        });
        tl.fromTo(
          ".cr-frame",
          { clipPath: "inset(18% 22% 18% 22%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
        )
          .fromTo(
            ".cr-img",
            { scale: 1.35, objectPosition: "30% 50%" },
            { scale: 1, objectPosition: "60% 50%", ease: "none" },
            0,
          )
          .fromTo(
            ".cr-marquee",
            { xPercent: 0 },
            { xPercent: -30, ease: "none" },
            0,
          );
      });
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(".cr-title", {
          type: "lines",
          mask: "lines",
        });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: ".cr-title", start: "top 85%" },
        });
        gsap.from(".cr-p", {
          autoAlpha: 0,
          y: 30,
          stagger: 0.12,
          duration: 0.8,
          scrollTrigger: { trigger: ".cr-text", start: "top 85%" },
        });
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="cr-title" className="bg-ink">
      <div className="cr-pin relative flex h-[100svh] min-h-[560px] items-center overflow-hidden">
        <div className="cr-frame absolute inset-0">
          <img
            src={IMAGES.craft}
            alt="Makas ve saç makinesi yakın çekim"
            loading="lazy"
            width={1600}
            height={1008}
            className="cr-img size-full object-cover"
          />
          <div className="absolute inset-0 bg-deep/45" />
        </div>
        <div
          aria-hidden
          className="cr-marquee text-outline pointer-events-none absolute top-[12%] whitespace-nowrap font-display text-[clamp(6rem,18vw,16rem)] opacity-60"
        >
          CRAFT — DETAIL — CRAFT — DETAIL —
        </div>
        <div className="shell relative">
          <SectionLabel no={no} label="OUR CRAFT" />
          <h2 id="cr-title" className="cr-title font-display text-mega mt-6">
            PRECISION <br />
            IS <span className="text-primary">EVERYTHING.</span>
          </h2>
        </div>
      </div>
      <div className="cr-text shell grid gap-10 py-20 md:grid-cols-12">
        <p className="cr-p micro text-primary md:col-span-2">/ 0.5 MM</p>
        <p className="cr-p text-xl leading-relaxed md:col-span-5">
          Bir geçişin temizliği, yarım milimetrelik bir kararla belirlenir. Her
          aleti kendi elimizle bakımını yaparak, her kesimi ilk günkü dikkatle
          yaparız.
        </p>
        <p className="cr-p text-foreground/70 md:col-span-4 md:col-start-9">
          Danışma, kesim, son kontrol. Üç adım, tek standart. Aynanın
          karşısından kalktığınızda fark kendini anlatır.
        </p>
      </div>
    </section>
  );
}
