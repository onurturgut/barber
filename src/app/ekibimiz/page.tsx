"use client";
import { PageHero } from "@/components/site/PageHero";
import { BookingCTA } from "@/components/site/BookingCTA";
import { TeamSection } from "@/components/site/TeamSection";

export default function TeamPage() {
  return (
    <main>
      <PageHero no="04" label="THE CREW" title="EKİBİMİZ" />
      <TeamSection />
      <BookingCTA />
    </main>
  );
}
