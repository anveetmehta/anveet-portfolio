import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { articles } from '@/lib/db/schema';
import { requireAuth } from '@/lib/api-auth';
import { draftRegTechCommentary } from '@/lib/ai/draft-commentary';
import { type RegTechNewsItem } from '@/lib/ai/fetch-regtech-news';
import { slugify } from '@/lib/admin-posts';

// POST /api/regtech/draft
export async function POST(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const body = await req.json();
  const newsItem: RegTechNewsItem = body.newsItem;
  const region: 'india' | 'global' = body.region === 'global' ? 'global' : 'india';

  if (!newsItem) {
    return NextResponse.json({ error: 'newsItem is required' }, { status: 400 });
  }

  const generated = await draftRegTechCommentary(newsItem, region);
  const now = new Date();
  const publicId = 'art_' + Math.random().toString(36).slice(2, 10);

  const [row] = await db
    .insert(articles)
    .values({
      publicId,
      title: generated.title,
      slug: slugify(generated.title),
      summary: generated.summary,
      content: generated.content,
      tags: generated.tags,
      prerequisites: [],
      checks: [],
      status: 'review',
      articleType: 'commentary',
      commentaryRegion: region,
      platform: 'blog',
      metaDescription: generated.metaDescription,
      keywords: generated.keywords,
      readingTimeMinutes: generated.readingTimeMinutes,
      linkedinVersion: generated.linkedinVersion,
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  return NextResponse.json(row, { status: 201 });
}
