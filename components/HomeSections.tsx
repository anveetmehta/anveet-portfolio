'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { SignalsStrip } from '@/components/sections/SignalsStrip';
import { SystemsLayerSection } from '@/components/sections/SystemsLayerSection';
import { ShapedSystemsSection } from '@/components/sections/ShapedSystemsSection';
import { ExplorationsSection } from '@/components/sections/ExplorationsSection';
import { MentalModelsSection } from '@/components/sections/MentalModelsSection';
import { NotesFromSystemSection } from '@/components/sections/NotesFromSystemSection';
import { OpenThreadsSection } from '@/components/sections/OpenThreadsSection';
import { SignalsEngineSection } from '@/components/sections/SignalsEngineSection';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { defaultFeatureFlags, featureFlagsStorageKey } from '@/lib/app-config';
import type { ZoneMap } from '@/lib/zones';

type HomeSectionsProps = {
  zones: ZoneMap;
};

export function HomeSections({ zones }: HomeSectionsProps) {
  const { value: storedFlags } = useLocalStorageState(featureFlagsStorageKey, defaultFeatureFlags);
  const flags = { ...defaultFeatureFlags, ...storedFlags };

  return (
    <>
      <HeroSection data={zones.hero} />
      {flags.enableSignalsStrip ? <SignalsStrip data={zones.signals} /> : null}
      {flags.enableSystemsLayer ? <SystemsLayerSection data={zones.systems_layer} /> : null}
      {flags.enableShapedSystems ? <ShapedSystemsSection data={zones.shaped_systems} /> : null}
      {flags.enableExplorations ? <ExplorationsSection data={zones.explorations} /> : null}
      {flags.enableMentalModels ? <MentalModelsSection data={zones.mental_models} /> : null}
      {flags.enableSignalsEngine ? <SignalsEngineSection /> : null}
      {flags.enableNotesFromSystem ? <NotesFromSystemSection /> : null}
      {flags.enableOpenThreads ? <OpenThreadsSection data={zones.open_threads} /> : null}
    </>
  );
}
