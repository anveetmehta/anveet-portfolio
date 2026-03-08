import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { domains, domainChapters } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';
import { requireAuth } from '@/lib/api-auth';
import { type DomainWithChapters } from '@/lib/db/types';

// GET /api/domains
// Public (no params): published domains + their chapters
// Admin (?all=true + auth): all domains + chapters
export async function GET(req: NextRequest) {
  const wantsAll = req.nextUrl.searchParams.get('all') === 'true';

  if (wantsAll) {
    const authError = requireAuth(req);
    if (authError) return authError;

    const allDomains = await db.select().from(domains).orderBy(asc(domains.displayOrder));
    const allChapters = await db.select().from(domainChapters).orderBy(asc(domainChapters.displayOrder));

    const result: DomainWithChapters[] = allDomains.map(domain => ({
      ...domain,
      chapters: allChapters.filter(c => c.domainId === domain.id),
    }));

    return NextResponse.json(result);
  }

  // Public: published only
  const publishedDomains = await db
    .select()
    .from(domains)
    .where(eq(domains.status, 'published'))
    .orderBy(asc(domains.displayOrder));

  const allChapters = await db.select().from(domainChapters).orderBy(asc(domainChapters.displayOrder));

  const result: DomainWithChapters[] = publishedDomains.map(domain => ({
    ...domain,
    chapters: allChapters.filter(c => c.domainId === domain.id),
  }));

  return NextResponse.json(result);
}

// POST /api/domains
export async function POST(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const body = await req.json();
  const now = new Date();

  const publicId = 'dom_' + Math.random().toString(36).slice(2, 10);
  const slug = (body.title as string)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const [row] = await db
    .insert(domains)
    .values({
      publicId,
      title: body.title || 'Untitled',
      slug,
      summary: body.summary || '',
      icon: body.icon || '',
      displayOrder: body.displayOrder ?? 0,
      status: body.status || 'draft',
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  return NextResponse.json(row, { status: 201 });
}
