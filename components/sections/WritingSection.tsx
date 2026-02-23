'use client';

import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { writingEntries } from '@/content/content';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { adminPostsStorageKey } from '@/lib/app-config';
import { type AdminPost } from '@/lib/admin-posts';

type DisplayPost = {
  title: string;
  summary: string;
  status: string;
};

export function WritingSection() {
  const { value: adminPosts, hydrated } = useLocalStorageState<AdminPost[]>(adminPostsStorageKey, []);

  const publishedPosts: DisplayPost[] = hydrated
    ? adminPosts
        .filter((post) => post.status === 'published')
        .map((post) => ({
          title: post.title,
          summary: post.summary,
          status: 'published'
        }))
    : [];

  const allEntries: DisplayPost[] = [...publishedPosts, ...writingEntries];

  return (
    <Section
      id="writing"
      title="Writing"
      description="Publishing layer prepared for blog expansion and editorial experiments."
    >
      <div className="space-y-4">
        {allEntries.map((entry) => (
          <Card key={`${entry.title}-${entry.status}`}>
            <p className="text-xs uppercase tracking-wide text-foreground/50">{entry.status}</p>
            <h3 className="mt-2 text-lg font-semibold">{entry.title}</h3>
            <p className="mt-2 text-foreground/75">{entry.summary}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
