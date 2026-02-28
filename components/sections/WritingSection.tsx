'use client';

import Link from 'next/link';
import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { PenIcon } from '@/components/icons/SectionIcons';
import { writingCallout, writingEntries } from '@/content/content';
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

  const drafts = writingEntries.filter((e) => e.status === 'draft' || e.status === 'planned');
  const allPublished: DisplayPost[] = [
    ...publishedPosts,
    ...writingEntries.filter((e) => e.status !== 'draft' && e.status !== 'planned'),
  ];

  return (
    <Section
      id="writing"
      title="Writing"
      description="Working notes. I publish in public to sharpen thinking."
      icon={<PenIcon />}
    >
      <p className="mb-6 text-sm font-medium italic text-accent">
        {writingCallout}
      </p>

      {/* Published entries — full cards */}
      <div className="space-y-4">
        {allPublished.map((entry) => (
          <Card key={`${entry.title}-published`} accentColor="blue">
            <p className="text-xs uppercase tracking-wide text-foreground/50">
              {formatStatus(entry.status)}
            </p>
            <h3 className="mt-2 text-lg font-semibold">{entry.title}</h3>
            <p className="mt-2 text-foreground/75">{entry.summary}</p>
            {entry.href ? (
              <Link
                href={entry.href}
                className="mt-4 inline-flex text-sm font-medium text-accent"
              >
                Read article →
              </Link>
            ) : null}
          </Card>
        ))}
      </div>

      {/* Draft entries — compact single-line items */}
      {drafts.length > 0 && (
        <div className="mt-4 space-y-2">
          {drafts.map((entry) => (
            <div
              key={entry.title}
              className="flex items-center justify-between rounded-lg border border-dashed border-border/70 px-4 py-3 opacity-70"
            >
              <span className="text-sm font-medium text-foreground/80">{entry.title}</span>
              <span className="text-xs uppercase tracking-wide text-foreground/40">
                {formatStatus(entry.status)}
              </span>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
