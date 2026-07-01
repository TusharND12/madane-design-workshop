import { Hero } from "@/components/home/Hero";
import { ArchitectureSketch } from "@/components/home/ArchitectureSketch";
import { getProjectsByType } from "@/lib/cms";
import { EditorialQuote } from "@/components/home/EditorialQuote";
import { ValuesFlower } from "@/components/home/ValuesFlower";
import { ThinkToInnovate } from "@/components/home/ThinkToInnovate";
import { ServicesCards } from "@/components/home/ServicesCards";
import { GalleryShowcase } from "@/components/home/GalleryShowcase";
import { Recognition } from "@/components/home/Recognition";
import { ProcessStrip } from "@/components/home/ProcessStrip";
import { EnquiryBand } from "@/components/common/EnquiryBand";

export default function HomePage() {
  const architecture = getProjectsByType("Architecture");
  return (
    <>
      <Hero />
      <ArchitectureSketch projects={architecture} />
      <EditorialQuote />
      <ValuesFlower />
      <ThinkToInnovate />
      <GalleryShowcase />
      <ServicesCards />
      <Recognition />
      <ProcessStrip />
      <EnquiryBand />
    </>
  );
}
