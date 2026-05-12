'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { explorations } from '@/content/content';

export function ExplorationsSection() {
  return (
    <section id="explorations" className="border-b border-border/30 py-24 sm:py-32">
      <Container>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6 text-xs font-medium tracking-widest text-foreground/35 uppercase"
        >
          Active Explorations
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.06 }}
          className="mb-12 max-w-xl text-sm leading-relaxed text-foreground/50"
        >
          A collection of ongoing explorations around operational intelligence, AI-native systems, workflow orchestration, and trust infrastructure.
        </motion.p>

        <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {explorations.map((exploration, i) => (
            <motion.div
              key={exploration.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex flex-col gap-4 rounded-sm border border-border/40 bg-card/50 p-6"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-medium text-foreground">{exploration.title}</h3>
                <span className="shrink-0 text-xs text-foreground/35">{exploration.status}</span>
              </div>

              <p className="text-sm leading-relaxed text-foreground/55">{exploration.description}</p>

              {exploration.transforms && (
                <ul className="space-y-1.5">
                  {exploration.transforms.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-xs text-foreground/40">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/20" />
                      {t}
                    </li>
                  ))}
                </ul>
              )}

              {exploration.cta && (
                <Link
                  href={exploration.cta.href}
                  className="mt-auto text-xs text-foreground/50 transition-colors hover:text-foreground"
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
