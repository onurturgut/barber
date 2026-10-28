import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY } from "@/data/demo";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { SectionLabel } from "./Magnetic";

const SHAPE = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
  square: "aspect-square",
};

export function LookbookGallery({ no = "06" }: { no?: string }) {
  const ref = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>(".lb-item").forEach((el, i) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 1,
              delay: (i % 3) * 0.08,
              ease: "power4.inOut",
              scrollTrigger: { trigger: el, start: "top 90%" },
            },
          );
          gsap.fromTo(
            el.querySelector("img"),
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: el, scrub: true },
            },
          );
        });
      });
    },
    { scope: ref },
  );

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (d: number) =>
      setActive((a) =>
        a === null ? a : (a + d + GALLERY.length) % GALLERY.length,
      ),
    [],
  );

  useEffect(() => {
    if (active === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, step]);

  useGSAP(
    () => {
      if (active !== null && boxRef.current) {
        gsap.fromTo(
          boxRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.25 },
        );
        gsap.fromTo(
          ".lb-big",
          { scale: 0.94, clipPath: "inset(10% 10% 10% 10%)" },
          {
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.5,
            ease: "power4.out",
          },
        );
      }
    },
    { dependencies: [active], scope: boxRef },
  );

  const item = active !== null ? GALLERY[active] : null;

  return (
    <section
      ref={ref}
      className="bg-ink py-24 md:py-36"
      aria-labelledby="lb-title"
    >
      <div className="shell">
        <SectionLabel
          no={no}
          label="LOOKBOOK"
          className="text-muted-foreground"
        />
        <h2 id="lb-title" className="font-display text-giant mt-6">
          THE <span className="text-primary">LOOKBOOK.</span>
        </h2>
        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {GALLERY.map((g, i) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setActive(i)}
              className={`lb-item group relative mb-6 block w-full overflow-hidden break-inside-avoid ${SHAPE[g.shape]}`}
              aria-label={`Büyüt: ${g.alt}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="size-full scale-110 object-cover transition-transform duration-700 group-hover:scale-[1.18]"
              />
              <span className="micro absolute bottom-3 left-3 bg-deep px-2 py-1">
                <span className="text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>{" "}
                / {g.tag}
              </span>
            </button>
          ))}
        </div>
      </div>

      {item && (
        <div
          ref={boxRef}
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-deep/95 p-4"
          onClick={close}
        >
          <figure
            className="lb-big relative max-h-[85svh] max-w-[min(92vw,1100px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="max-h-[78svh] w-auto object-contain"
            />
            <figcaption className="micro mt-3 flex justify-between text-muted-foreground">
              <span>{item.tag}</span>
              <span>
                {active! + 1} / {GALLERY.length}
              </span>
            </figcaption>
          </figure>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Kapat"
            className="absolute right-4 top-4 flex size-12 items-center justify-center bg-primary text-primary-foreground"
          >
            <X />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Önceki"
            className="absolute left-2 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center border border-border"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Sonraki"
            className="absolute right-2 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center border border-border"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </section>
  );
}
