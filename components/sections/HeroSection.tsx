'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { heroContent, siteMeta } from '@/content/content';

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
        {/* Trust line with dot separators */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.14 }}
          className="mt-4 text-sm text-foreground/55"
        >
          {trustItems.map((item, i) => (
            <span key={item}>
              {i > 0 ? <span className="mx-2 text-foreground/30">&#x2022;</span> : null}
              {item.trim()}
            </span>
          ))}
        </motion.p>
        {/* CTAs */}
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
          <a
            href={`mailto:${siteMeta.email}`}
            className="rounded-full border border-accent/30 bg-accent/5 px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
          >
            Talk to me
          </a>
        </motion.div>
        {/* Proof strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {heroContent.proofStrips.map((strip) => (
            <span
              key={strip}
              className="rounded-full border border-border/60 bg-card/70 px-3.5 py-1.5 text-xs font-medium text-foreground/60 shadow-sm"
            >
              {strip}
            </span>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
