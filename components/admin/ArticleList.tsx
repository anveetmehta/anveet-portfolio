'use client';

import { useMemo } from 'react';
import { type AdminPost, type PostStatus } from '@/lib/admin-posts';
import { StatusBadge } from './StatusBadge';

type ArticleListProps = {
  posts: AdminPost[];
  onNew: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: PostStatus) => void;
};

export function ArticleList({ posts, onNew, onEdit, onDelete, onStatusChange }: ArticleListProps) {
  const sorted = useMemo(
    () => [...posts].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    [posts]
  );

  const btnClass = 'rounded-lg border border-border px-3 py-1 text-xs transition-colors hover:bg-muted';

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Articles</h2>
          <p className="mt-1 text-sm text-foreground/70">
            {posts.length} article{posts.length !== 1 ? 's' : ''} total
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
          sorted.map((post) => (
            <article
              key={post.id}
              className="rounded-xl border border-border p-4 transition-colors hover:bg-muted/30"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="mt-1 text-sm text-foreground/70 line-clamp-2">{post.summary}</p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
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
                    Created {new Date(post.createdAt).toLocaleDateString()}
                    {post.updatedAt && post.updatedAt !== post.createdAt && (
                      <> · Updated {new Date(post.updatedAt).toLocaleDateString()}</>
                    )}
                  </p>
                </div>
                <StatusBadge status={post.status} />
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" onClick={() => onEdit(post.id)} className={btnClass}>
                  Edit
                </button>
                {post.status !== 'published' && (
                  <button
                    type="button"
                    onClick={() => onStatusChange(post.id, 'published')}
                    className={btnClass}
                  >
                    Publish
                  </button>
                )}
                {post.status !== 'review' && post.status !== 'published' && (
                  <button
                    type="button"
                    onClick={() => onStatusChange(post.id, 'review')}
                    className={btnClass}
                  >
                    Send to Review
                  </button>
                )}
                {post.status === 'published' && (
                  <button
                    type="button"
                    onClick={() => onStatusChange(post.id, 'draft')}
                    className={btnClass}
                  >
                    Unpublish
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onDelete(post.id)}
                  className="rounded-lg border border-red-500/30 px-3 py-1 text-xs text-red-500 transition-colors hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
