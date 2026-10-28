"use client";
import { PageHero } from "@/components/site/PageHero";
import { BookingCTA } from "@/components/site/BookingCTA";
import { ServicesShowcase } from "@/components/site/ServicesShowcase";

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        no="02"
        label="SERVICES"
        title="HİZMETLER"
        text="Her detay, ustalığın bir parçası."
      />
      <ServicesShowcase />
      <BookingCTA />
    </main>
  );
}
