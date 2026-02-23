'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { siteMeta } from '@/content/content';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 py-24 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_85%_10%,rgba(99,102,241,0.12),transparent_35%)]" />
      <Container>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xs uppercase tracking-[0.25em] text-foreground/60"
        >
          Product · Systems · Execution
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          Building thoughtful digital systems with measurable outcomes.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-6 max-w-3xl text-lg text-foreground/75"
        >
          I’m {siteMeta.name}. This portfolio is designed as a scalable foundation for case studies, writing, and
          experiments.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Link href="/case-studies" className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white">
            Explore case studies
          </Link>
          <Link href="#contact" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium">
            Get in touch
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
