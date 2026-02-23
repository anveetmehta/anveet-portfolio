'use client';

import { AboutSection } from '@/components/sections/AboutSection';
import { AiPersonaChat } from '@/components/sections/AiPersonaChat';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { WritingSection } from '@/components/sections/WritingSection';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { defaultFeatureFlags, featureFlagsStorageKey } from '@/lib/app-config';

export function HomeSections() {
  const { value: flags } = useLocalStorageState(featureFlagsStorageKey, defaultFeatureFlags);

  return (
    <>
      <HeroSection />
      <AboutSection />
      {flags.enableCaseStudies ? <CaseStudiesSection /> : null}
      {flags.enableExpertise ? <ExpertiseSection /> : null}
      {flags.showWritingSection ? <WritingSection /> : null}
      {flags.enableAiChat ? <AiPersonaChat /> : null}
      <ContactSection />
    </>
  );
}
