'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { explorations, type Exploration } from '@/content/content';

const CARD_TINTS = [
  'from-blue-950/50 to-card/30',
  'from-violet-950/40 to-card/30',
  'from-emerald-950/40 to-card/30',
];

type ExplorationsSectionProps = { data?: Exploration[] };

export function ExplorationsSection({ data = explorations }: ExplorationsSectionProps) {
  return (
    <section id="explorations" className="border-b border-border/30 py-24 sm:py-32">
      <Container>
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-3 text-xs font-medium tracking-widest text-foreground/35 uppercase"
          >
            Active Explorations
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.07 }}
            className="max-w-lg text-base leading-relaxed text-foreground/50"
          >
            Ongoing work at the intersection of operational intelligence, AI-native systems, and trust infrastructure.
          </motion.p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((exploration, i) => (
            <motion.div
              key={exploration.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br ${CARD_TINTS[i % CARD_TINTS.length]} p-7 transition-all duration-300 hover:border-border/70`}
            >
              {/* Gradient shimmer on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Live status */}
              <div className="mb-6 flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400/80" />
                </span>
                <span className="text-xs text-foreground/40">{exploration.status}</span>
              </div>

              <h3 className="text-base font-semibold text-foreground">{exploration.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/55">{exploration.description}</p>

              {exploration.transforms && (
                <ul className="mt-6 space-y-2">
                  {exploration.transforms.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-xs text-foreground/40">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/45" />
                      {t}
                    </li>
                  ))}
                </ul>
              )}

              {exploration.cta && (
                <Link
                  href={exploration.cta.href}
                  className="mt-7 text-xs font-medium text-foreground/45 transition-colors hover:text-foreground/80"
                >
                  {exploration.cta.label} →
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
