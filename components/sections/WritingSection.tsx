'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { PenIcon } from '@/components/icons/SectionIcons';
import { writingCallout, writingEntries } from '@/content/content';

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
  const [dbPosts, setDbPosts] = useState<DisplayPost[]>([]);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => (res.ok ? res.json() : []))
      .then((articles: { title: string; summary: string; slug: string }[]) => {
        setDbPosts(
          articles.map((a) => ({
            title: a.title,
            summary: a.summary,
            status: 'published',
            href: `/writing/${a.slug}`,
          }))
        );
      })
      .catch(() => {
        // Silently fail — static entries still show
      });
  }, []);

  const drafts = writingEntries.filter((e) => e.status === 'draft' || e.status === 'planned');
  const staticPublished = writingEntries.filter((e) => e.status !== 'draft' && e.status !== 'planned');
  const allPublished: DisplayPost[] = [...dbPosts, ...staticPublished];

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
