// components/CaseStudyCard.tsx — Tier 2, upgrade 04
// Replaces the existing CaseStudyCard. Adds a hero thumb + two big serif
// impact numerals.
//
// content/content.ts addition: add `impacts?: { value: string; label: string }[]`
// to the CaseStudy interface and populate from existing `impact[]` strings.

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { type CaseStudy } from '@/content/content';
import { cn } from '@/lib/cn';

type Props = { study: CaseStudy & { impacts?: { value: string; label: string }[] }; index?: number };

export function CaseStudyCard({ study, index = 0 }: Props) {
  // Derive two impact pairs from impacts[] OR fall back to first two impact strings split on the first %
  const impacts = study.impacts ?? deriveImpacts(study.impact);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="paper-card group relative overflow-hidden rounded-2xl border border-border bg-card/70 transition-all duration-300 hover:border-foreground/25"
    >
      {/* shimmer on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="grid gap-0 sm:grid-cols-[1.05fr_1fr]">
        <Thumb tags={study.tags} slug={study.slug} />

        <div className="flex flex-col p-6 sm:p-8">
          <p className="font-mono text-[10px] tracking-widest uppercase text-ink-2">
            Case Study &middot; {study.tags[0] ?? '—'}
          </p>
          <h3 className="mt-2 text-xl font-semibold leading-tight tracking-tight">{study.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink line-clamp-3">{study.excerpt}</p>

          {impacts.length > 0 && (
            <div className="mt-5 grid grid-cols-2 gap-5">
              {impacts.slice(0, 2).map((im) => (
                <div key={im.label}>
                  <div
                    className="text-3xl leading-none tracking-tight text-foreground"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {im.value}
                  </div>
                  <div className="mt-1.5 text-[10px] leading-tight text-ink-2">{im.label}</div>
                </div>
              ))}
            </div>
          )}

          <Link
            href={`/case-studies/${study.slug}`}
            className="mt-auto pt-6 text-xs font-medium text-ink-2 transition-colors hover:text-ink"
          >
            Read the case study →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function Thumb({ tags, slug }: { tags: string[]; slug: string }) {
  // Stable color from slug
  const palette = [
    ['from-blue-400/30',   'to-card/30'],
    ['from-violet-400/25', 'to-card/30'],
    ['from-emerald-400/25','to-card/30'],
    ['from-amber-400/25',  'to-card/30'],
  ];
  const idx = slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length;
  const [from, to] = palette[idx];

  return (
    <div className={cn('relative min-h-[180px] overflow-hidden bg-gradient-to-br', from, to)}>
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--foreground) / 0.10) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />
      {/* lower-left tag */}
      <p className="absolute bottom-3 left-4 font-mono text-[9px] tracking-widest uppercase text-ink-2">
        {tags[0]}
      </p>
    </div>
  );
}

function deriveImpacts(lines: string[]): { value: string; label: string }[] {
  return lines
    .map((s) => {
      const m = s.match(/(\d+(?:\.\d+)?%|\d+(?:\.\d+)?[a-zA-Z]+|\$?\d+(?:\.\d+)?[KkMm]?\+?)/);
      if (!m) return null;
      const value = m[0];
      const label = s.replace(m[0], '').replace(/^[.\s]+|[.\s]+$/g, '').trim();
      return { value, label: label.length > 60 ? label.slice(0, 56) + '…' : label };
    })
    .filter(Boolean) as { value: string; label: string }[];
}
