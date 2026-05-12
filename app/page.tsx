import { HomeSections } from '@/components/HomeSections';
import { getAllZones } from '@/lib/zones';

export const revalidate = 60; // ISR: revalidate every 60s, also on-demand via revalidatePath

export default async function HomePage() {
  const zones = await getAllZones();
  return <HomeSections zones={zones} />;
}
