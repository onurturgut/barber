"use client";
import { PageHero } from "@/components/site/PageHero";
import { BookingCTA } from "@/components/site/BookingCTA";
import { LookbookGallery } from "@/components/site/LookbookGallery";
import { TransformationSlider } from "@/components/site/TransformationSlider";

export default function GalleryPage() {
  return (
    <main>
      <PageHero no="06" label="LOOKBOOK" title="GALERİ" />
      <LookbookGallery />
      <TransformationSlider />
      <BookingCTA />
    </main>
  );
}
