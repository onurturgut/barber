import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { Magnetic } from "./Magnetic";

export function BookingCTA() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const s = SplitText.create(".cta-title", {
          type: "lines",
          mask: "lines",
        });
        gsap.from(s.lines, {
          yPercent: 110,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        });
        return () => s.revert();
      });
    },
    { scope: ref },
  );
  return (
    <section
      ref={ref}
      className="bg-primary py-24 text-primary-foreground md:py-36"
    >
      <div className="shell">
        <p className="micro">/ BOOK NOW</p>
        <h2 className="cta-title font-display text-mega mt-6">
          YOUR NEXT <br /> CUT STARTS HERE.
        </h2>
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xl">Yeni tarzın için ilk adımı at.</p>
          <Magnetic strength={0.4}>
            <Link
              href="/randevu"
              className="btn btn-deep min-h-[60px] px-8 text-sm"
            >
              ŞİMDİ RANDEVU AL <ArrowUpRight className="size-5" />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
