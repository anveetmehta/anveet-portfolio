'use client';

import { useState, useEffect, useCallback, type FormEvent } from 'react';
import { type Idea } from '@/lib/db/types';
import {
  fetchAllIdeas,
  createIdea,
  updateIdea,
  deleteIdea,
  generateFromIdea,
} from '@/lib/admin-ideas-api';
import { createArticle } from '@/lib/admin-api';
import { IdeaList } from './IdeaList';
import { IdeaEditor } from './IdeaEditor';

export function IdeasTab() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [genError, setGenError] = useState('');

  // Quick capture state
  const [quickTitle, setQuickTitle] = useState('');
  const [quickPlatform, setQuickPlatform] = useState('all');
  const [quickTrending, setQuickTrending] = useState(false);
  const [capturing, setCapturing] = useState(false);

  const loadIdeas = useCallback(async () => {
    try {
      setError('');
      const data = await fetchAllIdeas();
      setIdeas(data);
    } catch (err) {
      setError('Failed to load ideas. Check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadIdeas(); }, [loadIdeas]);

  const editingIdea =
    editingId && editingId !== '__new__'
      ? ideas.find(i => i.publicId === editingId) ?? null
      : null;

  // Quick capture
  async function handleQuickCapture(e: FormEvent) {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    setCapturing(true);
    try {
      const created = await createIdea({
        title: quickTitle.trim(),
        platform: quickPlatform as Idea['platform'],
        isTrending: quickTrending,
        priority: quickTrending ? 3 : 2,
        status: 'captured',
      });
      setIdeas(prev => [created, ...prev]);
      setQuickTitle('');
      setQuickTrending(false);
    } catch { /* silent */ } finally {
      setCapturing(false);
    }
  }

  // Save (create or update)
  async function handleSave(data: Partial<Idea>) {
    if (editingId === '__new__') {
      const created = await createIdea(data);
      setIdeas(prev => [created, ...prev]);
    } else if (editingId) {
      const updated = await updateIdea(editingId, data);
      setIdeas(prev => prev.map(i => i.publicId === editingId ? updated : i));
    }
    setEditingId(null);
  }

  // Delete
  async function handleDelete(idea: Idea) {
    await deleteIdea(idea.publicId);
    setIdeas(prev => prev.filter(i => i.publicId !== idea.publicId));
    if (editingId === idea.publicId) setEditingId(null);
  }

  // Prioritize
  async function handlePrioritize(idea: Idea) {
    const updated = await updateIdea(idea.publicId, { status: 'prioritized' });
    setIdeas(prev => prev.map(i => i.publicId === idea.publicId ? updated : i));
  }

  // Archive
  async function handleArchive(idea: Idea) {
    const updated = await updateIdea(idea.publicId, { status: 'archived' });
    setIdeas(prev => prev.map(i => i.publicId === idea.publicId ? updated : i));
  }

  // AI Generate
  async function handleGenerate(idea: Idea) {
    setGenError('');
    setGeneratingId(idea.publicId);
    // Optimistically show generating state
    setIdeas(prev => prev.map(i => i.publicId === idea.publicId ? { ...i, status: 'generating' } : i));
    try {
      await generateFromIdea(idea.publicId);
      // Reload to get fresh state for both idea and new article
      await loadIdeas();
    } catch (err) {
      setGenError(err instanceof Error ? err.message : 'Generation failed. Try again.');
      // Revert status
      setIdeas(prev => prev.map(i => i.publicId === idea.publicId ? { ...i, status: 'prioritized' } : i));
    } finally {
      setGeneratingId(null);
    }
  }

  // Write manually — creates a blank article linked to this idea
  async function handleWriteManually(idea: Idea) {
    await createArticle({
      title: idea.title,
      slug: '',
      summary: '',
      content: '',
      tags: [],
      prerequisites: [],
      checks: [],
      status: 'draft',
      platform: idea.platform === 'all' ? 'blog' : idea.platform,
      contentPillar: idea.contentPillar ?? undefined,
      sourceIdeaId: idea.publicId,
    } as Parameters<typeof createArticle>[0]);
    // Mark idea as generated
    const updated = await updateIdea(idea.publicId, { status: 'generated' });
    setIdeas(prev => prev.map(i => i.publicId === idea.publicId ? updated : i));
  }

  if (loading) {
    return <div className="py-12 text-center text-foreground/50">Loading ideas…</div>;
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-red-500">{error}</p>
        <button
          type="button"
          onClick={() => { setLoading(true); loadIdeas(); }}
          className="mt-4 rounded-lg border border-border px-4 py-2 text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  if (editingId !== null) {
    return (
      <IdeaEditor
        idea={editingIdea}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
        onDelete={editingIdea ? () => handleDelete(editingIdea) : undefined}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Capture bar */}
      <form
        onSubmit={handleQuickCapture}
        className="rounded-2xl border border-border bg-card p-4"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground/40">
          Quick Capture
        </p>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            value={quickTitle}
            onChange={e => setQuickTitle(e.target.value)}
            placeholder="What's the idea? Type and hit Capture →"
            className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <select
            value={quickPlatform}
            onChange={e => setQuickPlatform(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            <option value="linkedin">LinkedIn</option>
            <option value="medium">Medium</option>
            <option value="blog">Blog</option>
          </select>
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs">
            <input
              type="checkbox"
              checked={quickTrending}
              onChange={e => setQuickTrending(e.target.checked)}
              className="accent-accent"
            />
            <span className="text-yellow-500">⚡</span> Trending
          </label>
          <button
            type="submit"
            disabled={capturing || !quickTitle.trim()}
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
          >
            {capturing ? 'Capturing…' : 'Capture'}
          </button>
        </div>
      </form>

      {/* Generation error */}
      {genError && (
        <div className="rounded-lg border border-red-400/30 bg-red-500/5 p-3 text-sm text-red-500">
          {genError}
        </div>
      )}

      {/* Ideas list */}
      <IdeaList
        ideas={ideas}
        generatingId={generatingId}
        onEdit={idea => setEditingId(idea.publicId)}
        onPrioritize={handlePrioritize}
        onGenerate={handleGenerate}
        onWriteManually={handleWriteManually}
        onArchive={handleArchive}
        onDelete={handleDelete}
        onNew={() => setEditingId('__new__')}
      />
    </div>
  );
}
