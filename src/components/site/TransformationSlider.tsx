import { useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { IMAGES } from "@/data/demo";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { SectionLabel } from "./Magnetic";

export function TransformationSlider({ no = "04" }: { no?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState(50);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ".tf-box", start: "top 75%" },
        });
        tl.fromTo(
          ".tf-box",
          { clipPath: "inset(0 50% 0 50%)" },
          { clipPath: "inset(0 0% 0 0%)", duration: 1.1, ease: "power4.inOut" },
        ).from(
          ".tf-head > *",
          { y: 30, autoAlpha: 0, stagger: 0.1, duration: 0.6 },
          0,
        );
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="bg-ink py-24 md:py-36"
      aria-labelledby="tf-title"
    >
      <div className="shell">
        <div className="tf-head grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <SectionLabel
              no={no}
              label="BEFORE / AFTER"
              className="text-muted-foreground"
            />
            <h2 id="tf-title" className="font-display text-giant mt-6">
              THE <br />
              TRANSFORMATION<span className="text-primary">.</span>
            </h2>
          </div>
          <p className="micro text-muted-foreground md:col-span-4 md:text-right">
            DEMO GÖRSEL — GERÇEK MÜŞTERİ SONUCU DEĞİLDİR.
          </p>
        </div>

        <div className="tf-box relative mt-12 aspect-square select-none overflow-hidden sm:aspect-[16/10]">
          <img
            src={IMAGES.before}
            alt="Önce: uzamış, dağınık saç (demo)"
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
            draggable={false}
          />
          <img
            src={IMAGES.fade}
            alt="Sonra: dokulu üst ve düşük fade (demo)"
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
            style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
            draggable={false}
          />
          <span className="micro absolute left-4 top-4 bg-deep px-2 py-1">
            ÖNCE
          </span>
          <span className="micro absolute right-4 top-4 bg-primary px-2 py-1 text-primary-foreground">
            SONRA
          </span>
          <div
            className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-primary"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-primary text-primary-foreground">
              <MoveHorizontal className="size-6" />
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Önce ve sonra karşılaştırması"
            className="absolute inset-0 size-full cursor-ew-resize opacity-0"
          />
        </div>
      </div>
    </section>
  );
}
