'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/cn';

const ZONE_KEYS = [
  { key: 'hero', label: 'Entry Point (Hero)' },
  { key: 'signals', label: 'Signals Strip' },
  { key: 'systems_layer', label: 'The System' },
  { key: 'shaped_systems', label: 'Systems I\'ve Helped Shape' },
  { key: 'explorations', label: 'Active Explorations' },
  { key: 'mental_models', label: 'Mental Models' },
  { key: 'open_threads', label: 'Open Threads' },
];

function useAdminPassword() {
  if (typeof window === 'undefined') return '';
  return sessionStorage.getItem('anveet-admin-password') ?? '';
}

export function ZonesTab() {
  const [activeKey, setActiveKey] = useState('hero');
  const [zoneData, setZoneData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const pw = useAdminPassword();

  useEffect(() => {
    setLoading(true);
    fetch('/api/zones')
      .then((r) => r.json())
      .then((map: Record<string, unknown>) => {
        const formatted: Record<string, string> = {};
        for (const [k, v] of Object.entries(map)) {
          formatted[k] = JSON.stringify(v, null, 2);
        }
        setZoneData(formatted);
      })
      .catch(() => setError('Failed to load zones'))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      const parsed = JSON.parse(zoneData[activeKey] ?? '{}');
      const res = await fetch('/api/zones', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${pw}`,
        },
        body: JSON.stringify({ key: activeKey, data: parsed }),
      });
      if (!res.ok) throw new Error('Save failed');
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setError(e instanceof SyntaxError ? 'Invalid JSON — fix before saving' : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  const currentZone = ZONE_KEYS.find((z) => z.key === activeKey);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-foreground/80">Homepage Content Zones</p>
        <p className="mt-1 text-xs text-foreground/40">
          Edit any zone and save — the homepage updates within 60 seconds without a deploy.
        </p>
      </div>

      {/* Zone picker */}
      <div className="flex flex-wrap gap-2">
        {ZONE_KEYS.map((z) => (
          <button
            key={z.key}
            type="button"
            onClick={() => { setActiveKey(z.key); setSaved(false); setError(''); }}
            className={cn(
              'rounded-md border px-3 py-1.5 text-xs font-medium transition-colors',
              activeKey === z.key
                ? 'border-foreground/30 bg-foreground/8 text-foreground'
                : 'border-border/50 text-foreground/50 hover:text-foreground/80'
            )}
          >
            {z.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="h-64 animate-pulse rounded border border-border/40 bg-muted/40" />
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-foreground/50">{currentZone?.label}</p>
            <div className="flex items-center gap-2">
              {error && <p className="text-xs text-red-400">{error}</p>}
              {saved && <p className="text-xs text-emerald-400">Saved ✓</p>}
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="rounded-md bg-foreground/10 px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/15 disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Save Zone'}
              </button>
            </div>
          </div>

          <textarea
            value={zoneData[activeKey] ?? ''}
            onChange={(e) => {
              setZoneData((prev) => ({ ...prev, [activeKey]: e.target.value }));
              setSaved(false);
            }}
            rows={24}
            spellCheck={false}
            className="w-full rounded-md border border-border/50 bg-muted/30 p-4 font-mono text-xs text-foreground/80 focus:border-foreground/30 focus:outline-none"
          />

          <p className="text-xs text-foreground/25">
            Edit JSON directly. Structure must match the zone&apos;s TypeScript type. Reload the homepage after saving to see changes.
          </p>
        </div>
      )}
    </div>
  );
}
