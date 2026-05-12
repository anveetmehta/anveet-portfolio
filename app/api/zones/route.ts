import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { homepageZones } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { requireAuth } from '@/lib/api-auth';
import { revalidatePath } from 'next/cache';

// GET /api/zones — returns all zones as { key: data } map
// GET /api/zones?key=hero — returns single zone data
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key');

  if (key) {
    const rows = await db
      .select()
      .from(homepageZones)
      .where(eq(homepageZones.key, key))
      .limit(1);
    if (!rows.length) return NextResponse.json(null);
    return NextResponse.json(rows[0].data);
  }

  const rows = await db.select().from(homepageZones);
  const map: Record<string, unknown> = {};
  for (const row of rows) {
    map[row.key] = row.data;
  }
  return NextResponse.json(map);
}

// PUT /api/zones — admin-protected, upsert zone data
// Body: { key: string, data: object }
export async function PUT(req: NextRequest) {
  const authError = requireAuth(req);
  if (authError) return authError;

  const { key, data } = await req.json();
  if (!key || !data) {
    return NextResponse.json({ error: 'key and data required' }, { status: 400 });
  }

  await db
    .insert(homepageZones)
    .values({ key, data, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: homepageZones.key,
      set: { data, updatedAt: new Date() },
    });

  revalidatePath('/');
  return NextResponse.json({ ok: true });
}
