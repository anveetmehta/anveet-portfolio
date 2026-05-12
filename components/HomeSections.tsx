'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { SignalsStrip } from '@/components/sections/SignalsStrip';
import { SystemsLayerSection } from '@/components/sections/SystemsLayerSection';
import { ShapedSystemsSection } from '@/components/sections/ShapedSystemsSection';
import { ExplorationsSection } from '@/components/sections/ExplorationsSection';
import { MentalModelsSection } from '@/components/sections/MentalModelsSection';
import { NotesFromSystemSection } from '@/components/sections/NotesFromSystemSection';
import { OpenThreadsSection } from '@/components/sections/OpenThreadsSection';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { defaultFeatureFlags, featureFlagsStorageKey } from '@/lib/app-config';

export function HomeSections() {
  const { value: storedFlags } = useLocalStorageState(featureFlagsStorageKey, defaultFeatureFlags);
  const flags = { ...defaultFeatureFlags, ...storedFlags };

  return (
    <>
      <HeroSection />
      {flags.enableSignalsStrip ? <SignalsStrip /> : null}
      {flags.enableSystemsLayer ? <SystemsLayerSection /> : null}
      {flags.enableShapedSystems ? <ShapedSystemsSection /> : null}
      {flags.enableExplorations ? <ExplorationsSection /> : null}
      {flags.enableMentalModels ? <MentalModelsSection /> : null}
      {flags.enableNotesFromSystem ? <NotesFromSystemSection /> : null}
      {flags.enableOpenThreads ? <OpenThreadsSection /> : null}
    </>
  );
}
