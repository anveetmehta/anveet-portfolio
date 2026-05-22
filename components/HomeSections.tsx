'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { RightNowSection } from '@/components/sections/RightNowSection';
import { SignalsStrip } from '@/components/sections/SignalsStrip';
import { SystemsLayerSection } from '@/components/sections/SystemsLayerSection';
import { SelectedWorkSection } from '@/components/sections/SelectedWorkSection';
import { ShapedSystemsSection } from '@/components/sections/ShapedSystemsSection';
import { ExplorationsSection } from '@/components/sections/ExplorationsSection';
import { WorkingPrinciplesSection } from '@/components/sections/WorkingPrinciplesSection';
import { NotesFromSystemSection } from '@/components/sections/NotesFromSystemSection';
import { OpenThreadsSection } from '@/components/sections/OpenThreadsSection';
import { SignalsEngineSection } from '@/components/sections/SignalsEngineSection';
import { ThinkingStrip } from '@/components/ThinkingStrip';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { defaultFeatureFlags, featureFlagsStorageKey } from '@/lib/app-config';
import type { ZoneMap } from '@/lib/zones';

type Props = { zones: ZoneMap };

export function HomeSections({ zones }: Props) {
  const { value: storedFlags } = useLocalStorageState(featureFlagsStorageKey, defaultFeatureFlags);
  const flags = { ...defaultFeatureFlags, ...storedFlags };

  return (
    <>
      <HeroSection data={zones.hero} />
      <RightNowSection />
      <ThinkingStrip />
      {flags.enableSignalsStrip    ? <SignalsStrip data={zones.signals} />              : null}
      {flags.enableSystemsLayer    ? <SystemsLayerSection data={zones.systems_layer} /> : null}
      <SelectedWorkSection />
      {flags.enableShapedSystems   ? <ShapedSystemsSection data={zones.shaped_systems} /> : null}
      {flags.enableExplorations    ? <ExplorationsSection  data={zones.explorations} />   : null}
      <WorkingPrinciplesSection />
      {flags.enableSignalsEngine   ? <SignalsEngineSection /> : null}
      {flags.enableNotesFromSystem ? <NotesFromSystemSection /> : null}
      {flags.enableOpenThreads     ? <OpenThreadsSection data={zones.open_threads} /> : null}
    </>
  );
}
