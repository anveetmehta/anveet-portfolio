'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { type Idea } from '@/lib/db/types';
import { IdeaStatusBadge } from './IdeaStatusBadge';
import { PlatformBadge } from './PlatformBadge';

type FilterTab = 'all' | 'captured' | 'prioritized' | 'generated' | 'archived';

type IdeaListProps = {
  ideas: Idea[];
  generatingId: string | null;
  onEdit: (idea: Idea) => void;
  onPrioritize: (idea: Idea) => Promise<void>;
  onGenerate: (idea: Idea) => Promise<void>;
  onWriteManually: (idea: Idea) => Promise<void>;
  onArchive: (idea: Idea) => Promise<void>;
  onDelete: (idea: Idea) => Promise<void>;
  onNew: () => void;
};

const FILTER_TABS: FilterTab[] = ['all', 'captured', 'prioritized', 'generated', 'archived'];

const PILLAR_LABELS: Record<string, string> = {
  'systems-thinking': 'Systems',
  'product-execution': 'Product',
  'fintech-risk': 'Fintech',
  'ai-building': 'AI',
  'career-craft': 'Career',
};

export function IdeaList({
  ideas,
  generatingId,
  onEdit,
  onPrioritize,
  onGenerate,
  onWriteManually,
  onArchive,
  onDelete,
  onNew,
}: IdeaListProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filtered =
    activeFilter === 'all'
      ? ideas.filter(i => i.status !== 'archived')
      : ideas.filter(i => i.status === activeFilter);

  const counts: Record<FilterTab, number> = {
    all: ideas.filter(i => i.status !== 'archived').length,
    captured: ideas.filter(i => i.status === 'captured').length,
    prioritized: ideas.filter(i => i.status === 'prioritized').length,
    generated: ideas.filter(i => i.status === 'generated').length,
    archived: ideas.filter(i => i.status === 'archived').length,
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Ideas Pipeline</h3>
        <button
          type="button"
          onClick={onNew}
          className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background"
        >
          + New Idea
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
              activeFilter === tab
                ? 'bg-card text-foreground shadow-sm'
                : 'text-foreground/50 hover:text-foreground'
            )}
          >
            {tab}{counts[tab] > 0 ? ` (${counts[tab]})` : ''}
          </button>
        ))}
      </div>

      {/* Ideas list */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-foreground/40">
          {activeFilter === 'all'
            ? 'No ideas yet. Click "+ New Idea" to capture your first one.'
            : `No ${activeFilter} ideas.`}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(idea => {
            const isGenerating = generatingId === idea.publicId || idea.status === 'generating';
            const canGenerate = ['captured', 'prioritized'].includes(idea.status) && !isGenerating;

            return (
              <div
                key={idea.publicId}
                className="rounded-2xl border border-border bg-card p-4 transition-colors hover:border-accent/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    {/* Title row */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {idea.isTrending && (
                        <span className="text-yellow-500" title="Trending">⚡</span>
                      )}
                      <span className="font-medium text-sm">{idea.title}</span>
                    </div>

                    {/* Description */}
                    {idea.description && (
                      <p className="mt-1 text-xs text-foreground/50 line-clamp-2">{idea.description}</p>
                    )}

                    {/* Angle */}
                    {idea.angle && (
                      <p className="mt-1 text-xs text-accent/80 italic">↳ {idea.angle}</p>
                    )}

                    {/* Badges row */}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <IdeaStatusBadge status={idea.status} />
                      <PlatformBadge platform={idea.platform} />
                      {idea.contentPillar && (
                        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-foreground/50">
                          {PILLAR_LABELS[idea.contentPillar] ?? idea.contentPillar}
                        </span>
                      )}
                      {idea.priority === 3 && (
                        <span className="rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-medium text-orange-600 dark:text-orange-400">
                          High priority
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-3">
                  <button
                    type="button"
                    onClick={() => onEdit(idea)}
                    className="text-xs text-foreground/60 hover:text-foreground"
                  >
                    Edit
                  </button>
                  {idea.status === 'captured' && (
                    <button
                      type="button"
                      onClick={() => onPrioritize(idea)}
                      className="text-xs text-accent hover:text-accent/80"
                    >
                      Prioritize
                    </button>
                  )}
                  {canGenerate && (
                    <button
                      type="button"
                      onClick={() => onGenerate(idea)}
                      className="rounded-lg bg-accent px-3 py-1 text-xs font-medium text-background hover:bg-accent/90"
                    >
                      Generate Article
                    </button>
                  )}
                  {isGenerating && idea.publicId !== generatingId && (
                    <span className="text-xs text-yellow-600 dark:text-yellow-400 animate-pulse">
                      Generating…
                    </span>
                  )}
                  {isGenerating && idea.publicId === generatingId && (
                    <span className="rounded-lg bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-600 dark:text-yellow-400 animate-pulse">
                      Generating…
                    </span>
                  )}
                  {canGenerate && (
                    <button
                      type="button"
                      onClick={() => onWriteManually(idea)}
                      className="text-xs text-foreground/60 hover:text-foreground"
                    >
                      Write manually
                    </button>
                  )}
                  {idea.status !== 'archived' && (
                    <button
                      type="button"
                      onClick={() => onArchive(idea)}
                      className="text-xs text-foreground/40 hover:text-foreground/70"
                    >
                      Archive
                    </button>
                  )}
                  <div className="ml-auto">
                    {confirmDeleteId === idea.publicId ? (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="text-xs text-foreground/40 hover:text-foreground"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            setConfirmDeleteId(null);
                            await onDelete(idea);
                          }}
                          className="text-xs text-red-500 hover:text-red-600"
                        >
                          Confirm delete
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(idea.publicId)}
                        className="text-xs text-foreground/30 hover:text-red-400"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
