import { Hero } from "../components/Hero";
import { Values } from "../components/Values";
import { AboutPreview } from "../components/AboutPreview";
import { ServicesGrid } from "../components/ServicesGrid";
import { GalleryPreview } from "../components/GalleryPreview";
import { ProjectFormSection } from "../components/ProjectFormSection";
import { WhyUs } from "../components/WhyUs";
import { CTASection } from "../components/CTASection";
import { useSeo } from "../lib/useSeo";

export function Home() {
  useSeo(
    "Veteran-Owned General Contractor",
    "Courage To Claws is a veteran-owned general contracting company. New construction, remodeling, roofing, decks, and additions built with craftsmanship and purpose."
  );
  return (
    <>
      <Hero />
      <Values />
      <AboutPreview />
      <ServicesGrid limit={8} />
      <GalleryPreview />
      <ProjectFormSection />
      <WhyUs />
      <CTASection />
    </>
  );
}
