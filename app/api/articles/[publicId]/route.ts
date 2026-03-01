import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { articles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { requireAuth } from '@/lib/api-auth';

type Params = { params: { publicId: string } };

// GET /api/articles/[publicId]
export async function GET(_req: NextRequest, { params }: Params) {
  const [row] = await db
    .select()
    .from(articles)
    .where(eq(articles.publicId, params.publicId))
    .limit(1);

  if (!row) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(row);
}

// PATCH /api/articles/[publicId]
export async function PATCH(req: NextRequest, { params }: Params) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const body = await req.json();
  const [row] = await db
    .update(articles)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(articles.publicId, params.publicId))
    .returning();

  if (!row) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(row);
}

// DELETE /api/articles/[publicId]
export async function DELETE(req: NextRequest, { params }: Params) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const [row] = await db
    .delete(articles)
    .where(eq(articles.publicId, params.publicId))
    .returning();

  if (!row) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ deleted: true });
}
