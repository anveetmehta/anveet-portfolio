'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/Container';
import { shapedSystems, type ShapedSystem } from '@/content/content';

type ShapedSystemsSectionProps = { data?: ShapedSystem[] };

export function ShapedSystemsSection({ data = shapedSystems }: ShapedSystemsSectionProps) {
  return (
    <section id="systems" className="border-b border-border/30 py-24 sm:py-32">
      <Container>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6 text-xs font-medium tracking-widest text-foreground/35 uppercase"
        >
          Systems I&apos;ve Helped Shape
        </motion.p>

        <div className="space-y-px">
          {data.map((system, i) => (
            <motion.div
              key={system.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group relative border-l-2 border-border/30 py-10 pl-8 transition-colors hover:border-accent/50"
            >
              <div className="max-w-2xl">
                <h3 className="text-lg font-medium text-foreground">{system.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/55">{system.description}</p>
                <ul className="mt-5 space-y-2">
                  {system.focusAreas.map((area) => (
                    <li key={area} className="flex items-start gap-3 text-sm text-foreground/45">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/25" />
                      {area}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-foreground/30">{system.tags.join(' · ')}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
