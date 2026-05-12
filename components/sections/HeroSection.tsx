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

const NODES = [
  { cx: 80,  cy: 80  },
  { cx: 230, cy: 45  },
  { cx: 375, cy: 100 },
  { cx: 435, cy: 230 },
  { cx: 350, cy: 345 },
  { cx: 185, cy: 375 },
  { cx: 50,  cy: 270 },
  { cx: 215, cy: 200 },
];

const EDGES: [number, number][] = [
  [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6],
  [0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [6, 0],
];

function SystemGraph() {
  return (
    <svg viewBox="0 0 490 425" className="h-full w-full" fill="none" aria-hidden>
      {EDGES.map(([a, b], i) => (
        <motion.path
          key={`e${i}`}
          d={`M ${NODES[a].cx} ${NODES[a].cy} L ${NODES[b].cx} ${NODES[b].cy}`}
          stroke="hsl(var(--foreground) / 0.09)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.8 + i * 0.08, ease: 'easeOut' }}
        />
      ))}
      {NODES.map((n, i) => (
        <g key={`n${i}`}>
          <motion.circle
            cx={n.cx} cy={n.cy}
            r={i === 7 ? 5 : 2.5}
            fill={i === 7 ? 'hsl(var(--accent) / 0.6)' : 'hsl(var(--foreground) / 0.18)'}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.07, type: 'spring', stiffness: 160 }}
          />
          {i === 7 && (
            <motion.circle
              cx={n.cx} cy={n.cy} r={5}
              fill="none"
              stroke="hsl(var(--accent) / 0.3)"
              strokeWidth="1"
              animate={{ r: [5, 24, 5], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
        </g>
      ))}
    </svg>
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

      {/* System graph — desktop only */}
      <div
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-[46%] items-center justify-center lg:flex"
        aria-hidden
      >
        <div className="h-[380px] w-[460px] opacity-70">
          <SystemGraph />
        </div>
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
                className="text-lg leading-relaxed text-foreground/50"
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
