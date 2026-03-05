import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ideas, articles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { requireAuth } from '@/lib/api-auth';
import { createId } from '@/lib/admin-posts';
import { generateArticleFromIdea } from '@/lib/ai/generate-article';

type Params = { params: { publicId: string } };

// POST /api/ideas/[publicId]/generate
// Generates an article from an idea using OpenAI, places it in the review pipeline
export async function POST(req: NextRequest, { params }: Params) {
  const authError = requireAuth(req);
  if (authError) return authError;

  // Fetch the idea
  const [idea] = await db
    .select()
    .from(ideas)
    .where(eq(ideas.publicId, params.publicId))
    .limit(1);

  if (!idea) {
    return NextResponse.json({ error: 'Idea not found' }, { status: 404 });
  }

  if (idea.status === 'generating') {
    return NextResponse.json({ error: 'Already generating' }, { status: 409 });
  }

  const body = await req.json().catch(() => ({}));
  const { feedback } = body as { feedback?: string };

  // Mark as generating
  await db
    .update(ideas)
    .set({ status: 'generating', updatedAt: new Date() })
    .where(eq(ideas.publicId, params.publicId));

  try {
    // Generate content via OpenAI
    const generated = await generateArticleFromIdea(idea, feedback);
    const now = new Date();

    // Create the article in the review pipeline
    const [article] = await db
      .insert(articles)
      .values({
        publicId: createId(),
        title: generated.title,
        slug: generated.slug,
        summary: generated.summary,
        content: generated.content,
        tags: generated.tags,
        prerequisites: [],
        checks: [],
        status: 'review',
        platform: idea.platform === 'all' ? 'blog' : idea.platform,
        contentPillar: idea.contentPillar ?? undefined,
        metaDescription: generated.metaDescription,
        keywords: generated.keywords,
        readingTimeMinutes: generated.readingTimeMinutes,
        linkedinVersion: generated.linkedinVersion,
        sourceIdeaId: idea.publicId,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    // Update idea: mark as generated, link to article
    await db
      .update(ideas)
      .set({
        status: 'generated',
        generatedArticleId: article.publicId,
        updatedAt: new Date(),
      })
      .where(eq(ideas.publicId, params.publicId));

    return NextResponse.json(article, { status: 201 });
  } catch (err) {
    // Revert idea status on failure
    await db
      .update(ideas)
      .set({ status: 'prioritized', updatedAt: new Date() })
      .where(eq(ideas.publicId, params.publicId));

    console.error('[generate] Error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Generation failed' },
      { status: 500 }
    );
  }
}
