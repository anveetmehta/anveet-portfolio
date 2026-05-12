'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { openThreadsContent, type OpenThreadsContent } from '@/content/content';

type OpenThreadsSectionProps = { data?: OpenThreadsContent };

export function OpenThreadsSection({ data = openThreadsContent }: OpenThreadsSectionProps) {
  return (
    <section id="open-threads" className="py-24 sm:py-32">
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

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="text-base leading-relaxed text-foreground/60"
          >
            {data.body}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.14 }}
            className="mt-5 text-sm text-foreground/40"
          >
            {data.areas.join(' · ')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.22 }}
            className="mt-10"
          >
            <Link
              href={data.cta.href}
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              {data.cta.label} →
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
