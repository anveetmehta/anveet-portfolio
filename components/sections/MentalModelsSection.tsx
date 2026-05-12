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
          className="mb-12 text-xs font-medium tracking-widest text-foreground/35 uppercase"
        >
          Mental Models
        </motion.p>

        <div className="grid gap-px sm:grid-cols-2">
          {data.map((model, i) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="border border-border/40 bg-card/30 p-8"
            >
              <h3 className="text-base font-medium text-foreground">{model.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/50">{model.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
