import { AboutSection } from '@/components/sections/AboutSection';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { WritingSection } from '@/components/sections/WritingSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CaseStudiesSection />
      <ExpertiseSection />
      <WritingSection />
      <ContactSection />
    </>
  );
}
