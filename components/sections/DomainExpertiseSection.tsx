'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/Section';
import { Card } from '@/components/Card';
import { LightbulbIcon } from '@/components/icons/SectionIcons';
import { type DomainWithChapters } from '@/lib/db/types';

function BrainIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5V12" />
      <path d="M12 12v7.5A2.5 2.5 0 0 1 9.5 22" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5" />
      <path d="M9.5 22A2.5 2.5 0 0 0 12 19.5" />
      <path d="M4.5 7A2.5 2.5 0 0 0 7 9.5H12" />
      <path d="M4.5 17A2.5 2.5 0 0 1 7 14.5H12" />
      <path d="M19.5 7A2.5 2.5 0 0 1 17 9.5H12" />
      <path d="M19.5 17A2.5 2.5 0 0 0 17 14.5H12" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function resolveLink(slug: string, type: string): string | null {
  if (type === 'article') return `/writing/${slug}`;
  if (type === 'case-study') return `/case-studies/${slug}`;
  return null;
}

export function DomainExpertiseSection() {
  const [domains, setDomains] = useState<DomainWithChapters[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('/api/domains')
      .then(r => r.ok ? r.json() : [])
      .then((data: DomainWithChapters[]) => setDomains(data))
      .catch(() => setDomains([]));
  }, []);

  if (!mounted || domains.length === 0) return null;

  function toggle(id: string) {
    setExpandedId(prev => (prev === id ? null : id));
  }

  return (
    <Section
      id="domain-expertise"
      title="Domain Expertise"
      variant="muted"
      icon={<BrainIcon />}
    >
      <div className="space-y-3 max-w-3xl">
        {domains.map((domain, index) => {
          const isOpen = expandedId === domain.publicId;
          return (
            <motion.div
              key={domain.publicId}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
            >
              <Card className="overflow-hidden">
                {/* Header row — always visible, click to toggle */}
                <button
                  type="button"
                  onClick={() => toggle(domain.publicId)}
                  className="flex w-full items-center gap-3 text-left"
                >
                  {domain.icon && (
                    <span className="text-2xl leading-none">{domain.icon}</span>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{domain.title}</h3>
                      {domain.chapters.length > 0 && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-foreground/50">
                          {domain.chapters.length} topic{domain.chapters.length !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    {domain.summary && (
                      <p className="mt-1 text-sm text-foreground/65">{domain.summary}</p>
                    )}
                  </div>
                  <ChevronIcon open={isOpen} />
                </button>

                {/* Expandable chapters */}
                <AnimatePresence initial={false}>
                  {isOpen && domain.chapters.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 space-y-3 border-t border-border/50 pt-4">
                        {domain.chapters.map(chapter => (
                          <div key={chapter.publicId} className="rounded-xl bg-muted/40 p-4">
                            <p className="font-medium text-sm">{chapter.title}</p>
                            {chapter.summary && (
                              <p className="mt-1 text-xs text-foreground/55">{chapter.summary}</p>
                            )}
                            {chapter.linkedSlugs && chapter.linkedSlugs.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {chapter.linkedSlugs.map((slug, i) => {
                                  const type = chapter.linkedTypes?.[i] ?? 'article';
                                  const href = resolveLink(slug, type);
                                  return href ? (
                                    <a
                                      key={slug}
                                      href={href}
                                      className="rounded-md border border-border/60 px-2 py-0.5 text-xs text-foreground/60 hover:text-accent hover:border-accent/40 transition-colors"
                                    >
                                      {slug}
                                    </a>
                                  ) : (
                                    <span
                                      key={slug}
                                      className="rounded-md border border-border/40 px-2 py-0.5 text-xs text-foreground/40"
                                    >
                                      {slug}
                                    </span>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
