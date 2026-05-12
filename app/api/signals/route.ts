import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ideas } from '@/lib/db/schema';
import { eq, desc, or } from 'drizzle-orm';

// GET /api/signals — public endpoint returning top trending ideas
// Used by the public Signals Engine section
export async function GET() {
  const rows = await db
    .select({
      title: ideas.title,
      description: ideas.description,
      contentPillar: ideas.contentPillar,
      isTrending: ideas.isTrending,
    })
    .from(ideas)
    .where(
      or(
        eq(ideas.isTrending, true),
        eq(ideas.status, 'captured'),
        eq(ideas.status, 'prioritized')
      )
    )
    .orderBy(desc(ideas.isTrending), desc(ideas.priority), desc(ideas.createdAt))
    .limit(8);

  return NextResponse.json(rows);
}
