import { Hero } from "@/components/home/Hero";
import { ProofStat } from "@/components/home/ProofStat";
import { SelectedWork } from "@/components/home/SelectedWork";
import { EditorialQuote } from "@/components/home/EditorialQuote";
import { StudioGrid } from "@/components/home/StudioGrid";
import { ServicesCards } from "@/components/home/ServicesCards";
import { GalleryShowcase } from "@/components/home/GalleryShowcase";
import { Recognition } from "@/components/home/Recognition";
import { ProcessStrip } from "@/components/home/ProcessStrip";
import { EnquiryBand } from "@/components/common/EnquiryBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStat />
      <SelectedWork />
      <EditorialQuote />
      <StudioGrid />
      <ServicesCards />
      <GalleryShowcase />
      <Recognition />
      <ProcessStrip />
      <EnquiryBand />
    </>
  );
}
