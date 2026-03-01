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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [post] = await db
    .select()
    .from(articles)
    .where(and(eq(articles.slug, params.slug), eq(articles.status, 'published')))
    .limit(1);

  if (!post) {
    return { title: 'Article not found' };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function WritingArticlePage({ params }: Props) {
  const [post] = await db
    .select()
    .from(articles)
    .where(and(eq(articles.slug, params.slug), eq(articles.status, 'published')))
    .limit(1);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-16 sm:py-20">
      <Container>
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.15em] text-accent font-medium">
            Article
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg text-foreground/75">{post.summary}</p>
          {(post.tags as string[]).length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {(post.tags as string[]).map((tag) => (
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
        <div className="mt-12 max-w-3xl">
          {renderSimpleMarkdown(post.content)}
        </div>
        <div className="mt-16">
          <Link href="/" className="text-sm font-medium text-accent">
            ← Back to home
          </Link>
        </div>
      </Container>
    </article>
  );
}
