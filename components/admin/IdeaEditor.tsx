'use client';

import { useState, type FormEvent } from 'react';
import { cn } from '@/lib/cn';
import { type Idea } from '@/lib/db/types';
import { ToggleSwitch } from './ToggleSwitch';

type IdeaEditorProps = {
  idea: Idea | null;
  onSave: (data: Partial<Idea>) => Promise<void>;
  onCancel: () => void;
  onDelete?: () => Promise<void>;
};

const inputClass =
  'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent';
const labelClass = 'block text-xs font-medium text-foreground/60 mb-1';
const sectionClass = 'space-y-4';

const PLATFORMS = [
  { value: 'all', label: 'All Platforms' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'medium', label: 'Medium' },
  { value: 'blog', label: 'Blog / Website' },
] as const;

const PILLARS = [
  { value: '', label: 'No pillar' },
  { value: 'systems-thinking', label: 'Systems Thinking' },
  { value: 'product-execution', label: 'Product Execution' },
  { value: 'fintech-risk', label: 'Fintech & Risk' },
  { value: 'ai-building', label: 'AI & Building' },
  { value: 'career-craft', label: 'Career Craft' },
] as const;

const PRIORITIES = [
  { value: 1, label: 'Low' },
  { value: 2, label: 'Medium' },
  { value: 3, label: 'High' },
] as const;

export function IdeaEditor({ idea, onSave, onCancel, onDelete }: IdeaEditorProps) {
  const [title, setTitle] = useState(idea?.title ?? '');
  const [description, setDescription] = useState(idea?.description ?? '');
  const [angle, setAngle] = useState(idea?.angle ?? '');
  const [targetAudience, setTargetAudience] = useState(idea?.targetAudience ?? '');
  const [platform, setPlatform] = useState<string>(idea?.platform ?? 'all');
  const [priority, setPriority] = useState<number>(idea?.priority ?? 2);
  const [contentPillar, setContentPillar] = useState<string>(idea?.contentPillar ?? '');
  const [sourceInspiration, setSourceInspiration] = useState(idea?.sourceInspiration ?? '');
  const [generationPrompt, setGenerationPrompt] = useState(idea?.generationPrompt ?? '');
  const [isTrending, setIsTrending] = useState(idea?.isTrending ?? false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent, nextStatus?: string) {
    e.preventDefault();
    if (!title.trim()) { setError('Title is required.'); return; }
    setSaving(true);
    setError('');
    try {
      const data: Partial<Idea> = {
        title: title.trim(),
        description,
        angle,
        targetAudience,
        platform: platform as Idea['platform'],
        priority,
        contentPillar: contentPillar as Idea['contentPillar'] || undefined,
        sourceInspiration,
        generationPrompt,
        isTrending,
        ...(nextStatus ? { status: nextStatus as Idea['status'] } : {}),
      };
      await onSave(data);
    } catch {
      setError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    if (!onDelete) return;
    setDeleting(true);
    try { await onDelete(); } catch { setError('Failed to delete.'); setDeleting(false); }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-base font-semibold">
          {idea ? 'Edit Idea' : 'New Idea'}
        </h3>
        <button type="button" onClick={onCancel} className="text-xs text-foreground/50 hover:text-foreground">
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core fields */}
        <div className={sectionClass}>
          <div>
            <label className={labelClass}>Title *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className={inputClass}
              placeholder="What's the idea?"
              autoFocus
            />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className={cn(inputClass, 'min-h-[80px] resize-y')}
              placeholder="Expand on the idea — context, what you've observed, why it matters now"
            />
          </div>
          <div>
            <label className={labelClass}>Unique Angle</label>
            <input
              type="text"
              value={angle}
              onChange={e => setAngle(e.target.value)}
              className={inputClass}
              placeholder="What's the contrarian or specific take that makes this worth writing?"
            />
          </div>
          <div>
            <label className={labelClass}>Target Audience</label>
            <input
              type="text"
              value={targetAudience}
              onChange={e => setTargetAudience(e.target.value)}
              className={inputClass}
              placeholder="e.g. PMs in fintech, engineering managers, compliance teams"
            />
          </div>
        </div>

        {/* Classification */}
        <div className="border-t border-border pt-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground/40">Classification</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Platform</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className={inputClass}>
                {PLATFORMS.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Content Pillar</label>
              <select value={contentPillar} onChange={e => setContentPillar(e.target.value)} className={inputClass}>
                {PILLARS.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Priority</label>
              <div className="flex gap-2">
                {PRIORITIES.map(p => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPriority(p.value)}
                    className={cn(
                      'flex-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
                      priority === p.value
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border text-foreground/50 hover:text-foreground'
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-4">
              <ToggleSwitch
                checked={isTrending}
                onChange={() => setIsTrending(prev => !prev)}
              />
              <span className="text-sm text-foreground/70">Trending topic</span>
            </div>
          </div>
        </div>

        {/* Source + generation */}
        <div className="border-t border-border pt-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground/40">Source & Generation</p>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Source / Inspiration</label>
              <textarea
                value={sourceInspiration}
                onChange={e => setSourceInspiration(e.target.value)}
                className={cn(inputClass, 'min-h-[70px] resize-y')}
                placeholder="URLs, quotes, tweets, observations from your own work — raw material for the AI"
              />
            </div>
            <div>
              <label className={labelClass}>Custom Generation Prompt (optional)</label>
              <textarea
                value={generationPrompt}
                onChange={e => setGenerationPrompt(e.target.value)}
                className={cn(inputClass, 'min-h-[70px] resize-y')}
                placeholder="Override or add to the default AI prompt — e.g. 'Focus specifically on the onboarding angle, not the broader compliance framework'"
              />
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save Idea'}
          </button>
          {idea?.status !== 'prioritized' && (
            <button
              type="button"
              disabled={saving}
              onClick={e => handleSubmit(e as unknown as FormEvent, 'prioritized')}
              className="rounded-lg border border-accent px-4 py-2 text-sm font-medium text-accent hover:bg-accent/5 disabled:opacity-50"
            >
              Prioritize
            </button>
          )}
          {idea?.status !== 'archived' && (
            <button
              type="button"
              disabled={saving}
              onClick={e => handleSubmit(e as unknown as FormEvent, 'archived')}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground/50 hover:text-foreground disabled:opacity-50"
            >
              Archive
            </button>
          )}
          <div className="ml-auto">
            {onDelete && (
              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className={cn(
                  'rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50',
                  confirmDelete
                    ? 'border-red-500 text-red-500 hover:bg-red-500/10'
                    : 'border-border text-foreground/40 hover:text-red-500 hover:border-red-400'
                )}
              >
                {deleting ? 'Deleting…' : confirmDelete ? 'Confirm delete' : 'Delete'}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
