import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ideas } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { requireAuth } from '@/lib/api-auth';

type Params = { params: { publicId: string } };

// GET /api/ideas/[publicId]
export async function GET(req: NextRequest, { params }: Params) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const [row] = await db
    .select()
    .from(ideas)
    .where(eq(ideas.publicId, params.publicId))
    .limit(1);

  if (!row) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(row);
}

// PATCH /api/ideas/[publicId]
export async function PATCH(req: NextRequest, { params }: Params) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const body = await req.json();
  const [row] = await db
    .update(ideas)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(ideas.publicId, params.publicId))
    .returning();

  if (!row) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(row);
}

// DELETE /api/ideas/[publicId]
export async function DELETE(req: NextRequest, { params }: Params) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const [row] = await db
    .delete(ideas)
    .where(eq(ideas.publicId, params.publicId))
    .returning();

  if (!row) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ deleted: true });
}
