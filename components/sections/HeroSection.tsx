'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { heroContent, type HeroContent } from '@/content/content';
import { cn } from '@/lib/cn';

const AMBIENT_THOUGHTS = [
  'Operational systems quietly shape trust.',
  'Complexity compounds before failure becomes visible.',
  'AI is flattening operational cognition.',
  'Workflow rigidity becomes visible only under scale pressure.',
  'Human review systems are becoming AI-assisted interpretation layers.',
  'Operational intelligence is becoming the next interface.',
];

const CONCEPT_LAYERS = [
  { text: 'trust orchestration', delay: 0.7 },
  { text: 'workflow cognition', delay: 0.85 },
  { text: 'onboarding infrastructure', delay: 1.0 },
  { text: 'machine-assisted judgment', delay: 1.15 },
  { text: 'operational entropy', delay: 1.3 },
  { text: 'adaptive systems', delay: 1.45 },
  { text: 'compliance intelligence', delay: 1.6 },
  { text: 'risk interpretation layers', delay: 1.75 },
];

function ConceptColumn() {
  return (
    <div className="flex flex-col items-end gap-4" aria-hidden>
      {CONCEPT_LAYERS.map((c, i) => (
        <motion.span
          key={c.text}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: c.delay, ease: 'easeOut' }}
          className="font-mono text-xs tracking-wide"
          style={{ color: `hsl(var(--foreground) / ${0.06 + i * 0.025})` }}
        >
          {c.text}
        </motion.span>
      ))}
    </div>
  );
}

type HeroSectionProps = { data?: HeroContent };

export function HeroSection({ data = heroContent }: HeroSectionProps) {
  const [thoughtIdx, setThoughtIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setThoughtIdx((i) => (i + 1) % AMBIENT_THOUGHTS.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const ACCENT_PHRASE = 'invisible systems.';
  const before = data.h1.includes(ACCENT_PHRASE)
    ? data.h1.slice(0, data.h1.indexOf(ACCENT_PHRASE))
    : data.h1;
  const accentPart = data.h1.includes(ACCENT_PHRASE) ? ACCENT_PHRASE : '';

  return (
    <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden border-b border-border/40">

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--foreground) / 0.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden
      />

      {/* Drifting gradient orbs */}
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-[130px]"
        style={{ animation: 'orb-drift-1 22s ease-in-out infinite' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-1/4 h-[380px] w-[380px] rounded-full bg-violet-700/8 blur-[110px]"
        style={{ animation: 'orb-drift-2 28s ease-in-out infinite' }}
        aria-hidden
      />

      {/* Concept column — desktop only */}
      <div
        className="pointer-events-none absolute right-16 top-0 hidden h-full w-[280px] flex-col items-end justify-center lg:flex"
        aria-hidden
      >
        <ConceptColumn />
      </div>

      <Container className="relative z-10 py-28">
        <div className="max-w-[680px]">

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-xs font-medium tracking-widest text-foreground/35 uppercase"
          >
            {data.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="text-5xl font-semibold leading-[1.06] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            {before}
            {accentPart && (
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                {accentPart}
              </span>
            )}
          </motion.h1>

          <div className="mt-8 max-w-lg space-y-4">
            {data.supporting.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.22 + i * 0.08 }}
                className="text-lg leading-relaxed text-foreground/65"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Rotating ambient thought */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 h-5"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={thoughtIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.6 }}
                className="text-xs italic text-foreground/25"
              >
                — {AMBIENT_THOUGHTS[thoughtIdx]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            {data.ctas.map((cta) => (
              <Link
                key={cta.label}
                href={cta.href}
                className={cn(
                  'text-sm font-medium transition-all duration-200',
                  cta.variant === 'primary' &&
                    'rounded-lg border border-accent/35 bg-accent/10 px-6 py-3 text-foreground/90 hover:border-accent/60 hover:bg-accent/15',
                  cta.variant === 'ghost' &&
                    'rounded-lg border border-border/60 px-6 py-3 text-foreground/55 hover:border-foreground/30 hover:text-foreground/90',
                  cta.variant === 'link' &&
                    'text-foreground/35 transition-colors hover:text-foreground/65'
                )}
              >
                {cta.label}
                {cta.variant === 'link' ? ' →' : ''}
              </Link>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-10 w-px bg-gradient-to-b from-foreground/25 to-transparent"
        />
      </motion.div>
    </section>
  );
}
