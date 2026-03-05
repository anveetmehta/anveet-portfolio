'use client';

import { useState, useCallback } from 'react';
import { type Idea } from '@/lib/db/types';
import { type SuggestedIdea } from '@/lib/ai/suggest-ideas';
import { PlatformBadge } from './PlatformBadge';

const PILLAR_LABELS: Record<string, string> = {
  'systems-thinking': 'Systems Thinking',
  'product-execution': 'Product Execution',
  'fintech-risk': 'Fintech & Risk',
  'ai-building': 'AI & Building',
  'career-craft': 'Career Craft',
};

type SuggestedIdeasProps = {
  onCapture: (idea: Partial<Idea>) => Promise<void>;
  existingTitles: string[];
};

export function SuggestedIdeas({ onCapture, existingTitles }: SuggestedIdeasProps) {
  const [suggestions, setSuggestions] = useState<SuggestedIdea[]>([]);
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [capturing, setCapturing] = useState<number | null>(null);

  const fetchSuggestions = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const password =
        typeof window !== 'undefined'
          ? sessionStorage.getItem('anveet-admin-password') || ''
          : '';
      const res = await fetch('/api/ideas/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({ existingTitles }),
      });
      if (!res.ok) throw new Error('Failed to fetch suggestions');
      const data = await res.json();
      setSuggestions(data.ideas ?? []);
      setDismissed(new Set());
      setLastRefreshed(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch suggestions');
    } finally {
      setLoading(false);
    }
  }, [existingTitles]);

  async function handleCapture(suggestion: SuggestedIdea, index: number) {
    setCapturing(index);
    try {
      await onCapture({
        title: suggestion.title,
        description: suggestion.description,
        angle: suggestion.angle,
        contentPillar: suggestion.contentPillar,
        sourceInspiration: suggestion.sourceInspiration,
        isTrending: true,
        priority: 3,
        status: 'captured',
        platform: 'all',
      });
      setDismissed(prev => new Set([...prev, index]));
    } finally {
      setCapturing(null);
    }
  }

  const visibleSuggestions = suggestions.filter((_, i) => !dismissed.has(i));

  function getRefreshedLabel() {
    if (!lastRefreshed) return '';
    const mins = Math.floor((Date.now() - lastRefreshed.getTime()) / 60000);
    if (mins < 1) return 'just now';
    return `${mins} min ago`;
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Trending Ideas</h3>
          {lastRefreshed && (
            <p className="mt-0.5 text-xs text-foreground/40">
              Last refreshed: {getRefreshedLabel()}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={fetchSuggestions}
          disabled={loading}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted disabled:opacity-50"
        >
          {loading ? (
            <span className="animate-spin">⟳</span>
          ) : (
            <span className="text-yellow-500">⚡</span>
          )}
          {loading ? 'Scanning…' : 'Find Trending Ideas'}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-xs text-red-500">{error}</p>
      )}

      {loading && (
        <p className="mt-4 text-center text-xs text-foreground/40 animate-pulse">
          Scanning news & generating ideas…
        </p>
      )}

      {!loading && visibleSuggestions.length > 0 && (
        <div className="mt-4 space-y-3">
          {visibleSuggestions.map((suggestion, visIdx) => {
            const originalIndex = suggestions.indexOf(suggestion);
            return (
              <div
                key={originalIndex}
                className="rounded-xl border border-border/60 bg-background p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-yellow-500 text-xs">⚡</span>
                      <span className="text-sm font-medium">{suggestion.title}</span>
                    </div>
                    <p className="mt-1 text-xs text-foreground/50 line-clamp-2">
                      {suggestion.description}
                    </p>
                    {suggestion.angle && (
                      <p className="mt-1 text-xs text-accent/70 italic">↳ {suggestion.angle}</p>
                    )}
                    {suggestion.sourceInspiration && (
                      <p className="mt-1 text-xs text-foreground/30 italic">
                        Source: {suggestion.sourceInspiration}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-foreground/50">
                        {PILLAR_LABELS[suggestion.contentPillar] ?? suggestion.contentPillar}
                      </span>
                      <PlatformBadge platform="all" />
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3 border-t border-border/50 pt-2">
                  <button
                    type="button"
                    disabled={capturing === originalIndex}
                    onClick={() => handleCapture(suggestion, originalIndex)}
                    className="rounded-lg bg-foreground px-3 py-1 text-xs font-medium text-background disabled:opacity-50"
                  >
                    {capturing === originalIndex ? 'Capturing…' : 'Capture'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDismissed(prev => new Set([...prev, originalIndex]))}
                    className="text-xs text-foreground/30 hover:text-foreground/60"
                  >
                    ✕ Dismiss
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && suggestions.length > 0 && visibleSuggestions.length === 0 && (
        <p className="mt-4 text-center text-xs text-foreground/40">
          All suggestions captured or dismissed. Click &quot;Find Trending Ideas&quot; to refresh.
        </p>
      )}

      {!loading && suggestions.length === 0 && !error && (
        <p className="mt-4 text-center text-xs text-foreground/40">
          Click &apos;Find Trending Ideas&apos; to discover content opportunities based on trending news.
        </p>
      )}
    </div>
  );
}
