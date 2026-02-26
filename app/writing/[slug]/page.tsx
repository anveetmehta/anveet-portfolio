'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { adminPostsStorageKey } from '@/lib/app-config';
import { getPublishedPostBySlug, migratePost, type AdminPost } from '@/lib/admin-posts';
import { renderSimpleMarkdown } from '@/lib/simple-markdown';
import { Container } from '@/components/Container';

export default function WritingArticlePage() {
  const params = useParams<{ slug: string }>();
  const { value: rawPosts, hydrated } = useLocalStorageState<AdminPost[]>(
    adminPostsStorageKey,
    []
  );

  if (!hydrated) {
    return null;
  }

  const posts = rawPosts.map(migratePost);
  const post = getPublishedPostBySlug(posts, params.slug);

  if (!post) {
    return (
      <section className="py-24">
        <Container>
          <h1 className="text-3xl font-semibold">Article not found</h1>
          <p className="mt-3 text-foreground/70">
            This article may not be published or does not exist.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex text-sm font-medium text-accent"
          >
            Return home →
          </Link>
        </Container>
      </section>
    );
  }

  return (
    <article className="py-16 sm:py-20">
      <Container>
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.15em] text-foreground/50">
            Article
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg text-foreground/75">{post.summary}</p>
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-foreground/70"
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
          <Link
            href="/"
            className="text-sm font-medium text-accent"
          >
            ← Back to home
          </Link>
        </div>
      </Container>
    </article>
  );
}
