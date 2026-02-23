import { AboutSection } from '@/components/sections/AboutSection';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { WritingSection } from '@/components/sections/WritingSection';
import { getWritingEntries } from '@/lib/writing';

export default async function HomePage() {
  const writingEntries = await getWritingEntries();

  return (
    <>
      <HeroSection />
      <AboutSection />
      <CaseStudiesSection />
      <ExpertiseSection />
      <WritingSection entries={writingEntries} />
      <ContactSection />
    </>
  );
}
