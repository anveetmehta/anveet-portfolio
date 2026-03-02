import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ideas } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { requireAuth } from '@/lib/api-auth';
import { createIdeaId } from '@/lib/admin-posts';

// GET /api/ideas — admin only, returns all ideas
export async function GET(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const status = req.nextUrl.searchParams.get('status');

  const rows = status
    ? await db.select().from(ideas).where(eq(ideas.status, status as 'captured' | 'prioritized' | 'generating' | 'generated' | 'archived')).orderBy(desc(ideas.priority), desc(ideas.createdAt))
    : await db.select().from(ideas).orderBy(desc(ideas.priority), desc(ideas.createdAt));

  return NextResponse.json(rows);
}

// POST /api/ideas — create a new idea
export async function POST(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const body = await req.json();
  const now = new Date();

  const [row] = await db
    .insert(ideas)
    .values({
      publicId: createIdeaId(),
      title: body.title || 'Untitled idea',
      description: body.description || '',
      angle: body.angle || '',
      targetAudience: body.targetAudience || '',
      platform: body.platform || 'all',
      priority: body.priority ?? 2,
      contentPillar: body.contentPillar || null,
      sourceInspiration: body.sourceInspiration || '',
      status: body.status || 'captured',
      isTrending: body.isTrending ?? false,
      generationPrompt: body.generationPrompt || '',
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  return NextResponse.json(row, { status: 201 });
}
