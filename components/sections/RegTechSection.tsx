'use client';

import { useState, useEffect } from 'react';
import { Section } from '@/components/Section';
import { Card } from '@/components/Card';
import { type Article } from '@/lib/db/types';
import { cn } from '@/lib/cn';

function ShieldIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function formatDate(date: Date | string | null | undefined) {
  if (!date) return '';
  try {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export function RegTechSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeRegion, setActiveRegion] = useState<'india' | 'global'>('india');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('/api/articles?type=commentary')
      .then(r => r.ok ? r.json() : [])
      .then((data: Article[]) => setArticles(data))
      .catch(() => setArticles([]));
  }, []);

  if (!mounted || articles.length === 0) return null;

  const filtered = articles.filter(a => a.commentaryRegion === activeRegion);

  return (
    <Section
      id="regtech"
      title="RegTech Commentary"
      icon={<ShieldIcon />}
    >
      {/* Region toggle */}
      <div className="mb-6 flex gap-1 rounded-lg border border-border bg-muted p-1 w-fit">
        {(['india', 'global'] as const).map(r => (
          <button
            key={r}
            type="button"
            onClick={() => setActiveRegion(r)}
            className={cn(
              'rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
              activeRegion === r
                ? 'bg-accent text-white'
                : 'text-foreground/60 hover:text-foreground'
            )}
          >
            {r === 'india' ? 'India' : 'Global'}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-foreground/40">
          No {activeRegion} RegTech commentary yet.
        </div>
      ) : (
        <div className="space-y-4 max-w-3xl">
          {filtered.map(article => (
            <Card key={article.publicId}>
              <div className="flex items-start gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-xs font-medium',
                        article.commentaryRegion === 'india'
                          ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
                          : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      )}
                    >
                      {article.commentaryRegion === 'india' ? 'India' : 'Global'}
                    </span>
                    {formatDate(article.createdAt) && (
                      <span className="text-xs text-foreground/40">
                        {formatDate(article.createdAt)}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1.5 font-semibold leading-snug">{article.title}</h3>
                  {article.summary && (
                    <p className="mt-1.5 text-sm text-foreground/65">{article.summary}</p>
                  )}
                </div>
                <a
                  href={`/writing/${article.slug}`}
                  className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground/70 transition-colors hover:text-foreground hover:border-foreground/40"
                >
                  Read →
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Section>
  );
}
