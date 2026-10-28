import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/demo";
import { formatPrice } from "@/lib/booking";
import { gsap, useGSAP, DESKTOP_MOTION, MOTION_OK } from "@/lib/gsap";
import { SectionLabel } from "./Magnetic";

export function ServicesShowcase({ no = "02" }: { no?: string }) {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const t = track.current!;
        const dist = () => t.scrollWidth - window.innerWidth;
        const tween = gsap.to(t, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: ".sv-pin",
            start: "top top",
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>(".sv-panel").forEach((p) => {
          gsap.fromTo(
            p.querySelector(".sv-media"),
            { scale: 0.86 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: p,
                containerAnimation: tween,
                start: "left right",
                end: "center center",
                scrub: true,
              },
            },
          );
        });
      });
      mm.add(MOTION_OK, () => {
        gsap.from(".sv-head > *", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".sv-head", start: "top 80%" },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="bg-deep" aria-labelledby="sv-title">
      <div className="sv-pin flex min-h-[100svh] flex-col overflow-hidden py-24 lg:py-0">
        <div className="sv-head shell flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:pt-28">
          <div>
            <SectionLabel
              no={no}
              label="SERVICES"
              className="text-muted-foreground"
            />
            <h2 id="sv-title" className="font-display text-giant mt-6">
              THE <br className="hidden lg:block" />
              SERVICES<span className="text-primary">.</span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-lg">Her detay, ustalığın bir parçası.</p>
            <p className="micro mt-3 text-muted-foreground">
              * Fiyatlar örnek içeriktir — salon fiyatları girilene kadar.
            </p>
          </div>
        </div>

        <div className="no-scrollbar mt-12 overflow-x-auto lg:mt-auto lg:overflow-visible lg:pb-16">
          <div
            ref={track}
            className="flex flex-col gap-14 px-[clamp(1.25rem,4vw,3rem)] lg:w-max lg:flex-row lg:gap-10"
          >
            {SERVICES.map((s) => (
              <article
                key={s.id}
                className="sv-panel group relative grid gap-5 lg:w-[min(64vw,980px)] lg:grid-cols-[1.2fr_1fr] lg:gap-8"
              >
                <div className="sv-media relative aspect-[4/3] overflow-hidden lg:aspect-[5/4] lg:h-[52svh] lg:w-auto">
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    className="duotone size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="micro absolute left-3 top-3 bg-deep px-2 py-1 text-primary">
                    {s.no} / 06
                  </span>
                </div>
                <div className="flex flex-col justify-between border-t border-border pt-5">
                  <div>
                    <span className="font-display text-outline text-7xl lg:text-8xl">
                      {s.no}
                    </span>
                    <h3 className="font-display mt-3 text-5xl lg:text-6xl">
                      {s.name}
                    </h3>
                    <p className="mt-4 max-w-sm text-foreground/75">
                      {s.description}
                    </p>
                  </div>
                  <div className="mt-6">
                    <dl className="micro flex gap-8 text-muted-foreground">
                      <div>
                        <dt>SÜRE</dt>
                        <dd className="mt-1 text-base text-foreground">
                          {s.duration} DK
                        </dd>
                      </div>
                      <div>
                        <dt>ÖRNEK FİYAT</dt>
                        <dd className="mt-1 text-base text-foreground">
                          {formatPrice(s.price)}
                        </dd>
                      </div>
                    </dl>
                    <Link
                      href={{ pathname: "/randevu", query: { hizmet: s.id } }}
                      className="link-line micro mt-6 inline-flex min-h-[44px] items-center gap-3 text-foreground [&>svg]:transition-transform group-hover:[&>svg]:translate-x-1 group-hover:[&>svg]:-rotate-45"
                    >
                      BU HİZMETLE RANDEVU AL{" "}
                      <ArrowUpRight className="size-4 text-primary" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
