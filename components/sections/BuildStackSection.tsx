'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { buildStack } from '@/content/content';

function WrenchIcon({ className }: { className?: string }) {
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
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

export function BuildStackSection() {
  return (
    <Section
      id="build-stack"
      title="What I Build With"
      description="Tools and tech I've shipped real things with — each tied to a concrete output."
      icon={<WrenchIcon />}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-4xl">
        {buildStack.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="h-full p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl leading-none flex-shrink-0 mt-0.5" aria-hidden>
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-sm leading-snug">{item.name}</p>
                  <p className="mt-1.5 text-sm text-foreground/60 leading-relaxed">
                    {item.proofLine}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      className="mt-2 inline-block text-xs text-accent hover:text-accent/80 transition-colors"
                    >
                      See it in action →
                    </a>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
