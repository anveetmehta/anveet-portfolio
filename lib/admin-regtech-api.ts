import type { RegTechNewsItem } from '@/lib/ai/fetch-regtech-news';
import type { Article } from '@/lib/db/types';

function getAuthHeaders(): HeadersInit {
  const password =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('anveet-admin-password') || ''
      : '';
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${password}`,
  };
}

export async function fetchRegtechNews(region: 'india' | 'global'): Promise<RegTechNewsItem[]> {
  const res = await fetch('/api/regtech/news', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ region }),
  });
  if (!res.ok) throw new Error(`Failed to fetch news: ${res.status}`);
  const data = await res.json();
  return data.items as RegTechNewsItem[];
}

export async function draftCommentary(
  newsItem: RegTechNewsItem,
  region: 'india' | 'global'
): Promise<Article> {
  const res = await fetch('/api/regtech/draft', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ newsItem, region }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || `Draft failed: ${res.status}`);
  }
  return res.json();
}
