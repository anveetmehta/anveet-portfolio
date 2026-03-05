import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api-auth';
import { suggestIdeas } from '@/lib/ai/suggest-ideas';

export async function POST(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const body = await req.json().catch(() => ({}));
  const { existingTitles = [] } = body as { existingTitles?: string[] };

  try {
    const ideas = await suggestIdeas(existingTitles);
    return NextResponse.json({ ideas });
  } catch (err) {
    console.error('[suggest-ideas] Error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Suggestion failed' },
      { status: 500 }
    );
  }
}
