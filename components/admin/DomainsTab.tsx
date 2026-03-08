'use client';

import { useState, useEffect, useCallback } from 'react';
import { type Domain, type DomainChapter, type DomainWithChapters } from '@/lib/db/types';
import {
  fetchAllDomains,
  createDomain,
  updateDomain,
  deleteDomain,
  createChapter,
  updateChapter,
  deleteChapter,
} from '@/lib/admin-domains-api';
import { Toast, type ToastState } from './Toast';
import { cn } from '@/lib/cn';

type View = 'list' | 'domain-edit' | 'chapter-edit';

type LinkedContentRow = {
  slug: string;
  type: 'article' | 'case-study' | 'project';
};

export function DomainsTab() {
  const [domains, setDomains] = useState<DomainWithChapters[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>('list');
  const [editingDomain, setEditingDomain] = useState<Domain | null>(null);
  const [editingChapter, setEditingChapter] = useState<{
    chapter: DomainChapter | null;
    domainPublicId: string;
  } | null>(null);
  const [toast, setToast] = useState<ToastState>(null);

  // Domain form state
  const [domainTitle, setDomainTitle] = useState('');
  const [domainSummary, setDomainSummary] = useState('');
  const [domainIcon, setDomainIcon] = useState('');
  const [domainOrder, setDomainOrder] = useState(0);
  const [domainStatus, setDomainStatus] = useState<'draft' | 'published' | 'archived'>('draft');

  // Chapter form state
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterSummary, setChapterSummary] = useState('');
  const [chapterOrder, setChapterOrder] = useState(0);
  const [linkedContent, setLinkedContent] = useState<LinkedContentRow[]>([]);

  const loadDomains = useCallback(async () => {
    try {
      const data = await fetchAllDomains();
      setDomains(data);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to load domains', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadDomains(); }, [loadDomains]);

  function openNewDomain() {
    setEditingDomain(null);
    setDomainTitle('');
    setDomainSummary('');
    setDomainIcon('');
    setDomainOrder(domains.length);
    setDomainStatus('draft');
    setView('domain-edit');
  }

  function openEditDomain(domain: Domain) {
    setEditingDomain(domain);
    setDomainTitle(domain.title);
    setDomainSummary(domain.summary);
    setDomainIcon(domain.icon);
    setDomainOrder(domain.displayOrder);
    setDomainStatus(domain.status);
    setView('domain-edit');
  }

  function openNewChapter(domainPublicId: string) {
    setEditingChapter({ chapter: null, domainPublicId });
    setChapterTitle('');
    setChapterSummary('');
    setChapterOrder(0);
    setLinkedContent([]);
    setView('chapter-edit');
  }

  function openEditChapter(chapter: DomainChapter, domainPublicId: string) {
    setEditingChapter({ chapter, domainPublicId });
    setChapterTitle(chapter.title);
    setChapterSummary(chapter.summary);
    setChapterOrder(chapter.displayOrder);
    const rows: LinkedContentRow[] = (chapter.linkedSlugs || []).map((slug, i) => ({
      slug,
      type: (chapter.linkedTypes?.[i] as LinkedContentRow['type']) || 'article',
    }));
    setLinkedContent(rows);
    setView('chapter-edit');
  }

  async function handleSaveDomain() {
    try {
      if (editingDomain) {
        const updated = await updateDomain(editingDomain.publicId, {
          title: domainTitle,
          summary: domainSummary,
          icon: domainIcon,
          displayOrder: domainOrder,
          status: domainStatus,
        });
        setDomains(prev =>
          prev.map(d =>
            d.publicId === editingDomain.publicId
              ? { ...updated, chapters: d.chapters }
              : d
          )
        );
        setToast({ message: 'Domain updated', type: 'success' });
      } else {
        await createDomain({
          title: domainTitle,
          summary: domainSummary,
          icon: domainIcon,
          displayOrder: domainOrder,
          status: domainStatus,
        });
        await loadDomains();
        setToast({ message: 'Domain created', type: 'success' });
      }
      setView('list');
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to save domain', type: 'error' });
    }
  }

  async function handleDeleteDomain(publicId: string) {
    if (!confirm('Delete this domain and all its chapters?')) return;
    try {
      await deleteDomain(publicId);
      setDomains(prev => prev.filter(d => d.publicId !== publicId));
      setToast({ message: 'Domain deleted', type: 'success' });
      setView('list');
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to delete domain', type: 'error' });
    }
  }

  async function handleSaveChapter() {
    if (!editingChapter) return;
    try {
      const slugs = linkedContent.map(r => r.slug).filter(Boolean);
      const types = linkedContent.map(r => r.type);

      if (editingChapter.chapter) {
        const updated = await updateChapter(
          editingChapter.domainPublicId,
          editingChapter.chapter.publicId,
          {
            title: chapterTitle,
            summary: chapterSummary,
            displayOrder: chapterOrder,
            linkedSlugs: slugs,
            linkedTypes: types,
          }
        );
        setDomains(prev =>
          prev.map(d =>
            d.publicId === editingChapter.domainPublicId
              ? {
                  ...d,
                  chapters: d.chapters.map(c =>
                    c.publicId === editingChapter.chapter!.publicId ? updated : c
                  ),
                }
              : d
          )
        );
        setToast({ message: 'Chapter updated', type: 'success' });
      } else {
        await createChapter(editingChapter.domainPublicId, {
          title: chapterTitle,
          summary: chapterSummary,
          displayOrder: chapterOrder,
          linkedSlugs: slugs,
          linkedTypes: types,
        });
        await loadDomains();
        setToast({ message: 'Chapter created', type: 'success' });
      }
      setView('list');
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to save chapter', type: 'error' });
    }
  }

  async function handleDeleteChapter(domainPublicId: string, chapterPublicId: string) {
    if (!confirm('Delete this chapter?')) return;
    try {
      await deleteChapter(domainPublicId, chapterPublicId);
      setDomains(prev =>
        prev.map(d =>
          d.publicId === domainPublicId
            ? { ...d, chapters: d.chapters.filter(c => c.publicId !== chapterPublicId) }
            : d
        )
      );
      setToast({ message: 'Chapter deleted', type: 'success' });
      setView('list');
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to delete chapter', type: 'error' });
    }
  }

  function addLinkedRow() {
    setLinkedContent(prev => [...prev, { slug: '', type: 'article' }]);
  }

  function updateLinkedRow(i: number, field: keyof LinkedContentRow, value: string) {
    setLinkedContent(prev =>
      prev.map((row, idx) =>
        idx === i ? { ...row, [field]: value } : row
      )
    );
  }

  function removeLinkedRow(i: number) {
    setLinkedContent(prev => prev.filter((_, idx) => idx !== i));
  }

  function statusBadge(status: string) {
    const base = 'rounded-full px-2 py-0.5 text-xs font-medium';
    if (status === 'published') return cn(base, 'bg-green-500/10 text-green-600 dark:text-green-400');
    if (status === 'archived') return cn(base, 'bg-foreground/10 text-foreground/40');
    return cn(base, 'bg-muted text-foreground/50');
  }

  if (loading) {
    return <div className="py-12 text-center text-foreground/50">Loading domains…</div>;
  }

  // --- Chapter Edit Form ---
  if (view === 'chapter-edit' && editingChapter) {
    return (
      <>
        <div className="space-y-5 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {editingChapter.chapter ? 'Edit Chapter' : 'New Chapter'}
            </h2>
            <button
              type="button"
              onClick={() => setView('list')}
              className="text-sm text-foreground/50 hover:text-foreground"
            >
              Cancel
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-foreground/60">Title</label>
              <input
                type="text"
                value={chapterTitle}
                onChange={e => setChapterTitle(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="Chapter title"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-foreground/60">Summary</label>
              <textarea
                value={chapterSummary}
                onChange={e => setChapterSummary(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="Brief description"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-foreground/60">Display Order</label>
              <input
                type="number"
                value={chapterOrder}
                onChange={e => setChapterOrder(Number(e.target.value))}
                className="w-32 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-medium text-foreground/60">Linked Content</label>
                <button
                  type="button"
                  onClick={addLinkedRow}
                  className="text-xs text-accent hover:underline"
                >
                  + Add Link
                </button>
              </div>
              <div className="space-y-2">
                {linkedContent.map((row, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={row.slug}
                      onChange={e => updateLinkedRow(i, 'slug', e.target.value)}
                      placeholder="slug"
                      className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                    <select
                      value={row.type}
                      onChange={e => updateLinkedRow(i, 'type', e.target.value)}
                      className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                    >
                      <option value="article">Article</option>
                      <option value="case-study">Case Study</option>
                      <option value="project">Project</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => removeLinkedRow(i)}
                      className="rounded-lg border border-border px-3 py-2 text-sm text-foreground/50 hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleSaveChapter}
              className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background"
            >
              Save Chapter
            </button>
            <button
              type="button"
              onClick={() => setView('list')}
              className="rounded-lg border border-border px-4 py-2 text-sm"
            >
              Cancel
            </button>
            {editingChapter.chapter && (
              <button
                type="button"
                onClick={() =>
                  handleDeleteChapter(
                    editingChapter.domainPublicId,
                    editingChapter.chapter!.publicId
                  )
                }
                className="ml-auto rounded-lg border border-red-400/30 px-4 py-2 text-sm text-red-500 hover:bg-red-500/5"
              >
                Delete
              </button>
            )}
          </div>
        </div>
        <Toast toast={toast} onDismiss={() => setToast(null)} />
      </>
    );
  }

  // --- Domain Edit Form ---
  if (view === 'domain-edit') {
    return (
      <>
        <div className="space-y-5 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {editingDomain ? 'Edit Domain' : 'New Domain'}
            </h2>
            <button
              type="button"
              onClick={() => setView('list')}
              className="text-sm text-foreground/50 hover:text-foreground"
            >
              Cancel
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-foreground/60">Title</label>
              <input
                type="text"
                value={domainTitle}
                onChange={e => setDomainTitle(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="Domain title"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-foreground/60">Summary</label>
              <textarea
                value={domainSummary}
                onChange={e => setDomainSummary(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="Brief description"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-foreground/60">Icon (emoji)</label>
                <input
                  type="text"
                  value={domainIcon}
                  onChange={e => setDomainIcon(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="🏦"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-foreground/60">Display Order</label>
                <input
                  type="number"
                  value={domainOrder}
                  onChange={e => setDomainOrder(Number(e.target.value))}
                  className="w-28 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-foreground/60">Status</label>
                <select
                  value={domainStatus}
                  onChange={e => setDomainStatus(e.target.value as typeof domainStatus)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleSaveDomain}
              className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background"
            >
              Save Domain
            </button>
            <button
              type="button"
              onClick={() => setView('list')}
              className="rounded-lg border border-border px-4 py-2 text-sm"
            >
              Cancel
            </button>
            {editingDomain && (
              <button
                type="button"
                onClick={() => handleDeleteDomain(editingDomain.publicId)}
                className="ml-auto rounded-lg border border-red-400/30 px-4 py-2 text-sm text-red-500 hover:bg-red-500/5"
              >
                Delete
              </button>
            )}
          </div>
        </div>
        <Toast toast={toast} onDismiss={() => setToast(null)} />
      </>
    );
  }

  // --- List View ---
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Domain Expertise</h2>
          <button
            type="button"
            onClick={openNewDomain}
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background"
          >
            + New Domain
          </button>
        </div>

        {domains.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-foreground/40">
            No domains yet. Create your first domain expertise area.
          </div>
        ) : (
          <div className="space-y-3">
            {domains.map(domain => (
              <div
                key={domain.publicId}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-start gap-3">
                  {domain.icon && (
                    <span className="text-2xl leading-none">{domain.icon}</span>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{domain.title}</h3>
                      <span className={statusBadge(domain.status)}>{domain.status}</span>
                      <span className="text-xs text-foreground/40">
                        {domain.chapters.length} chapter{domain.chapters.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    {domain.summary && (
                      <p className="mt-1 text-sm text-foreground/60">{domain.summary}</p>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => openEditDomain(domain)}
                      className="rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-muted"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => openNewChapter(domain.publicId)}
                      className="rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-muted"
                    >
                      + Chapter
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteDomain(domain.publicId)}
                      className="rounded-lg border border-red-400/20 px-3 py-1.5 text-xs text-red-500/70 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {domain.chapters.length > 0 && (
                  <div className="mt-4 space-y-2 border-t border-border/50 pt-3">
                    {domain.chapters.map(chapter => (
                      <div
                        key={chapter.publicId}
                        className="flex items-center justify-between gap-2 rounded-lg bg-muted/50 px-3 py-2"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">{chapter.title}</p>
                          {chapter.summary && (
                            <p className="text-xs text-foreground/50">{chapter.summary}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => openEditChapter(chapter, domain.publicId)}
                          className="shrink-0 text-xs text-foreground/40 hover:text-foreground"
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </>
  );
}
