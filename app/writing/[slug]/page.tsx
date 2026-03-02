import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { articles } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { renderSimpleMarkdown } from '@/lib/simple-markdown';
import { Container } from '@/components/Container';

type Props = {
  params: { slug: string };
};

const PILLAR_LABELS: Record<string, string> = {
  'systems-thinking': 'Systems Thinking',
  'product-execution': 'Product Execution',
  'fintech-risk': 'Fintech & Risk',
  'ai-building': 'AI & Building',
  'career-craft': 'Career Craft',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [post] = await db
    .select()
    .from(articles)
    .where(and(eq(articles.slug, params.slug), eq(articles.status, 'published')))
    .limit(1);

  if (!post) return { title: 'Article not found' };

  const description = post.metaDescription || post.summary;
  const keywords = (post.keywords as string[]).join(', ');

  return {
    title: `${post.title} — Anveet Mehta`,
    description,
    keywords: keywords || undefined,
    authors: [{ name: 'Anveet Mehta' }],
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      url: `https://anveet-portfolio.vercel.app/writing/${post.slug}`,
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description,
    },
  };
}

export default async function WritingArticlePage({ params }: Props) {
  const [post] = await db
    .select()
    .from(articles)
    .where(and(eq(articles.slug, params.slug), eq(articles.status, 'published')))
    .limit(1);

  if (!post) notFound();

  const tags = post.tags as string[];
  const pillarLabel = post.contentPillar ? PILLAR_LABELS[post.contentPillar] : null;

  return (
    <article className="py-16 sm:py-20">
      <Container>
        <header className="max-w-3xl">
          {/* Eyebrow: pillar + reading time */}
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs uppercase tracking-[0.15em] text-accent font-medium">
              {pillarLabel ?? 'Insight'}
            </p>
            {post.readingTimeMinutes && (
              <span className="text-xs text-foreground/40">{post.readingTimeMinutes} min read</span>
            )}
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg text-foreground/75">{post.summary}</p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article body */}
        <div className="mt-12 max-w-3xl">
          {renderSimpleMarkdown(post.content)}
        </div>

        {/* Copyright footer */}
        <div className="mt-12 max-w-3xl border-t border-border pt-6">
          <p className="text-xs text-foreground/40">
            © Anveet Mehta. All rights reserved. Originally published at{' '}
            <a href="https://anveet-portfolio.vercel.app" className="underline underline-offset-2">
              anveetmehta.com
            </a>
          </p>
        </div>

        <div className="mt-8">
          <Link href="/#insights" className="text-sm font-medium text-accent">
            ← Back to Insights
          </Link>
        </div>
      </Container>
    </article>
  );
}
