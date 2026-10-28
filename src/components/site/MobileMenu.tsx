import Link from "next/link";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { NAV, BRAND } from "@/data/brand";
import { gsap, useGSAP } from "@/lib/gsap";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("a,button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (open) {
        gsap.set(el, { autoAlpha: 1 });
        const tl = gsap.timeline();
        tl.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "power4.inOut" },
        )
          .fromTo(
            ".mm-item",
            { yPercent: 110 },
            { yPercent: 0, duration: 0.6, stagger: 0.06, ease: "power4.out" },
            "-=0.2",
          )
          .fromTo(
            ".mm-close",
            { rotate: -90, autoAlpha: 0 },
            { rotate: 0, autoAlpha: 1, duration: 0.3 },
            "<",
          )
          .fromTo(
            ".mm-foot",
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.3 },
            "-=0.3",
          );
      } else {
        gsap.to(el, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.4,
          ease: "power4.inOut",
          onComplete: () => gsap.set(el, { autoAlpha: 0 }),
        });
      }
    },
    { scope: ref, dependencies: [open] },
  );

  return (
    <div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menü"
      aria-hidden={!open}
      className="invisible fixed inset-0 z-[60] flex flex-col bg-deep px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] opacity-0"
      {...(!open ? { inert: true } : {})}
    >
      <div className="flex h-16 items-center justify-between">
        <span className="font-display text-3xl">RAZE</span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Menüyü kapat"
          className="mm-close flex size-11 items-center justify-center border border-border"
        >
          <X className="size-5" />
        </button>
      </div>
      <nav className="mt-8 flex-1" aria-label="Mobil menü">
        <ul className="space-y-1">
          {NAV.map((n, i) => (
            <li key={n.to} className="overflow-hidden">
              <Link
                href={n.to}
                onClick={onClose}
                className="mm-item flex items-start gap-3 py-1 font-display text-[clamp(2.75rem,13vw,5rem)] hover:text-primary"
              >
                <span className="micro mt-3 text-primary">0{i + 1}</span>
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mm-foot flex items-end justify-between gap-4 border-t border-border pt-5">
        <span className="micro text-muted-foreground">
          {BRAND.sub} / {BRAND.est}
        </span>
        <Link href="/randevu" onClick={onClose} className="btn btn-signal">
          RANDEVU AL
        </Link>
      </div>
    </div>
  );
}
