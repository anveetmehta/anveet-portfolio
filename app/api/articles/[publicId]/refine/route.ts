import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { articles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { requireAuth } from '@/lib/api-auth';
import { refineArticle } from '@/lib/ai/refine-article';

type Params = { params: { publicId: string } };

export async function POST(req: NextRequest, { params }: Params) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const body = await req.json().catch(() => ({}));
  const { prompt } = body as { prompt?: string };

  if (!prompt?.trim()) {
    return NextResponse.json({ error: 'prompt is required' }, { status: 400 });
  }

  const [article] = await db
    .select()
    .from(articles)
    .where(eq(articles.publicId, params.publicId))
    .limit(1);

  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  try {
    const refined = await refineArticle(
      article.content,
      article.linkedinVersion ?? '',
      prompt
    );

    const [updated] = await db
      .update(articles)
      .set({
        content: refined.content,
        linkedinVersion: refined.linkedinVersion,
        readingTimeMinutes: refined.readingTimeMinutes,
        updatedAt: new Date(),
      })
      .where(eq(articles.publicId, params.publicId))
      .returning();

    return NextResponse.json(updated);
  } catch (err) {
    console.error('[refine] Error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Refinement failed' },
      { status: 500 }
    );
  }
}
