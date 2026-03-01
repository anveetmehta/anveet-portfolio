import { NextRequest, NextResponse } from 'next/server';

export function requireAuth(req: NextRequest): NextResponse | null {
  const authHeader = req.headers.get('authorization');
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json(
      { error: 'Server misconfigured: no ADMIN_PASSWORD' },
      { status: 500 }
    );
  }

  if (authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return null; // auth passed
}
