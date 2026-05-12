import { db } from '@/lib/db';
import { homepageZones } from '@/lib/db/schema';
import {
  heroContent,
  signals,
  systemsLayerContent,
  shapedSystems,
  explorations,
  mentalModels,
  openThreadsContent,
  type HeroContent,
  type Signal,
  type SystemsLayerContent,
  type ShapedSystem,
  type Exploration,
  type MentalModel,
  type OpenThreadsContent,
} from '@/content/content';

export type ZoneMap = {
  hero: HeroContent;
  signals: Signal[];
  systems_layer: SystemsLayerContent;
  shaped_systems: ShapedSystem[];
  explorations: Exploration[];
  mental_models: MentalModel[];
  open_threads: OpenThreadsContent;
};

const DEFAULTS: ZoneMap = {
  hero: heroContent,
  signals,
  systems_layer: systemsLayerContent,
  shaped_systems: shapedSystems,
  explorations,
  mental_models: mentalModels,
  open_threads: openThreadsContent,
};

export async function getAllZones(): Promise<ZoneMap> {
  try {
    const rows = await db.select().from(homepageZones);
    const map = { ...DEFAULTS } as ZoneMap;
    for (const row of rows) {
      if (row.key in map) {
        (map as Record<string, unknown>)[row.key] = row.data;
      }
    }
    return map;
  } catch {
    return DEFAULTS;
  }
}
