'use client';

import { AboutSection } from '@/components/sections/AboutSection';
import { AiPersonaChat } from '@/components/sections/AiPersonaChat';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { WritingSection } from '@/components/sections/WritingSection';
import { DomainExpertiseSection } from '@/components/sections/DomainExpertiseSection';
import { RegTechSection } from '@/components/sections/RegTechSection';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { defaultFeatureFlags, featureFlagsStorageKey } from '@/lib/app-config';

function SectionDivider() {
  return (
    <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-border/60 to-transparent" />
  );
}

export function HomeSections() {
  const { value: storedFlags } = useLocalStorageState(featureFlagsStorageKey, defaultFeatureFlags);
  // Merge stored flags with defaults so new flags always have a value
  const flags = { ...defaultFeatureFlags, ...storedFlags };

  return (
    <>
      <HeroSection />
      {flags.enableAbout ? <><SectionDivider /><AboutSection /></> : null}
      {flags.enableProjects ? <ProjectsSection /> : null}
      {flags.enableCaseStudies ? <><SectionDivider /><CaseStudiesSection /></> : null}
      {flags.enableExpertise ? <ExpertiseSection /> : null}
      {flags.enableDomainExpertise ? <><SectionDivider /><DomainExpertiseSection /></> : null}
      {flags.enableNow ? null : null}
      {flags.showWritingSection ? <><SectionDivider /><WritingSection /></> : null}
      {flags.enableRegtechSection ? <><SectionDivider /><RegTechSection /></> : null}
      {flags.enableAiChat ? <AiPersonaChat /> : null}
      {flags.enableContact ? <ContactSection /> : null}
    </>
  );
}
