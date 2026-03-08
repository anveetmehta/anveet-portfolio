import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { domains, domainChapters } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';
import { requireAuth } from '@/lib/api-auth';
import { type DomainWithChapters } from '@/lib/db/types';

type Params = { params: { publicId: string } };

// GET /api/domains/[publicId]
export async function GET(_req: NextRequest, { params }: Params) {
  const [domain] = await db
    .select()
    .from(domains)
    .where(eq(domains.publicId, params.publicId))
    .limit(1);

  if (!domain) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const chapters = await db
    .select()
    .from(domainChapters)
    .where(eq(domainChapters.domainId, domain.id))
    .orderBy(asc(domainChapters.displayOrder));

  const result: DomainWithChapters = { ...domain, chapters };
  return NextResponse.json(result);
}

// PATCH /api/domains/[publicId]
export async function PATCH(req: NextRequest, { params }: Params) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const body = await req.json();
  const [row] = await db
    .update(domains)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(domains.publicId, params.publicId))
    .returning();

  if (!row) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(row);
}

// DELETE /api/domains/[publicId]
export async function DELETE(req: NextRequest, { params }: Params) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const [row] = await db
    .delete(domains)
    .where(eq(domains.publicId, params.publicId))
    .returning();

  if (!row) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ deleted: true });
}
