'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/Container';

type Signal = {
  title: string;
  summary: string;
  source: string;
  region?: string;
  pillar?: string;
};

const PILLAR_COLORS: Record<string, string> = {
  'systems-thinking': 'text-blue-400/70',
  'fintech-risk': 'text-emerald-400/70',
  'ai-building': 'text-violet-400/70',
  'product-execution': 'text-amber-400/70',
  'career-craft': 'text-rose-400/70',
};

const EMERGING_THEMES = [
  'AI review systems',
  'Workflow cognition',
  'Trust infrastructure',
  'Compliance intelligence',
  'Adaptive operational design',
  'Onboarding architecture',
  'Machine-assisted judgment',
  'Operational orchestration',
];

export function SignalsEngineSection() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTheme, setActiveTheme] = useState<string | null>(null);

  useEffect(() => {
    // Fetch trending ideas from the public signals endpoint
    fetch('/api/signals')
      .then((r) => r.ok ? r.json() : [])
      .then((ideas: { title: string; description: string; contentPillar?: string }[]) => {
        setSignals(
          ideas.slice(0, 6).map((idea) => ({
            title: idea.title,
            summary: idea.description,
            source: 'Intelligence Engine',
            pillar: idea.contentPillar,
          }))
        );
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="signals-engine" className="border-b border-border/30 py-24 sm:py-32">
      <Container>
        <div className="flex items-start justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-12 text-xs font-medium tracking-widest text-foreground/35 uppercase"
          >
            Signals
          </motion.p>

          {/* Live indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-2 text-xs text-foreground/30"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
            </span>
            live
          </motion.div>
        </div>

        {/* Emerging themes — chip cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.06 }}
          className="mb-12 flex flex-wrap gap-2"
        >
          {EMERGING_THEMES.map((theme, i) => (
            <motion.button
              key={theme}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 * i }}
              onClick={() => setActiveTheme(activeTheme === theme ? null : theme)}
              className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                activeTheme === theme
                  ? 'border-foreground/30 text-foreground/70'
                  : 'border-border/30 text-foreground/35 hover:border-border/50 hover:text-foreground/55'
              }`}
            >
              {theme}
            </motion.button>
          ))}
        </motion.div>

        {/* Signal fragments from content engine */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-px"
            >
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 animate-pulse rounded bg-foreground/5" />
              ))}
            </motion.div>
          ) : signals.length > 0 ? (
            <motion.div
              key="signals"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="divide-y divide-border/20"
            >
              {signals.map((signal, i) => (
                <motion.div
                  key={signal.title}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex flex-col gap-1.5 py-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-medium text-foreground/70">{signal.title}</p>
                    {signal.pillar && (
                      <span className={`shrink-0 text-xs ${PILLAR_COLORS[signal.pillar] ?? 'text-foreground/30'}`}>
                        {signal.pillar.replace(/-/g, ' ')}
                      </span>
                    )}
                  </div>
                  {signal.summary && (
                    <p className="text-xs leading-relaxed text-foreground/35 line-clamp-2">{signal.summary}</p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="divide-y divide-border/20"
            >
              {EMERGING_THEMES.slice(0, 5).map((theme, i) => (
                <div key={theme} className="py-5">
                  <p className="text-sm font-medium text-foreground/45">{theme}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 text-xs text-foreground/25"
        >
          Emerging operational patterns · continuously updating
        </motion.p>
      </Container>
    </section>
  );
}
