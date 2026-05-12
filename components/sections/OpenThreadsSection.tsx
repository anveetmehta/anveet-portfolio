'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { openThreadsContent, type OpenThreadsContent } from '@/content/content';

type OpenThreadsSectionProps = { data?: OpenThreadsContent };

export function OpenThreadsSection({ data = openThreadsContent }: OpenThreadsSectionProps) {
  return (
    <section id="open-threads" className="relative overflow-hidden py-24 sm:py-32">
      {/* Subtle bottom glow */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, hsl(var(--accent) / 0.04) 0%, transparent 70%)' }}
        aria-hidden
      />

      <Container>
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-6 text-xs font-medium tracking-widest text-foreground/35 uppercase"
          >
            {data.label}
          </motion.p>

          {data.heading && (
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.07 }}
              className="mb-5 text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl"
            >
              {data.heading}
            </motion.h2>
          )}

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: data.heading ? 0.14 : 0.07 }}
            className="text-base leading-relaxed text-foreground/55 sm:text-lg"
          >
            {data.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {data.areas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-border/40 px-3 py-1 text-xs text-foreground/40"
              >
                {area}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.26 }}
            className="mt-10"
          >
            <Link
              href={data.cta.href}
              className="inline-flex items-center gap-2 rounded-lg border border-border/50 px-6 py-3 text-sm font-medium text-foreground/60 transition-all duration-200 hover:border-foreground/30 hover:text-foreground"
            >
              {data.cta.label}
              <span className="text-foreground/30">→</span>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
