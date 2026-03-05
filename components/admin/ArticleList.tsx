'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/cn';
import { type Article } from '@/lib/db/types';
import { type PostStatus } from '@/lib/admin-posts';
import { StatusBadge } from './StatusBadge';
import { PlatformBadge } from './PlatformBadge';

type FilterTab = 'all' | 'draft' | 'review' | 'published' | 'archived';

const PILLAR_LABELS: Record<string, string> = {
  'systems-thinking': 'Systems',
  'product-execution': 'Product',
  'fintech-risk': 'Fintech',
  'ai-building': 'AI',
  'career-craft': 'Career',
};

type ArticleListProps = {
  articles: Article[];
  onNew: () => void;
  onEdit: (publicId: string) => void;
  onDelete: (publicId: string) => void;
  onStatusChange: (publicId: string, status: PostStatus | 'archived') => void;
};

export function ArticleList({ articles, onNew, onEdit, onDelete, onStatusChange }: ArticleListProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const sorted = useMemo(
    () => [...articles].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [articles]
  );

  const FILTER_TABS: FilterTab[] = ['all', 'draft', 'review', 'published', 'archived'];

  const counts: Record<FilterTab, number> = {
    all: sorted.filter(a => a.status !== 'archived').length,
    draft: sorted.filter(a => a.status === 'draft').length,
    review: sorted.filter(a => a.status === 'review').length,
    published: sorted.filter(a => a.status === 'published').length,
    archived: sorted.filter(a => a.status === 'archived').length,
  };

  const filtered =
    activeFilter === 'all'
      ? sorted.filter(a => a.status !== 'archived')
      : sorted.filter(a => a.status === activeFilter);

  const btnClass = 'rounded-lg border border-border px-3 py-1 text-xs transition-colors hover:bg-muted';

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Articles</h2>
          <p className="mt-0.5 text-sm text-foreground/50">
            {articles.filter(a => a.status === 'published').length} published · {articles.length} total
          </p>
        </div>
        <button type="button" onClick={onNew} className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background">
          + New Article
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 rounded-xl border border-border bg-muted p-1 text-xs">
        {FILTER_TABS.map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveFilter(tab)}
            className={cn(
              'flex-1 rounded-lg px-3 py-1.5 font-medium transition-colors capitalize',
              activeFilter === tab ? 'bg-card text-foreground shadow-sm' : 'text-foreground/50 hover:text-foreground'
            )}
          >
            {tab}{counts[tab] > 0 ? ` (${counts[tab]})` : ''}
          </button>
        ))}
      </div>

      {/* Articles */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-foreground/40">
            {activeFilter === 'all' ? 'No articles yet. Create your first one.' : `No ${activeFilter} articles.`}
          </div>
        ) : (
          filtered.map(article => {
            const status = article.status as PostStatus;
            return (
              <article key={article.publicId} className="rounded-2xl border border-border bg-card p-4 transition-colors hover:border-accent/30">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold line-clamp-2">{article.title}</h3>
                      {article.status === 'published' && (
                        <a
                          href={`/writing/${article.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-xs text-accent hover:underline"
                        >
                          ↗ View
                        </a>
                      )}
                    </div>
                    {article.summary && (
                      <p className="mt-1 text-sm text-foreground/60 line-clamp-2">{article.summary}</p>
                    )}
                    {(article.tags as string[]).length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {(article.tags as string[]).map(tag => (
                          <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-xs text-foreground/50">{tag}</span>
                        ))}
                      </div>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <StatusBadge status={status} />
                      <PlatformBadge platform={(article.platform ?? 'blog') as 'linkedin' | 'medium' | 'blog' | 'all'} />
                      {article.contentPillar && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-foreground/50">
                          {PILLAR_LABELS[article.contentPillar] ?? article.contentPillar}
                        </span>
                      )}
                      {article.readingTimeMinutes && (
                        <span className="text-xs text-foreground/40">{article.readingTimeMinutes} min read</span>
                      )}
                      {article.sourceIdeaId && (
                        <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">AI generated</span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-foreground/40">
                      {new Date(article.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-3">
                  <button type="button" onClick={() => onEdit(article.publicId)} className={btnClass}>Edit</button>
                  {status !== 'published' && status !== 'archived' && (
                    <button type="button" onClick={() => onStatusChange(article.publicId, 'published')} className={btnClass}>Publish</button>
                  )}
                  {status === 'published' && (
                    <button type="button" onClick={() => onStatusChange(article.publicId, 'draft')} className={btnClass}>Unpublish</button>
                  )}
                  {status === 'draft' && (
                    <button type="button" onClick={() => onStatusChange(article.publicId, 'review')} className={btnClass}>Review</button>
                  )}
                  {status !== 'archived' && (
                    <button type="button" onClick={() => onStatusChange(article.publicId, 'archived')} className={cn(btnClass, 'text-foreground/40')}>Archive</button>
                  )}
                  {status === 'archived' && (
                    <button type="button" onClick={() => onStatusChange(article.publicId, 'draft')} className={btnClass}>Restore</button>
                  )}
                  <div className="ml-auto">
                    {confirmDeleteId === article.publicId ? (
                      <div className="flex gap-2">
                        <button type="button" onClick={() => setConfirmDeleteId(null)} className="text-xs text-foreground/40 hover:text-foreground">Cancel</button>
                        <button
                          type="button"
                          onClick={() => { setConfirmDeleteId(null); onDelete(article.publicId); }}
                          className="text-xs text-red-500 hover:text-red-600"
                        >
                          Confirm delete
                        </button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => setConfirmDeleteId(article.publicId)} className="text-xs text-foreground/30 hover:text-red-400">Delete</button>
                    )}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
