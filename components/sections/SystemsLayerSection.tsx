'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/Container';
import { systemsLayerContent, type SystemsLayerContent } from '@/content/content';

type SystemsLayerSectionProps = { data?: SystemsLayerContent };

export function SystemsLayerSection({ data = systemsLayerContent }: SystemsLayerSectionProps) {
  return (
    <section id="systems-layer" className="relative overflow-hidden border-b border-border/30 py-24 sm:py-32">
      {/* Subtle right-side gradient accent */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2"
        style={{ background: 'radial-gradient(ellipse at 80% 50%, hsl(var(--accent) / 0.03) 0%, transparent 70%)' }}
        aria-hidden
      />

      <Container>
        <div className="grid gap-16 lg:grid-cols-[3fr_2fr] lg:gap-24">

          {/* Left: narrative content */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-6 text-xs font-medium tracking-widest text-foreground/35 uppercase"
            >
              {data.label}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl"
            >
              {data.headline}
            </motion.h2>

            <div className="mt-8 space-y-5">
              {data.body.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.14 + i * 0.06 }}
                  className="text-base leading-relaxed text-foreground/65"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <motion.blockquote
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.4 }}
              className="mt-10 border-l-2 border-accent/40 pl-5 text-base font-medium italic text-foreground/65"
            >
              {data.closing}
            </motion.blockquote>
          </div>

          {/* Right: system types chip grid */}
          <div className="flex items-center lg:items-start lg:pt-20">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1"
            >
              {data.systemTypes.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.28 + i * 0.05 }}
                  className="flex items-center gap-3 rounded-lg border border-border/40 bg-card/40 px-4 py-3 text-sm text-foreground/55 transition-colors hover:border-border/60 hover:text-foreground/75"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
