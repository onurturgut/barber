"use client";
import { PageHero } from "@/components/site/PageHero";
import { BookingCTA } from "@/components/site/BookingCTA";
import { BRAND } from "@/data/brand";

export default function ContactPage() {
  return (
    <main>
      <PageHero
        no="07"
        label="CONTACT"
        title="İLETİŞİM"
        text="İletişim bilgileri yer tutucudur — gerçek bilgilerle değiştirilecek."
      />
      <section className="shell grid gap-10 py-20 md:grid-cols-3">
        <div>
          <p className="micro text-primary">ADRES</p>
          <p className="mt-3 text-xl">{BRAND.address}</p>
        </div>
        <div>
          <p className="micro text-primary">TELEFON</p>
          <p className="mt-3 text-xl">{BRAND.phone}</p>
        </div>
        <div>
          <p className="micro text-primary">SAATLER</p>
          {BRAND.hours.map((h) => (
            <p key={h.day} className="mt-2">
              {h.day}: {h.time}
            </p>
          ))}
        </div>
        <div className="flex aspect-[16/7] items-center justify-center border border-border md:col-span-3">
          <span className="micro text-muted-foreground">
            GOOGLE MAPS [YER TUTUCU]
          </span>
        </div>
      </section>
      <BookingCTA />
    </main>
  );
}
