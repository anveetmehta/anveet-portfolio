import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { articles } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { requireAuth } from '@/lib/api-auth';
import { createId, slugify } from '@/lib/admin-posts';

// GET /api/articles
// Public: returns only published articles
// Admin (auth + ?all=true): returns all articles
export async function GET(req: NextRequest) {
  const wantsAll = req.nextUrl.searchParams.get('all') === 'true';

  if (wantsAll) {
    const authError = requireAuth(req);
    if (authError) return authError;

    const rows = await db
      .select()
      .from(articles)
      .orderBy(desc(articles.createdAt));
    return NextResponse.json(rows);
  }

  const rows = await db
    .select()
    .from(articles)
    .where(eq(articles.status, 'published'))
    .orderBy(desc(articles.createdAt));
  return NextResponse.json(rows);
}

// POST /api/articles
export async function POST(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const body = await req.json();
  const now = new Date();

  const [row] = await db
    .insert(articles)
    .values({
      publicId: createId(),
      title: body.title || 'Untitled',
      slug: body.slug || slugify(body.title || 'untitled'),
      summary: body.summary || '',
      content: body.content || '',
      tags: body.tags || [],
      prerequisites: body.prerequisites || [],
      checks: body.checks || [],
      status: body.status || 'draft',
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  return NextResponse.json(row, { status: 201 });
}
