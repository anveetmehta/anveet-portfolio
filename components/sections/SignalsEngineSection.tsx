'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/Container';

const SIGNAL_STATEMENTS = [
  'AI review systems are flattening operational hierarchies.',
  'Workflow cognition is replacing rigid operational systems.',
  'Trust infrastructure is becoming adaptive.',
  'Human-AI orchestration layers are emerging across operational systems.',
  'Operational intelligence is replacing workflow rigidity.',
  'Compliance is evolving into machine-assisted interpretation systems.',
  'Organizations are redesigning systems around cognitive load reduction.',
  'Operational systems increasingly depend on machine-assisted judgment.',
];

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
  const [activeTheme, setActiveTheme] = useState<string | null>(null);

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
                  : 'border-border/30 text-foreground/40 hover:border-border/50 hover:text-foreground/60'
              }`}
            >
              {theme}
            </motion.button>
          ))}
        </motion.div>

        {/* Handcrafted signal statements */}
        <div className="divide-y divide-border/20">
          {SIGNAL_STATEMENTS.map((statement, i) => (
            <motion.div
              key={statement}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="py-5"
            >
              <p className="text-sm leading-relaxed text-foreground/65">{statement}</p>
            </motion.div>
          ))}
        </div>

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
