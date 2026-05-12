'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { heroContent, type HeroContent } from '@/content/content';
import { cn } from '@/lib/cn';

type HeroSectionProps = { data?: HeroContent };

export function HeroSection({ data = heroContent }: HeroSectionProps) {
  return (
    <section className="relative border-b border-border/40 py-24 sm:py-32">
      <Container>
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-xs font-medium tracking-widest text-foreground/40 uppercase"
          >
            {data.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {data.h1}
          </motion.h1>

          <div className="mt-8 max-w-2xl space-y-4">
            {data.supporting.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 + i * 0.06 }}
                className="text-base leading-relaxed text-foreground/60 sm:text-lg"
              >
                {para}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            {data.ctas.map((cta) => (
              <Link
                key={cta.label}
                href={cta.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  cta.variant === 'primary' &&
                    'rounded-md border border-foreground/20 bg-foreground/5 px-5 py-2.5 text-foreground hover:bg-foreground/10',
                  cta.variant === 'ghost' &&
                    'rounded-md border border-border/60 px-5 py-2.5 text-foreground/70 hover:border-border hover:text-foreground',
                  cta.variant === 'link' &&
                    'text-foreground/50 hover:text-foreground'
                )}
              >
                {cta.label}
                {cta.variant === 'link' ? ' →' : ''}
              </Link>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
