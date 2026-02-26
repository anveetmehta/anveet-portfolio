'use client';

import { useState, useMemo } from 'react';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { adminPostsStorageKey } from '@/lib/app-config';
import { migratePost, type AdminPost, type PostStatus } from '@/lib/admin-posts';
import { ArticleList } from './ArticleList';
import { ArticleEditor } from './ArticleEditor';

export function ContentTab() {
  const { value: rawPosts, setValue: setPosts } = useLocalStorageState<AdminPost[]>(
    adminPostsStorageKey,
    []
  );
  const posts = useMemo(() => rawPosts.map(migratePost), [rawPosts]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingPost =
    editingId && editingId !== '__new__'
      ? posts.find((p) => p.id === editingId) ?? null
      : editingId === '__new__'
        ? null
        : null;

  function handleSave(post: AdminPost) {
    const exists = posts.some((p) => p.id === post.id);
    if (exists) {
      setPosts(posts.map((p) => (p.id === post.id ? post : p)));
    } else {
      setPosts([post, ...posts]);
    }
    setEditingId(null);
  }

  function handleDelete(id: string) {
    setPosts(posts.filter((p) => p.id !== id));
    if (editingId === id) setEditingId(null);
  }

  function handleStatusChange(id: string, status: PostStatus) {
    setPosts(
      posts.map((p) =>
        p.id === id ? { ...p, status, updatedAt: new Date().toISOString() } : p
      )
    );
  }

  if (editingId !== null) {
    return (
      <ArticleEditor
        post={editingPost}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
        onDelete={editingPost ? () => handleDelete(editingPost.id) : undefined}
      />
    );
  }

  return (
    <ArticleList
      posts={posts}
      onNew={() => setEditingId('__new__')}
      onEdit={(id) => setEditingId(id)}
      onDelete={handleDelete}
      onStatusChange={handleStatusChange}
    />
  );
}
