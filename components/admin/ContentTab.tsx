'use client';

import { useState, useEffect, useCallback } from 'react';
import { type Article } from '@/lib/db/types';
import { type PostStatus } from '@/lib/admin-posts';
import { fetchAllArticles, createArticle, updateArticle, deleteArticle } from '@/lib/admin-api';
import { ArticleList } from './ArticleList';
import { ArticleEditor } from './ArticleEditor';
import { Toast, type ToastState } from './Toast';

type SaveData = {
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags: string[];
  prerequisites: string[];
  checks: { item: string; passed: boolean; note: string }[];
  status: PostStatus;
  platform?: string;
  contentPillar?: string | null;
  metaDescription?: string;
  keywords?: string[];
  readingTimeMinutes?: number;
  linkedinVersion?: string;
};

export function ContentTab() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>(null);

  const loadArticles = useCallback(async () => {
    try {
      setError('');
      const data = await fetchAllArticles();
      setArticles(data);
    } catch (err) {
      setError('Failed to load articles. Check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadArticles(); }, [loadArticles]);

  const editingArticle =
    editingId && editingId !== '__new__'
      ? articles.find(a => a.publicId === editingId) ?? null
      : null;

  async function handleSave(data: SaveData) {
    try {
      if (editingId === '__new__') {
        const created = await createArticle(data as Parameters<typeof createArticle>[0]);
        setArticles(prev => [created, ...prev]);
      } else if (editingId) {
        const updated = await updateArticle(editingId, data as Partial<Article>);
        setArticles(prev => prev.map(a => a.publicId === editingId ? updated : a));
      }
      setEditingId(null);
      setToast({ message: 'Article saved', type: 'success' });
    } catch (err) {
      console.error('Save failed:', err);
      setToast({ message: 'Failed to save. Please try again.', type: 'error' });
    }
  }

  async function handleDelete(publicId: string) {
    try {
      await deleteArticle(publicId);
      setArticles(prev => prev.filter(a => a.publicId !== publicId));
      if (editingId === publicId) setEditingId(null);
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete. Please try again.');
    }
  }

  async function handleStatusChange(publicId: string, status: PostStatus | 'archived') {
    try {
      const updated = await updateArticle(publicId, { status } as Partial<Article>);
      setArticles(prev => prev.map(a => a.publicId === publicId ? updated : a));
    } catch (err) {
      console.error('Status change failed:', err);
    }
  }

  if (loading) return <div className="py-12 text-center text-foreground/50">Loading articles…</div>;

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-red-500">{error}</p>
        <button type="button" onClick={() => { setLoading(true); loadArticles(); }} className="mt-4 rounded-lg border border-border px-4 py-2 text-sm">Retry</button>
      </div>
    );
  }

  if (editingId !== null) {
    return (
      <>
        <ArticleEditor
          article={editingArticle}
          onSave={handleSave}
          onCancel={() => setEditingId(null)}
          onDelete={editingArticle ? () => handleDelete(editingArticle.publicId) : undefined}
        />
        <Toast toast={toast} onDismiss={() => setToast(null)} />
      </>
    );
  }

  return (
    <>
      <ArticleList
        articles={articles}
        onNew={() => setEditingId('__new__')}
        onEdit={publicId => setEditingId(publicId)}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </>
  );
}
