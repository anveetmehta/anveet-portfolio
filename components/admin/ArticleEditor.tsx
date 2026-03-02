'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';
import { type Article } from '@/lib/db/types';
import { slugify, wordCount, estimateReadingTime, type PostStatus } from '@/lib/admin-posts';
import { runQualityGate, hasPublishingErrors, type QualityCheck } from '@/lib/quality-gate';
import { StatusBadge } from './StatusBadge';
import { PlatformBadge } from './PlatformBadge';

const PLATFORMS = [
  { value: 'blog', label: 'Blog / Website' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'medium', label: 'Medium' },
  { value: 'all', label: 'All Platforms' },
] as const;

const PILLARS = [
  { value: '', label: 'No pillar' },
  { value: 'systems-thinking', label: 'Systems Thinking' },
  { value: 'product-execution', label: 'Product Execution' },
  { value: 'fintech-risk', label: 'Fintech & Risk' },
  { value: 'ai-building', label: 'AI & Building' },
  { value: 'career-craft', label: 'Career Craft' },
] as const;

type SaveData = {
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags: string[];
  prerequisites: string[];
  checks: { item: string; passed: boolean; note: string }[];
  status: PostStatus;
  platform: string;
  contentPillar: string | null;
  metaDescription: string;
  keywords: string[];
  readingTimeMinutes: number;
  linkedinVersion: string;
};

type ArticleEditorProps = {
  article: Article | null;
  onSave: (data: SaveData) => void;
  onCancel: () => void;
  onDelete?: () => void;
};

export function ArticleEditor({ article, onSave, onCancel, onDelete }: ArticleEditorProps) {
  const [title, setTitle] = useState(article?.title ?? '');
  const [slug, setSlug] = useState(article?.slug ?? '');
  const [summary, setSummary] = useState(article?.summary ?? '');
  const [tagsInput, setTagsInput] = useState((article?.tags as string[] | undefined)?.join(', ') ?? '');
  const [content, setContent] = useState(article?.content ?? '');
  const [platform, setPlatform] = useState<string>(article?.platform ?? 'blog');
  const [contentPillar, setContentPillar] = useState<string>(article?.contentPillar ?? '');
  const [metaDescription, setMetaDescription] = useState(article?.metaDescription ?? '');
  const [keywordsInput, setKeywordsInput] = useState(
    (article?.keywords as string[] | undefined)?.join(', ') ?? ''
  );
  const [linkedinVersion, setLinkedinVersion] = useState(article?.linkedinVersion ?? '');
  const [qualityChecks, setQualityChecks] = useState<QualityCheck[]>([]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const words = useMemo(() => wordCount(content), [content]);
  const readingTime = useMemo(() => estimateReadingTime(content), [content]);
  const tags = useMemo(() => tagsInput.split(',').map(t => t.trim()).filter(Boolean), [tagsInput]);
  const keywords = useMemo(() => keywordsInput.split(',').map(k => k.trim()).filter(Boolean), [keywordsInput]);

  // Auto-slug on new article
  function handleTitleChange(value: string) {
    setTitle(value);
    if (!article) setSlug(slugify(value));
  }

  // Debounced quality gate
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (content || title) {
        const checks = runQualityGate({ title, content, summary, metaDescription, keywords, tags, platform });
        setQualityChecks(checks);
      }
    }, 800);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [title, content, summary, metaDescription, keywords, tags, platform]);

  function buildSaveData(status: PostStatus): SaveData {
    return {
      title: title || 'Untitled',
      slug: slug || slugify(title || 'untitled'),
      summary,
      content,
      tags,
      prerequisites: [],
      checks: [],
      status,
      platform,
      contentPillar: contentPillar || null,
      metaDescription,
      keywords,
      readingTimeMinutes: readingTime,
      linkedinVersion,
    };
  }

  const publishBlocked = qualityChecks.length > 0 && hasPublishingErrors(qualityChecks);
  const errors = qualityChecks.filter(c => !c.passed && c.severity === 'error');
  const warnings = qualityChecks.filter(c => !c.passed && c.severity === 'warning');
  const passing = qualityChecks.filter(c => c.passed);

  const inputClass = 'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent';
  const labelClass = 'mb-1 block text-xs font-medium text-foreground/60';
  const btnBase = 'rounded-lg px-4 py-2 text-sm font-medium transition-colors';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{article ? 'Edit Article' : 'New Article'}</h2>
          {article?.sourceIdeaId && (
            <p className="mt-0.5 text-xs text-foreground/40">Generated from idea</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {article && <StatusBadge status={article.status as PostStatus} />}
          <PlatformBadge platform={platform as 'linkedin' | 'medium' | 'blog' | 'all'} />
        </div>
      </div>

      {/* Core fields */}
      <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <div>
          <label className={labelClass}>Title</label>
          <input value={title} onChange={e => handleTitleChange(e.target.value)} className={inputClass} placeholder="Article title" />
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input value={slug} onChange={e => setSlug(e.target.value)} className={inputClass} placeholder="url-friendly-slug" />
        </div>
        <div>
          <label className={labelClass}>Summary</label>
          <textarea value={summary} onChange={e => setSummary(e.target.value)} className={`${inputClass} min-h-[72px]`} placeholder="Brief summary for article cards" />
        </div>
        <div>
          <label className={labelClass}>Tags (comma-separated)</label>
          <input value={tagsInput} onChange={e => setTagsInput(e.target.value)} className={inputClass} placeholder="product, strategy, execution" />
          {tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {tags.map(tag => (
                <span key={tag} className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs text-foreground/60">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Platform + Pillar */}
      <section className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-foreground/40">Platform & Categorisation</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} className={inputClass}>
              {PLATFORMS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Content Pillar</label>
            <select value={contentPillar} onChange={e => setContentPillar(e.target.value)} className={inputClass}>
              {PILLARS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* SEO */}
      <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground/40">SEO</h3>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className={labelClass.replace('mb-1 ', '')}>Meta Description</label>
            <span className={cn('text-xs', metaDescription.length > 160 ? 'text-red-500' : 'text-foreground/40')}>
              {metaDescription.length}/160
            </span>
          </div>
          <textarea
            value={metaDescription}
            onChange={e => setMetaDescription(e.target.value)}
            className={`${inputClass} min-h-[60px] resize-none`}
            placeholder="Short description for search engines (60-160 chars)"
            maxLength={165}
          />
        </div>
        <div>
          <label className={labelClass}>Keywords (comma-separated)</label>
          <input value={keywordsInput} onChange={e => setKeywordsInput(e.target.value)} className={inputClass} placeholder="product management, fintech, systems design" />
        </div>
      </section>

      {/* Content */}
      <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground/40">Content (Markdown)</h3>
          <span className="text-xs text-foreground/40">{words} words · {readingTime} min read</span>
        </div>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className={`${inputClass} min-h-80 font-mono text-xs leading-relaxed`}
          placeholder="Write your article in markdown. Use ## for sections, **bold**, *italic*, > blockquotes..."
        />
      </section>

      {/* LinkedIn version */}
      <section className="rounded-2xl border border-border bg-card p-6 space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground/40">LinkedIn Version</h3>
        <p className="text-xs text-foreground/50">Short-form version for cross-posting. Plain text, no markdown. 300-600 words.</p>
        <textarea
          value={linkedinVersion}
          onChange={e => setLinkedinVersion(e.target.value)}
          className={`${inputClass} min-h-48 text-xs leading-relaxed`}
          placeholder="LinkedIn post — hook line, insight bullets using →, closing question..."
        />
        {linkedinVersion && (
          <p className="text-xs text-foreground/40">{wordCount(linkedinVersion)} words</p>
        )}
      </section>

      {/* Quality Gate */}
      {qualityChecks.length > 0 && (
        <section className="rounded-2xl border border-border bg-card p-6 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground/40">Quality Gate</h3>
          {errors.length > 0 && (
            <div className="space-y-1">
              {errors.map(c => (
                <div key={c.id} className="flex items-start gap-2 text-xs text-red-500">
                  <span className="mt-0.5 shrink-0">✗</span>
                  <span><strong>{c.label}:</strong> {c.note}</span>
                </div>
              ))}
            </div>
          )}
          {warnings.length > 0 && (
            <div className="space-y-1">
              {warnings.map(c => (
                <div key={c.id} className="flex items-start gap-2 text-xs text-yellow-600 dark:text-yellow-400">
                  <span className="mt-0.5 shrink-0">⚠</span>
                  <span><strong>{c.label}:</strong> {c.note}</span>
                </div>
              ))}
            </div>
          )}
          {passing.length > 0 && (
            <div className="space-y-1">
              {passing.map(c => (
                <div key={c.id} className="flex items-start gap-2 text-xs text-green-600 dark:text-green-400">
                  <span className="mt-0.5 shrink-0">✓</span>
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => onSave(buildSaveData('draft'))} className={`${btnBase} border border-border hover:bg-muted`}>
          Save Draft
        </button>
        <button type="button" onClick={() => onSave(buildSaveData('review'))} className={`${btnBase} border border-accent text-accent hover:bg-accent/5`}>
          Send to Review
        </button>
        <button
          type="button"
          onClick={() => onSave(buildSaveData('published'))}
          disabled={publishBlocked}
          title={publishBlocked ? 'Fix errors before publishing' : undefined}
          className={cn(`${btnBase} bg-foreground text-background`, publishBlocked && 'opacity-40 cursor-not-allowed')}
        >
          Publish
        </button>
        <button type="button" onClick={() => onSave(buildSaveData('archived'))} className={`${btnBase} border border-border text-foreground/40 hover:text-foreground`}>
          Archive
        </button>

        {onDelete && (
          <button
            type="button"
            onClick={() => {
              if (!confirmDelete) { setConfirmDelete(true); return; }
              onDelete();
            }}
            className={cn(
              `${btnBase} ml-auto`,
              confirmDelete
                ? 'border border-red-500 text-red-500 hover:bg-red-500/10'
                : 'text-foreground/30 hover:text-red-400'
            )}
          >
            {confirmDelete ? 'Confirm delete' : 'Delete'}
          </button>
        )}

        <button type="button" onClick={onCancel} className={`${btnBase} text-foreground/50 hover:text-foreground`}>
          Cancel
        </button>
      </div>
    </div>
  );
}
