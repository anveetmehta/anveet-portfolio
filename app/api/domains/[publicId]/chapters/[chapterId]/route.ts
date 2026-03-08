import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { domainChapters } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { requireAuth } from '@/lib/api-auth';

type Params = { params: { publicId: string; chapterId: string } };

// PATCH /api/domains/[publicId]/chapters/[chapterId]
export async function PATCH(req: NextRequest, { params }: Params) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const body = await req.json();
  const [row] = await db
    .update(domainChapters)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(domainChapters.publicId, params.chapterId))
    .returning();

  if (!row) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(row);
}

// DELETE /api/domains/[publicId]/chapters/[chapterId]
export async function DELETE(req: NextRequest, { params }: Params) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const [row] = await db
    .delete(domainChapters)
    .where(eq(domainChapters.publicId, params.chapterId))
    .returning();

  if (!row) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ deleted: true });
}
