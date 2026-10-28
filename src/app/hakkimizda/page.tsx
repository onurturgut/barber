"use client";
import { PageHero } from "@/components/site/PageHero";
import { BookingCTA } from "@/components/site/BookingCTA";
import { BrandManifesto } from "@/components/site/BrandManifesto";
import { CraftStory } from "@/components/site/CraftStory";

export default function AboutPage() {
  return (
    <main>
      <PageHero
        no="01"
        label="THE STUDIO"
        title="HAKKIMIZDA"
        text="Biz yalnızca saç kesmiyoruz, karakterine şekil veriyoruz."
      />
      <BrandManifesto />
      <CraftStory />
      <BookingCTA />
    </main>
  );
}
