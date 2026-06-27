import { MotionConfig } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Loader } from "@/components/layout/Loader";
import { Grain } from "@/components/layout/Grain";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ProjectZoomProvider } from "@/components/projects/ProjectZoom";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="never">
      <a
        href="#main"
        className="sr-only z-[110] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:inline-flex focus:h-11 focus:items-center focus:rounded-none focus:bg-ink focus:px-5 focus:font-mono focus:text-2xs focus:uppercase focus:tracking-label focus:text-paper"
      >
        Skip to content
      </a>
      <SmoothScroll />
      <Loader />
      <Grain />
      <ScrollProgress />
      <Header />
      <ProjectZoomProvider>
        <main id="main">{children}</main>
      </ProjectZoomProvider>
      <Footer />
    </MotionConfig>
  );
}
