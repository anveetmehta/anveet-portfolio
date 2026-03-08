import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { domains, domainChapters } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';
import { requireAuth } from '@/lib/api-auth';

type Params = { params: { publicId: string } };

// GET /api/domains/[publicId]/chapters
export async function GET(_req: NextRequest, { params }: Params) {
  const [domain] = await db
    .select()
    .from(domains)
    .where(eq(domains.publicId, params.publicId))
    .limit(1);

  if (!domain) {
    return NextResponse.json({ error: 'Domain not found' }, { status: 404 });
  }

  const chapters = await db
    .select()
    .from(domainChapters)
    .where(eq(domainChapters.domainId, domain.id))
    .orderBy(asc(domainChapters.displayOrder));

  return NextResponse.json(chapters);
}

// POST /api/domains/[publicId]/chapters
export async function POST(req: NextRequest, { params }: Params) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const [domain] = await db
    .select()
    .from(domains)
    .where(eq(domains.publicId, params.publicId))
    .limit(1);

  if (!domain) {
    return NextResponse.json({ error: 'Domain not found' }, { status: 404 });
  }

  const body = await req.json();
  const now = new Date();
  const publicId = 'chp_' + Math.random().toString(36).slice(2, 10);

  const [row] = await db
    .insert(domainChapters)
    .values({
      publicId,
      domainId: domain.id,
      title: body.title || 'Untitled Chapter',
      summary: body.summary || '',
      displayOrder: body.displayOrder ?? 0,
      linkedSlugs: body.linkedSlugs || [],
      linkedTypes: body.linkedTypes || [],
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  return NextResponse.json(row, { status: 201 });
}
