'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { type CaseStudy } from '@/content/content';

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
};

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="group h-full hover:-translate-y-1 hover:shadow-glow">
        <p className="text-xs uppercase tracking-wide text-foreground/55">Case Study</p>
        <h3 className="mt-2 text-xl font-semibold text-foreground">{caseStudy.title}</h3>
        <p className="mt-3 text-foreground/80">{caseStudy.excerpt}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {caseStudy.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-foreground/70">
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
    <Card>
      <p className="text-xs uppercase tracking-wide text-slate-500">Case Study</p>
      <h3 className="mt-2 text-xl font-semibold">{caseStudy.title}</h3>
      <p className="mt-3 text-slate-700">{caseStudy.excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {caseStudy.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
            {tag}
          </span>
        ))}
      </div>
      <Link href={`/case-studies/${caseStudy.slug}`} className="mt-6 inline-flex text-sm font-medium">
        View case study →
      </Link>
    </Card>
  );
}
