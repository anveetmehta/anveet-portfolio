'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/Container';
import { mentalModels, type MentalModel } from '@/content/content';

type MentalModelsSectionProps = { data?: MentalModel[] };

export function MentalModelsSection({ data = mentalModels }: MentalModelsSectionProps) {
  return (
    <section id="mental-models" className="border-b border-border/30 py-24 sm:py-32">
      <Container>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-14 text-xs font-medium tracking-widest text-foreground/35 uppercase"
        >
          Mental Models
        </motion.p>

        <div className="grid gap-5 sm:grid-cols-2">
          {data.map((model, i) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/30 p-8 transition-all duration-200 hover:border-border/60 hover:bg-card/60"
            >
              {/* Top gradient shimmer */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

              <span className="mb-5 block font-mono text-xs tracking-wider text-foreground/20">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-lg font-semibold text-foreground">{model.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/50">{model.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
