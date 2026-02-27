'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { heroContent } from '@/content/content';

const trustItems = heroContent.trustLine.split(' · ');

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 py-20 sm:py-24">
      {/* Subtle dot grid texture */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_85%_10%,rgba(99,102,241,0.12),transparent_35%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <Container>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
        >
          {heroContent.h1}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-5 max-w-3xl text-lg text-foreground/75"
        >
          {heroContent.subhead}
        </motion.p>
        {/* Trust pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.14 }}
          className="mt-5 flex flex-wrap gap-2"
        >
          {trustItems.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border/70 bg-muted/50 px-3 py-1 text-xs text-foreground/60"
            >
              {item.trim()}
            </span>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/case-studies"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            See case studies
          </Link>
          <Link
            href="#contact"
            className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Talk to me
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
