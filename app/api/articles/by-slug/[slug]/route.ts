import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { articles } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

type Params = { params: { slug: string } };

// GET /api/articles/by-slug/[slug]
// Only returns published articles (public endpoint)
export async function GET(_req: NextRequest, { params }: Params) {
  const [row] = await db
    .select()
    .from(articles)
    .where(
      and(
        eq(articles.slug, params.slug),
        eq(articles.status, 'published')
      )
    )
    .limit(1);

  if (!row) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(row);
}
