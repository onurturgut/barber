import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { IMAGES } from "@/data/demo";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { Magnetic } from "./Magnetic";

export function HeroSection({ delay = 0 }: { delay?: number }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(".hero-line", {
          type: "chars",
          mask: "chars",
        });
        const tl = gsap.timeline({ delay, defaults: { ease: "power4.out" } });
        tl.fromTo(
          ".hero-media",
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "power4.inOut" },
        )
          .fromTo(
            ".hero-img",
            { scale: 1.12 },
            { scale: 1, duration: 2, ease: "power3.out" },
            "<",
          )
          .from(
            split.chars,
            { yPercent: 110, duration: 0.8, stagger: 0.035 },
            "-=1.2",
          )
          .from(
            ".hero-sub",
            { autoAlpha: 0, y: 24, duration: 0.6, stagger: 0.08 },
            "-=0.5",
          )
          .from(
            ".hero-cta",
            { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.08 },
            "-=0.35",
          )
          .from(
            ".hero-label-l",
            { autoAlpha: 0, x: -30, duration: 0.6 },
            "-=0.4",
          )
          .from(".hero-label-r", { autoAlpha: 0, x: 30, duration: 0.6 }, "<")
          .from(
            ".hero-frame",
            { scaleX: 0, duration: 0.8, ease: "power3.inOut", stagger: 0.1 },
            "<",
          );
        gsap.to(".hero-scroll", {
          y: 8,
          repeat: -1,
          yoyo: true,
          duration: 0.9,
          ease: "sine.inOut",
          delay: delay + 1.6,
        });
        gsap.to(".hero-img", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="grain relative min-h-[100svh] overflow-hidden bg-deep pt-[88px]"
      aria-labelledby="hero-title"
    >
      <div className="hero-media absolute inset-y-0 right-0 w-full lg:w-[62%]">
        <img
          src={IMAGES.hero}
          alt="Berber, müşterinin skin fade kesimini yapıyor"
          width={1600}
          height={1088}
          className="hero-img size-full object-cover object-[60%_30%] opacity-60 lg:opacity-90"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/40 to-transparent" />
      </div>

      <div className="hero-frame absolute left-[4%] right-[4%] top-[22%] h-px origin-left bg-foreground/15" />
      <div className="hero-frame absolute bottom-[14%] left-[4%] right-[4%] h-px origin-right bg-foreground/15" />

      <div className="hero-label-l micro vertical absolute left-3 top-1/2 hidden -translate-y-1/2 text-muted-foreground md:block">
        41.0082° N / 28.9784° E
      </div>
      <div className="hero-label-r micro absolute right-[4%] top-[calc(22%+1rem)] hidden text-foreground/80 md:block">
        PRECISION / STYLE / ATTITUDE
      </div>

      <div className="shell relative flex min-h-[calc(100svh-88px)] flex-col justify-end pb-[16svh] pt-16">
        <h1
          id="hero-title"
          className="font-display text-[clamp(5rem,15vw,11.5rem)] leading-[0.82]"
        >
          <span className="hero-line block">CUT</span>
          <span className="hero-line block">THE</span>
          <span className="hero-line block">
            NOISE<span className="text-primary">.</span>
          </span>
        </h1>
        <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <p className="hero-sub font-display text-3xl md:text-4xl">
              STİL TESADÜF DEĞİLDİR.
            </p>
            <p className="hero-sub mt-3 max-w-md text-foreground/75">
              Keskin çizgiler. Güçlü karakter. Modern erkek bakımında yeni bir
              standart.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-7 md:justify-end">
            <Magnetic className="hero-cta">
              <Link href="/randevu" className="btn btn-signal">
                RANDEVU OLUŞTUR <ArrowUpRight className="size-4" />
              </Link>
            </Magnetic>
            <Magnetic className="hero-cta">
              <Link href="/hizmetler" className="btn btn-ghost">
                TARZINI KEŞFET
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>

      <div className="hero-scroll micro absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 text-muted-foreground">
        SCROLL TO EXPLORE <ArrowDown className="size-3.5 text-primary" />
      </div>
    </section>
  );
}
