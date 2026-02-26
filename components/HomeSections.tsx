'use client';

import { AboutSection } from '@/components/sections/AboutSection';
import { AiPersonaChat } from '@/components/sections/AiPersonaChat';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { NowSection } from '@/components/sections/NowSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { WritingSection } from '@/components/sections/WritingSection';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { defaultFeatureFlags, featureFlagsStorageKey } from '@/lib/app-config';

export function HomeSections() {
  const { value: storedFlags } = useLocalStorageState(featureFlagsStorageKey, defaultFeatureFlags);
  // Merge stored flags with defaults so new flags always have a value
  const flags = { ...defaultFeatureFlags, ...storedFlags };

  return (
    <>
      <HeroSection />
      <AboutSection />
      {flags.enableProjects ? <ProjectsSection /> : null}
      {flags.enableCaseStudies ? <CaseStudiesSection /> : null}
      {flags.enableExpertise ? <ExpertiseSection /> : null}
      {flags.enableNow ? <NowSection /> : null}
      {flags.showWritingSection ? <WritingSection /> : null}
      {flags.enableAiChat ? <AiPersonaChat /> : null}
      <ContactSection />
    </>
  );
}
