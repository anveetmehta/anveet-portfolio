'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/Container';
import { systemsLayerContent } from '@/content/content';

export function SystemsLayerSection() {
  return (
    <section id="systems-layer" className="border-b border-border/30 py-24 sm:py-32">
      <Container>
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-6 text-xs font-medium tracking-widest text-foreground/35 uppercase"
          >
            {systemsLayerContent.label}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            {systemsLayerContent.headline}
          </motion.h2>

          <div className="mt-8 space-y-5">
            {systemsLayerContent.body.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.05 }}
                className="text-base leading-relaxed text-foreground/60"
              >
                {para}
              </motion.p>
            ))}
          </div>

          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mt-8 space-y-2"
          >
            {systemsLayerContent.systemTypes.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-foreground/45">
                <span className="h-px w-4 shrink-0 bg-foreground/20" />
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="mt-10 text-base font-medium text-foreground/70"
          >
            {systemsLayerContent.closing}
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
