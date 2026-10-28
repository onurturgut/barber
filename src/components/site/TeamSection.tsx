import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { BARBERS } from "@/data/demo";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { SectionLabel } from "./Magnetic";

export function TeamSection({ no = "05" }: { no?: string }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>(".tm-card").forEach((c, i) => {
          gsap.from(c, {
            y: 80,
            autoAlpha: 0,
            duration: 1,
            delay: i * 0.08,
            ease: "power4.out",
            scrollTrigger: { trigger: c, start: "top 88%" },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="bg-deep py-24 md:py-36"
      aria-labelledby="tm-title"
    >
      <div className="shell">
        <SectionLabel
          no={no}
          label="THE CREW"
          className="text-muted-foreground"
        />
        <h2 id="tm-title" className="font-display text-giant mt-6">
          MEET <br />
          THE <span className="text-primary">CREW.</span>
        </h2>
        <p className="micro mt-6 text-muted-foreground">
          ÖRNEK PROFİLLER — GERÇEK EKİP BİLGİLERİYLE DEĞİŞTİRİLECEK.
        </p>

        <div className="mt-16 grid gap-16 md:grid-cols-3 md:gap-8">
          {BARBERS.map((b, i) => (
            <article
              key={b.id}
              className={`tm-card group ${i === 1 ? "md:mt-32" : ""} ${i === 2 ? "md:mt-12" : ""}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={b.image}
                  alt={`${b.name} portresi`}
                  loading="lazy"
                  width={768}
                  height={1024}
                  className="size-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
                <span className="absolute left-0 top-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                <span className="font-display absolute bottom-3 right-4 text-6xl text-primary">
                  0{i + 1}
                </span>
              </div>
              <div className="mt-5 transition-transform duration-300 group-hover:-translate-y-1">
                <h3 className="font-display text-5xl">{b.name}</h3>
                <p className="micro mt-2 text-primary">{b.specialization}</p>
                <p className="mt-3 max-w-xs text-foreground/70">{b.bio}</p>
                <Link
                  href={{ pathname: "/randevu", query: { berber: b.id } }}
                  className="link-line micro mt-5 inline-flex min-h-[44px] items-center gap-2"
                >
                  {b.name.split(" ")[0]} İLE RANDEVU{" "}
                  <ArrowUpRight className="size-4 text-primary" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
