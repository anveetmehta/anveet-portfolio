import { type Article } from '@/lib/db/types';

function getAuthHeaders(): HeadersInit {
  const password = typeof window !== 'undefined'
    ? sessionStorage.getItem('anveet-admin-password') || ''
    : '';
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${password}`,
  };
}

export async function fetchAllArticles(): Promise<Article[]> {
  const res = await fetch('/api/articles?all=true', {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error(`Failed to fetch articles: ${res.status}`);
  return res.json();
}

export async function createArticle(
  data: Partial<Article>
): Promise<Article> {
  const res = await fetch('/api/articles', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to create article: ${res.status}`);
  return res.json();
}

export async function updateArticle(
  publicId: string,
  data: Partial<Article>
): Promise<Article> {
  const res = await fetch(`/api/articles/${publicId}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update article: ${res.status}`);
  return res.json();
}

export async function deleteArticle(publicId: string): Promise<void> {
  const res = await fetch(`/api/articles/${publicId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error(`Failed to delete article: ${res.status}`);
}
