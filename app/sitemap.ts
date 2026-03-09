import type { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { articles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

const BASE_URL = 'https://anveetmehta.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/#case-studies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  // Dynamic: all published articles
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const publishedArticles = await db
      .select({ slug: articles.slug, updatedAt: articles.updatedAt })
      .from(articles)
      .where(eq(articles.status, 'published'));

    articlePages = publishedArticles.map(a => ({
      url: `${BASE_URL}/writing/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  } catch {
    // If DB is unreachable during build, return static pages only
  }

  return [...staticPages, ...articlePages];
}
