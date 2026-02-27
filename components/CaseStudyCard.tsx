'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { type CaseStudy } from '@/content/content';
import { cn } from '@/lib/cn';

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
};

const tagColors = [
  'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
];

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="group h-full border-t-4 border-t-accent hover:-translate-y-1 hover:shadow-glow">
        <p className="text-xs uppercase tracking-wide text-foreground/55">Case Study</p>
        <h3 className="mt-2 text-xl font-semibold text-foreground">{caseStudy.title}</h3>
        <p className="mt-3 text-foreground/80">{caseStudy.excerpt}</p>
        {/* Microcopy: What I did + Outcome */}
        <div className="mt-4 space-y-1.5 rounded-lg bg-muted/50 p-3 text-sm">
          <p className="text-foreground/70">
            <span className="font-medium text-foreground/85">What I did:</span>{' '}
            {caseStudy.contribution}
          </p>
          <p className="text-foreground/70">
            <span className="font-medium text-foreground/85">Outcome:</span>{' '}
            {caseStudy.outcome}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {caseStudy.tags.map((tag, idx) => (
            <span
              key={tag}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium',
                tagColors[idx % tagColors.length]
              )}
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/case-studies/${caseStudy.slug}`}
          className="mt-6 inline-flex text-sm font-medium text-accent group-hover:translate-x-1 transition-transform"
        >
          View case study →
        </Link>
      </Card>
    </motion.div>
  );
}
