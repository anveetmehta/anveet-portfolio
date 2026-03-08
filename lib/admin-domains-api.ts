import { type Domain, type DomainChapter, type DomainWithChapters } from '@/lib/db/types';

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

export async function fetchAllDomains(): Promise<DomainWithChapters[]> {
  const res = await fetch('/api/domains?all=true', { headers: getAuthHeaders() });
  if (!res.ok) throw new Error(`Failed to fetch domains: ${res.status}`);
  return res.json();
}

export async function createDomain(data: {
  title: string;
  summary?: string;
  icon?: string;
  displayOrder?: number;
  status?: string;
}): Promise<Domain> {
  const res = await fetch('/api/domains', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to create domain: ${res.status}`);
  return res.json();
}

export async function updateDomain(publicId: string, data: Partial<Domain>): Promise<Domain> {
  const res = await fetch(`/api/domains/${publicId}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update domain: ${res.status}`);
  return res.json();
}

export async function deleteDomain(publicId: string): Promise<void> {
  const res = await fetch(`/api/domains/${publicId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error(`Failed to delete domain: ${res.status}`);
}

export async function createChapter(
  domainPublicId: string,
  data: {
    title: string;
    summary?: string;
    displayOrder?: number;
    linkedSlugs?: string[];
    linkedTypes?: string[];
  }
): Promise<DomainChapter> {
  const res = await fetch(`/api/domains/${domainPublicId}/chapters`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to create chapter: ${res.status}`);
  return res.json();
}

export async function updateChapter(
  domainPublicId: string,
  chapterPublicId: string,
  data: Partial<DomainChapter>
): Promise<DomainChapter> {
  const res = await fetch(`/api/domains/${domainPublicId}/chapters/${chapterPublicId}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update chapter: ${res.status}`);
  return res.json();
}

export async function deleteChapter(domainPublicId: string, chapterPublicId: string): Promise<void> {
  const res = await fetch(`/api/domains/${domainPublicId}/chapters/${chapterPublicId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error(`Failed to delete chapter: ${res.status}`);
}
