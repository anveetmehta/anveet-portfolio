'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { heroContent, siteMeta } from '@/content/content';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 py-24 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_85%_10%,rgba(99,102,241,0.12),transparent_35%)]" />
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
          className="mt-6 max-w-3xl text-lg text-foreground/75"
        >
          {heroContent.subhead}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.14 }}
          className="mt-4 text-sm text-foreground/50"
        >
          {heroContent.trustLine}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/case-studies"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white"
          >
            See case studies
          </Link>
          <Link
            href="#contact"
            className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium"
          >
            Talk to me
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
