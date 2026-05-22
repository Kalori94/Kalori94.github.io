/**
 * Home — Portfolio Biotecnóloga
 * Design: Dark Bioluminescence
 * Sections: Hero (DNA canvas) → About → Skills → Research → Projects → Contact
 */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ResearchSection from "@/components/ResearchSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#050a0f" }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ResearchSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
