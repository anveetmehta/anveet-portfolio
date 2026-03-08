import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { articles } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

const BASE_URL = 'https://anveet-portfolio.vercel.app';

export async function GET() {
  const publishedArticles = await db
    .select()
    .from(articles)
    .where(eq(articles.status, 'published'))
    .orderBy(desc(articles.createdAt))
    .limit(50);

  const items = publishedArticles
    .map(
      article => `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${BASE_URL}/writing/${article.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/writing/${article.slug}</guid>
      <description><![CDATA[${article.summary || article.title}]]></description>
      <pubDate>${new Date(article.createdAt).toUTCString()}</pubDate>
      <author>anveetmehta@gmail.com (Anveet Mehta)</author>
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Anveet Mehta — Insights</title>
    <link>${BASE_URL}</link>
    <description>Systems thinking, fintech, risk, and AI building from a practitioner.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
