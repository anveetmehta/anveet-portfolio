'use client';

import { useMemo, useState } from 'react';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import {
  adminPostsStorageKey,
  defaultFeatureFlags,
  featureFlagLabels,
  featureFlagsStorageKey,
  type FeatureFlagKey
} from '@/lib/app-config';
import { createId, generateDraft, runChecklist, type AdminPost } from '@/lib/admin-posts';

const defaultPrerequisites = [
  'clear problem statement',
  'practical framework',
  'measurable outcome',
  'explicit call to action'
];

export default function AdminPage() {
  const { value: flags, setValue: setFlags } = useLocalStorageState(featureFlagsStorageKey, defaultFeatureFlags);
  const { value: posts, setValue: setPosts } = useLocalStorageState<AdminPost[]>(adminPostsStorageKey, []);

  const [seedIdea, setSeedIdea] = useState('');
  const [draftTitle, setDraftTitle] = useState('');
  const [draftSummary, setDraftSummary] = useState('');
  const [draftContent, setDraftContent] = useState('');
  const [prerequisitesText, setPrerequisitesText] = useState(defaultPrerequisites.join('\n'));

  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    [posts]
  );

  function toggleFlag(flag: FeatureFlagKey) {
    setFlags({ ...flags, [flag]: !flags[flag] });
  }

  function createDraft() {
    const draft = generateDraft(seedIdea);
    setDraftTitle(draft.title);
    setDraftSummary(draft.summary);
    setDraftContent(draft.content);
  }

  function saveForReview() {
    const prerequisites = prerequisitesText
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

    const checks = flags.enableChecklist ? runChecklist(draftContent, draftTitle, prerequisites) : [];

    const newPost: AdminPost = {
      id: createId(),
      title: draftTitle || 'Untitled draft',
      summary: draftSummary || 'Summary pending',
      content: draftContent,
      prerequisites,
      checks,
      status: 'review',
      createdAt: new Date().toISOString()
    };

    setPosts([newPost, ...posts]);
  }

  function updateStatus(id: string, status: AdminPost['status']) {
    setPosts(posts.map((post) => (post.id === id ? { ...post, status } : post)));
  }

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-border bg-card p-6">
        <h1 className="text-2xl font-semibold">Admin Control Center</h1>
        <p className="mt-2 text-sm text-foreground/70">
          Manage feature toggles and run all three phases directly within this website.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold">Feature toggles</h2>
        <p className="mt-1 text-sm text-foreground/70">Turn features on/off instantly from admin.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {(Object.keys(flags) as FeatureFlagKey[]).map((flag) => (
            <label key={flag} className="flex items-center justify-between rounded-xl border border-border p-3">
              <span className="text-sm">{featureFlagLabels[flag]}</span>
              <input type="checkbox" checked={flags[flag]} onChange={() => toggleFlag(flag)} />
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold">Phase 1: AI drafting + prerequisites</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Generate a draft from an idea and evaluate against your prerequisite checklist.
        </p>

        {flags.enableAiDraftAssistant ? (
          <div className="mt-4 space-y-3">
            <input
              value={seedIdea}
              onChange={(event) => setSeedIdea(event.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              placeholder="Seed idea (example: How to align product and execution teams)"
            />
            <button
              type="button"
              onClick={createDraft}
              className="rounded-lg bg-foreground px-4 py-2 text-sm text-background"
            >
              Generate draft
            </button>
          </div>
        ) : (
          <p className="mt-4 text-sm text-foreground/70">AI drafting assistant is currently disabled.</p>
        )}

        <div className="mt-4 grid gap-3">
          <input
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            placeholder="Draft title"
          />
          <input
            value={draftSummary}
            onChange={(event) => setDraftSummary(event.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            placeholder="Draft summary"
          />
          <textarea
            value={draftContent}
            onChange={(event) => setDraftContent(event.target.value)}
            className="min-h-56 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            placeholder="Draft body"
          />
          <textarea
            value={prerequisitesText}
            onChange={(event) => setPrerequisitesText(event.target.value)}
            className="min-h-36 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            placeholder="One prerequisite per line"
          />
          <button
            type="button"
            onClick={saveForReview}
            className="w-fit rounded-lg bg-foreground px-4 py-2 text-sm text-background"
          >
            Save to review queue
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold">Phase 2: Approval + publishing queue</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Review checklist output, approve, and publish posts directly from admin.
        </p>
        <div className="mt-4 space-y-4">
          {sortedPosts.length === 0 ? (
            <p className="text-sm text-foreground/70">No posts in queue yet.</p>
          ) : (
            sortedPosts.map((post) => (
              <article key={post.id} className="rounded-xl border border-border p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <span className="rounded-full border border-border px-3 py-1 text-xs uppercase">
                    {post.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-foreground/80">{post.summary}</p>
                {post.checks.length > 0 ? (
                  <ul className="mt-3 space-y-1 text-sm">
                    {post.checks.map((check) => (
                      <li key={check.item}>
                        {check.passed ? '✅' : '⚠️'} <strong>{check.item}:</strong> {check.note}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-foreground/60">Checklist disabled for this draft.</p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => updateStatus(post.id, 'approved')}
                    className="rounded-lg border border-border px-3 py-1 text-sm"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStatus(post.id, 'published')}
                    className="rounded-lg bg-foreground px-3 py-1 text-sm text-background"
                  >
                    Publish
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStatus(post.id, 'draft')}
                    className="rounded-lg border border-border px-3 py-1 text-sm"
                  >
                    Move to draft
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold">Phase 3: AI persona chat</h2>
        <p className="mt-2 text-sm text-foreground/70">
          Toggle “Enable AI persona chat” above to show or hide the AI Anveet assistant on the homepage.
        </p>
      </section>
    </div>
  );
}
