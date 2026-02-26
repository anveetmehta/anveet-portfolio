'use client';

import { useState, useMemo } from 'react';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { featureFlagsStorageKey, defaultFeatureFlags } from '@/lib/app-config';
import {
  createId,
  generateDraft,
  runChecklist,
  slugify,
  wordCount,
  type AdminPost,
  type PostStatus,
} from '@/lib/admin-posts';
import { StatusBadge } from './StatusBadge';

const defaultPrerequisites = [
  'clear problem statement',
  'practical framework',
  'measurable outcome',
  'explicit call to action',
];

type ArticleEditorProps = {
  post: AdminPost | null;
  onSave: (post: AdminPost) => void;
  onCancel: () => void;
  onDelete?: () => void;
};

export function ArticleEditor({ post, onSave, onCancel, onDelete }: ArticleEditorProps) {
  const { value: flags } = useLocalStorageState(featureFlagsStorageKey, defaultFeatureFlags);

  const [title, setTitle] = useState(post?.title ?? '');
  const [slug, setSlug] = useState(post?.slug ?? '');
  const [summary, setSummary] = useState(post?.summary ?? '');
  const [tagsInput, setTagsInput] = useState(post?.tags?.join(', ') ?? '');
  const [content, setContent] = useState(post?.content ?? '');
  const [prerequisitesText, setPrerequisitesText] = useState(
    post?.prerequisites?.join('\n') ?? defaultPrerequisites.join('\n')
  );
  const [seedIdea, setSeedIdea] = useState('');
  const [checks, setChecks] = useState(post?.checks ?? []);

  const words = useMemo(() => wordCount(content), [content]);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!post) {
      setSlug(slugify(value));
    }
  }

  function handleGenerateDraft() {
    const draft = generateDraft(seedIdea);
    setTitle(draft.title);
    setSummary(draft.summary);
    setContent(draft.content);
    setSlug(slugify(draft.title));
  }

  function handleRunChecklist() {
    const prerequisites = prerequisitesText.split('\n').map((s) => s.trim()).filter(Boolean);
    setChecks(runChecklist(content, title, prerequisites));
  }

  function buildPost(status: PostStatus): AdminPost {
    const now = new Date().toISOString();
    const prerequisites = prerequisitesText.split('\n').map((s) => s.trim()).filter(Boolean);
    return {
      id: post?.id ?? createId(),
      title: title || 'Untitled',
      slug: slug || slugify(title || 'untitled'),
      summary: summary || 'Summary pending',
      content,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      prerequisites,
      checks,
      status,
      createdAt: post?.createdAt ?? now,
      updatedAt: now,
    };
  }

  const inputClass = 'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm';
  const btnBase = 'rounded-lg px-4 py-2 text-sm font-medium transition-colors';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {post ? 'Edit Article' : 'New Article'}
        </h2>
        {post && <StatusBadge status={post.status} />}
      </div>

      {/* AI Draft Generator */}
      {flags.enableAiDraftAssistant && (
        <section className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
            AI Draft Assistant
          </h3>
          <div className="mt-3 flex gap-2">
            <input
              value={seedIdea}
              onChange={(e) => setSeedIdea(e.target.value)}
              className={inputClass}
              placeholder="Seed idea (e.g. How to align product and execution teams)"
            />
            <button
              type="button"
              onClick={handleGenerateDraft}
              className={`${btnBase} shrink-0 bg-foreground text-background`}
            >
              Generate
            </button>
          </div>
        </section>
      )}

      {/* Editor Fields */}
      <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-foreground/60">Title</label>
          <input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className={inputClass}
            placeholder="Article title"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-foreground/60">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className={inputClass}
            placeholder="url-friendly-slug"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-foreground/60">Summary</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className={`${inputClass} min-h-20`}
            placeholder="Brief summary of the article"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-foreground/60">
            Tags (comma-separated)
          </label>
          <input
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className={inputClass}
            placeholder="product, strategy, execution"
          />
          {tagsInput && (
            <div className="mt-2 flex flex-wrap gap-2">
              {tagsInput.split(',').map((t) => t.trim()).filter(Boolean).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-foreground/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="text-xs font-medium text-foreground/60">Content (Markdown)</label>
            <span className="text-xs text-foreground/50">{words} words</span>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`${inputClass} min-h-64 font-mono text-xs leading-relaxed`}
            placeholder="Write your article content in markdown..."
          />
        </div>
      </section>

      {/* Prerequisites & Checklist */}
      {flags.enableChecklist && (
        <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
            Prerequisites Checklist
          </h3>
          <textarea
            value={prerequisitesText}
            onChange={(e) => setPrerequisitesText(e.target.value)}
            className={`${inputClass} min-h-28`}
            placeholder="One prerequisite per line"
          />
          <button
            type="button"
            onClick={handleRunChecklist}
            className={`${btnBase} border border-border`}
          >
            Run checklist
          </button>
          {checks.length > 0 && (
            <ul className="space-y-1 text-sm">
              {checks.map((check) => (
                <li key={check.item}>
                  {check.passed ? '✅' : '⚠️'} <strong>{check.item}:</strong> {check.note}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onSave(buildPost(post?.status ?? 'draft'))}
          className={`${btnBase} border border-border`}
        >
          Save Draft
        </button>
        <button
          type="button"
          onClick={() => onSave(buildPost('review'))}
          className={`${btnBase} border border-accent text-accent`}
        >
          Send to Review
        </button>
        <button
          type="button"
          onClick={() => onSave(buildPost('published'))}
          className={`${btnBase} bg-foreground text-background`}
        >
          Publish
        </button>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className={`${btnBase} text-red-500 hover:bg-red-500/10`}
          >
            Delete
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          className={`${btnBase} text-foreground/60 hover:text-foreground`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
