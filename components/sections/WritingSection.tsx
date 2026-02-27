'use client';

import Link from 'next/link';
import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { writingEntries } from '@/content/content';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { adminPostsStorageKey } from '@/lib/app-config';
import { migratePost, type AdminPost } from '@/lib/admin-posts';

type DisplayPost = {
  title: string;
  summary: string;
  status: string;
  href?: string;
};

function formatStatus(status: string): string {
  if (status === 'draft' || status === 'planned') return 'draft / notes';
  return status;
}

export function WritingSection() {
  const { value: rawPosts, hydrated } = useLocalStorageState<AdminPost[]>(adminPostsStorageKey, []);

  const publishedPosts: DisplayPost[] = hydrated
    ? rawPosts
        .map(migratePost)
        .filter((post) => post.status === 'published')
        .map((post) => ({
          title: post.title,
          summary: post.summary,
          status: 'published',
          href: `/writing/${post.slug}`,
        }))
    : [];

  const allEntries: DisplayPost[] = [...publishedPosts, ...writingEntries];

  return (
    <Section
      id="writing"
      title="Writing"
      description="Working notes. I publish in public to sharpen thinking."
    >
      <div className="space-y-4">
        {allEntries.map((entry) => {
          const isDraft = entry.status === 'draft' || entry.status === 'planned';
          return (
            <Card
              key={`${entry.title}-${entry.status}`}
              dashed={isDraft}
              accentColor={isDraft ? 'none' : 'blue'}
            >
              <p className="text-xs uppercase tracking-wide text-foreground/50">
                {formatStatus(entry.status)}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{entry.title}</h3>
              <p className="mt-2 text-foreground/75">{entry.summary}</p>
              {entry.href && entry.status === 'published' ? (
                <Link
                  href={entry.href}
                  className="mt-4 inline-flex text-sm font-medium text-accent"
                >
                  Read article →
                </Link>
              ) : null}
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
