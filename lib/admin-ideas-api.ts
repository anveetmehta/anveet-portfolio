import { type Idea } from '@/lib/db/types';
import { type Article } from '@/lib/db/types';

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

export async function fetchAllIdeas(): Promise<Idea[]> {
  const res = await fetch('/api/ideas', { headers: getAuthHeaders() });
  if (!res.ok) throw new Error(`Failed to fetch ideas: ${res.status}`);
  return res.json();
}

export async function createIdea(data: Partial<Idea>): Promise<Idea> {
  const res = await fetch('/api/ideas', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to create idea: ${res.status}`);
  return res.json();
}

export async function updateIdea(publicId: string, data: Partial<Idea>): Promise<Idea> {
  const res = await fetch(`/api/ideas/${publicId}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update idea: ${res.status}`);
  return res.json();
}

export async function deleteIdea(publicId: string): Promise<void> {
  const res = await fetch(`/api/ideas/${publicId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error(`Failed to delete idea: ${res.status}`);
}

export async function generateFromIdea(publicId: string, feedback?: string): Promise<Article> {
  const res = await fetch(`/api/ideas/${publicId}/generate`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(feedback ? { feedback } : {}),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Generation failed: ${res.status}`);
  }
  return res.json();
}
