import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { articles } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { renderSimpleMarkdown } from '@/lib/simple-markdown';
import { Container } from '@/components/Container';
import { ArticleShareButtons } from '@/components/ArticleShareButtons';

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
  const pillarLabel = post.contentPillar ? PILLAR_LABELS[post.contentPillar] : null;
  const ogImageUrl = `/api/og?title=${encodeURIComponent(post.title)}&pillar=${encodeURIComponent(pillarLabel ?? '')}&type=article`;

  return {
    title: `${post.title} — Anveet Mehta`,
    description,
    keywords: keywords || undefined,
    authors: [{ name: 'Anveet Mehta' }],
    alternates: {
      canonical: `https://anveet-portfolio.vercel.app/writing/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      url: `https://anveet-portfolio.vercel.app/writing/${post.slug}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [ogImageUrl],
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

        {/* Share buttons */}
        <div className="mt-12 max-w-3xl border-t border-border pt-8">
          <ArticleShareButtons
            title={post.title}
            slug={post.slug}
            linkedinVersion={post.linkedinVersion || undefined}
          />
        </div>

        {/* Copyright footer */}
        <div className="mt-8 max-w-3xl">
          <p className="text-xs text-foreground/40">
            © Anveet Mehta. All rights reserved. Originally published at{' '}
            <a href="https://anveet-portfolio.vercel.app" className="underline underline-offset-2">
              anveetmehta.com
            </a>
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 max-w-3xl">
          <Link href="/#insights" className="text-sm font-medium text-accent">
            ← Back to Insights
          </Link>
          <a
            href="https://www.linkedin.com/in/anveetmehta"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground/50 hover:text-foreground/80 transition-colors"
          >
            Follow on LinkedIn →
          </a>
        </div>
      </Container>
    </article>
  );
}
