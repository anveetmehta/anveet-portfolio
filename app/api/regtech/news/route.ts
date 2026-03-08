import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api-auth';
import { fetchRegtechNews } from '@/lib/ai/fetch-regtech-news';

// POST /api/regtech/news
export async function POST(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const body = await req.json();
  const region: 'india' | 'global' = body.region === 'global' ? 'global' : 'india';

  const items = await fetchRegtechNews(region);
  return NextResponse.json({ items });
}
