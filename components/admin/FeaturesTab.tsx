'use client';

import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import {
  defaultFeatureFlags,
  featureFlagLabels,
  featureFlagsStorageKey,
  type FeatureFlagKey,
} from '@/lib/app-config';
import { ToggleSwitch } from './ToggleSwitch';

export function FeaturesTab() {
  const { value: storedFlags, setValue: setFlags } = useLocalStorageState(
    featureFlagsStorageKey,
    defaultFeatureFlags
  );

  // Merge stored flags with defaults so new flags always appear
  const flags = { ...defaultFeatureFlags, ...storedFlags };

  function toggleFlag(flag: FeatureFlagKey) {
    const updated = { ...flags, [flag]: !flags[flag] };
    setFlags(updated);
  }

  // Use defaultFeatureFlags keys to guarantee stable, complete ordering
  const allFlagKeys = Object.keys(defaultFeatureFlags) as FeatureFlagKey[];

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-xl font-semibold">Feature Toggles</h2>
      <p className="mt-1 text-sm text-foreground/70">
        Turn features on or off instantly.
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {allFlagKeys.map((flag) => (
          <label
            key={flag}
            className="flex items-center justify-between rounded-xl border border-border p-3"
          >
            <span className="text-sm">{featureFlagLabels[flag]}</span>
            <ToggleSwitch checked={flags[flag]} onChange={() => toggleFlag(flag)} />
          </label>
        ))}
      </div>
    </section>
  );
}
