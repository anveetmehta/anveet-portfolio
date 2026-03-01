'use client';

import { useMemo } from 'react';
import { type Article } from '@/lib/db/types';
import { type PostStatus } from '@/lib/admin-posts';
import { StatusBadge } from './StatusBadge';

type ArticleListProps = {
  articles: Article[];
  onNew: () => void;
  onEdit: (publicId: string) => void;
  onDelete: (publicId: string) => void;
  onStatusChange: (publicId: string, status: PostStatus) => void;
};

export function ArticleList({ articles, onNew, onEdit, onDelete, onStatusChange }: ArticleListProps) {
  const sorted = useMemo(
    () => [...articles].sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      return bTime - aTime;
    }),
    [articles]
  );

  const btnClass = 'rounded-lg border border-border px-3 py-1 text-xs transition-colors hover:bg-muted';

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Articles</h2>
          <p className="mt-1 text-sm text-foreground/70">
            {articles.length} article{articles.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <button
          type="button"
          onClick={onNew}
          className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background"
        >
          + New Article
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {sorted.length === 0 ? (
          <p className="py-8 text-center text-sm text-foreground/50">
            No articles yet. Create your first one.
          </p>
        ) : (
          sorted.map((article) => {
            const status = article.status as PostStatus;
            return (
              <article
                key={article.publicId}
                className="rounded-xl border border-border p-4 transition-colors hover:bg-muted/30"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold">{article.title}</h3>
                    <p className="mt-1 text-sm text-foreground/70 line-clamp-2">{article.summary}</p>
                    {article.tags && (article.tags as string[]).length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {(article.tags as string[]).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-muted px-2 py-0.5 text-xs text-foreground/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="mt-2 text-xs text-foreground/50">
                      Created {new Date(article.createdAt).toLocaleDateString()}
                      {article.updatedAt &&
                        new Date(article.updatedAt).getTime() !== new Date(article.createdAt).getTime() && (
                          <> · Updated {new Date(article.updatedAt).toLocaleDateString()}</>
                        )}
                    </p>
                  </div>
                  <StatusBadge status={status} />
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" onClick={() => onEdit(article.publicId)} className={btnClass}>
                    Edit
                  </button>
                  {status !== 'published' && (
                    <button
                      type="button"
                      onClick={() => onStatusChange(article.publicId, 'published')}
                      className={btnClass}
                    >
                      Publish
                    </button>
                  )}
                  {status !== 'review' && status !== 'published' && (
                    <button
                      type="button"
                      onClick={() => onStatusChange(article.publicId, 'review')}
                      className={btnClass}
                    >
                      Send to Review
                    </button>
                  )}
                  {status === 'published' && (
                    <button
                      type="button"
                      onClick={() => onStatusChange(article.publicId, 'draft')}
                      className={btnClass}
                    >
                      Unpublish
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onDelete(article.publicId)}
                    className="rounded-lg border border-red-500/30 px-3 py-1 text-xs text-red-500 transition-colors hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
