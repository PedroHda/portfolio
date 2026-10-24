import { SiteLayout } from "@/layouts/site-layout";
import { HeroSection } from "./sections/hero";
import { AboutSection } from "./sections/about";
import { ExperienceSection } from "./sections/experience";
import { SkillsSection } from "./sections/skills";
import { ProjectsSection } from "./sections/projects";
import { EducationSection } from "./sections/education";

export function HomePage() {
  return (
    <SiteLayout>
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
      </main>
    </SiteLayout>
  );
}
