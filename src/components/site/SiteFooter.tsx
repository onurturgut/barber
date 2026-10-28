"use client";

import Link from "next/link";
import { useRef } from "react";
import { BRAND, NAV } from "@/data/brand";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const st = { trigger: ref.current, start: "top 85%" };
        gsap.from(".ft-link", {
          y: 16,
          autoAlpha: 0,
          stagger: 0.04,
          duration: 0.5,
          scrollTrigger: st,
        });
        gsap.from(".ft-line", {
          scaleX: 0,
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: st,
        });
        gsap.from(".ft-big", {
          yPercent: 100,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: ".ft-big", start: "top 100%" },
        });
      });
    },
    { scope: ref },
  );
  return (
    <footer
      ref={ref}
      className="overflow-hidden bg-deep pt-20 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="shell">
        <div className="ft-line h-px origin-left bg-primary" />
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="micro text-primary">ADRES</p>
            <p className="ft-link mt-3">{BRAND.address}</p>
            <a
              href={BRAND.maps}
              className="ft-link link-line micro mt-3 inline-block"
            >
              GOOGLE MAPS [BAĞLANTI EKLENECEK]
            </a>
          </div>
          <div>
            <p className="micro text-primary">İLETİŞİM</p>
            <p className="ft-link mt-3">{BRAND.phone}</p>
            <div className="mt-3 flex gap-5">
              <a href={BRAND.instagram} className="ft-link link-line micro">
                INSTAGRAM
              </a>
              <a href={BRAND.whatsapp} className="ft-link link-line micro">
                WHATSAPP
              </a>
            </div>
          </div>
          <div>
            <p className="micro text-primary">ÇALIŞMA SAATLERİ</p>
            <ul className="mt-3 space-y-1">
              {BRAND.hours.map((h) => (
                <li
                  key={h.day}
                  className="ft-link flex justify-between gap-4 text-sm"
                >
                  <span className="text-muted-foreground">{h.day}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Alt menü">
            <p className="micro text-primary">MENÜ</p>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    href={n.to}
                    className="ft-link link-line micro inline-block py-1"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/randevu"
                  className="ft-link link-line micro inline-block py-1 text-primary"
                >
                  RANDEVU
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="micro flex flex-wrap justify-between gap-3 border-t border-border py-5 text-muted-foreground">
          <span>
            © 2026 {BRAND.name} / {BRAND.sub}
          </span>
          <span>DEMO WEB SİTESİ — İLETİŞİM BİLGİLERİ YER TUTUCUDUR</span>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="ft-big font-display text-center text-[clamp(8rem,34vw,34rem)] leading-[0.78]">
          RAZE<span className="text-primary">.</span>
        </div>
      </div>
    </footer>
  );
}
