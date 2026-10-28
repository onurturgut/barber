"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { NAV } from "@/data/brand";
import { gsap, useGSAP } from "@/lib/gsap";
import { MobileMenu } from "./MobileMenu";
import { Magnetic } from "./Magnetic";

export function SiteHeader() {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useGSAP(
    () => {
      gsap.to(".hdr-bar", {
        height: scrolled ? 64 : 88,
        backgroundColor: scrolled ? "rgba(8,8,8,0.92)" : "rgba(8,8,8,0)",
        borderBottomColor: scrolled
          ? "rgba(240,238,233,0.12)"
          : "rgba(240,238,233,0)",
        duration: 0.35,
        ease: "power3.out",
      });
    },
    { scope: ref, dependencies: [scrolled] },
  );

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]"
    >
      <div className="hdr-bar flex h-[88px] items-center border-b border-transparent backdrop-blur-[2px]">
        <div className="shell flex items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-baseline gap-2 text-foreground"
            aria-label="RAZE Barber Club ana sayfa"
          >
            <span className="font-display text-3xl">RAZE</span>
            <span className="micro text-primary">/</span>
            <span className="micro hidden sm:inline">BARBER CLUB</span>
          </Link>

          <nav aria-label="Ana menü" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    href={n.to}
                    aria-current={pathname === n.to ? "page" : undefined}
                    className={`micro link-line hover:text-foreground ${pathname === n.to ? "text-foreground" : "text-foreground/80"}`}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic>
              <Link
                href="/randevu"
                className="btn btn-signal min-h-[44px] px-4 sm:px-5"
              >
                RANDEVU AL <ArrowUpRight className="hidden size-4 sm:block" />
              </Link>
            </Magnetic>
            <button
              type="button"
              className="flex size-11 flex-col items-center justify-center gap-1.5 border border-border lg:hidden"
              aria-label="Menüyü aç"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <span className="h-0.5 w-5 bg-foreground" />
              <span className="h-0.5 w-5 bg-foreground" />
            </button>
          </div>
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
