'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/Container';
import { signals } from '@/content/content';

export function SignalsStrip() {
  return (
    <div className="border-b border-t border-border/30 py-8">
      <Container>
        <div className="flex flex-wrap justify-between gap-y-6">
          {signals.map((signal, i) => (
            <motion.div
              key={signal.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col gap-1"
            >
              <span className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {signal.value}
              </span>
              <span className="text-xs text-foreground/40">
                {signal.label}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}
