"use client";

import { useState } from "react";
import { IntroLoader } from "@/components/site/IntroLoader";
import { HeroSection } from "@/components/site/HeroSection";
import { BrandManifesto } from "@/components/site/BrandManifesto";
import { ServicesShowcase } from "@/components/site/ServicesShowcase";
import { CraftStory } from "@/components/site/CraftStory";
import { TransformationSlider } from "@/components/site/TransformationSlider";
import { TeamSection } from "@/components/site/TeamSection";
import { LookbookGallery } from "@/components/site/LookbookGallery";
import { BookingCTA } from "@/components/site/BookingCTA";

export default function HomePage() {
  const [ready, setReady] = useState(false);
  return (
    <main>
      <IntroLoader onDone={() => setReady(true)} />
      <HeroSection key={ready ? "go" : "wait"} />
      <BrandManifesto />
      <ServicesShowcase />
      <CraftStory />
      <TransformationSlider />
      <TeamSection />
      <LookbookGallery />
      <BookingCTA />
    </main>
  );
}
