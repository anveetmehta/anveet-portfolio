'use client';

import { useState } from 'react';
import { type RegTechNewsItem } from '@/lib/ai/fetch-regtech-news';
import { fetchRegtechNews, draftCommentary } from '@/lib/admin-regtech-api';
import { Toast, type ToastState } from './Toast';
import { cn } from '@/lib/cn';

type RegtechTabProps = {
  onSwitchToArticles: () => void;
};

export function RegtechTab({ onSwitchToArticles }: RegtechTabProps) {
  const [region, setRegion] = useState<'india' | 'global'>('india');
  const [newsItems, setNewsItems] = useState<RegTechNewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [draftingId, setDraftingId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>(null);

  async function handleFetchNews() {
    setLoading(true);
    try {
      const items = await fetchRegtechNews(region);
      setNewsItems(items);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to fetch news', type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function handleDraftCommentary(item: RegTechNewsItem, id: string) {
    setDraftingId(id);
    try {
      await draftCommentary(item, region);
      setToast({ message: 'Commentary drafted — editing in Articles tab', type: 'success' });
      setTimeout(() => onSwitchToArticles(), 1200);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to draft commentary', type: 'error' });
    } finally {
      setDraftingId(null);
    }
  }

  function formatDate(dateStr: string) {
    try {
      return new Date(dateStr).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  }

  return (
    <>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="text-lg font-semibold">RegTech News</h2>

          {/* Region toggle */}
          <div className="flex gap-1 rounded-lg border border-border bg-muted p-1">
            {(['india', 'global'] as const).map(r => (
              <button
                key={r}
                type="button"
                onClick={() => { setRegion(r); setNewsItems([]); }}
                className={cn(
                  'rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
                  region === r
                    ? 'bg-accent text-white'
                    : 'text-foreground/60 hover:text-foreground'
                )}
              >
                {r === 'india' ? 'India' : 'Global'}
              </button>
            ))}
          </div>

          {/* Fetch button */}
          <button
            type="button"
            onClick={handleFetchNews}
            disabled={loading}
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
          >
            {loading ? 'Fetching…' : '⚡ Fetch Latest News'}
          </button>
        </div>

        {/* Loading spinner */}
        {loading && (
          <div className="py-12 text-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-border border-t-accent" />
            <p className="mt-3 text-sm text-foreground/50">Fetching {region} RegTech news…</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && newsItems.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-foreground/40">
            Fetch the latest {region} RegTech news to get started.
          </div>
        )}

        {/* News cards */}
        {!loading && newsItems.length > 0 && (
          <div className="space-y-3">
            {newsItems.map((item, i) => {
              const id = `${item.title}-${i}`;
              const isDrafting = draftingId === id;

              return (
                <div
                  key={id}
                  className="rounded-2xl border border-border bg-card p-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-2">
                        <p className="font-semibold leading-snug">{item.title}</p>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-0.5 shrink-0 text-foreground/30 hover:text-foreground/60"
                            aria-label="Open source"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </a>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-foreground/50">
                        {item.source}
                        {item.pubDate && <span> · {formatDate(item.pubDate)}</span>}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDraftCommentary(item, id)}
                      disabled={isDrafting || draftingId !== null}
                      className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted disabled:opacity-50"
                    >
                      {isDrafting ? 'Drafting…' : 'Draft Commentary →'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </>
  );
}
