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
          className="mb-12 text-xs font-medium tracking-widest text-foreground/35 uppercase"
        >
          Systems I&apos;ve Helped Shape
        </motion.p>

        <div className="space-y-5">
          {data.map((system, i) => (
            <motion.div
              key={system.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/40 p-8 transition-all duration-300 hover:border-border/70 hover:bg-card/70 lg:p-10"
            >
              {/* Gradient top line — reveals on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Large watermark number */}
              <span className="pointer-events-none absolute bottom-6 right-8 select-none font-bold text-foreground/[0.04] transition-colors duration-300 group-hover:text-foreground/[0.08]"
                style={{ fontSize: '7rem', lineHeight: 1 }}>
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="relative grid gap-8 lg:grid-cols-[2fr_1fr] lg:gap-16">
                <div>
                  <h3 className="text-xl font-semibold text-foreground lg:text-2xl">{system.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-foreground/55">{system.description}</p>
                  {system.operationalFragment && (
                    <blockquote className="mt-6 border-l border-accent/30 pl-4 text-sm italic leading-relaxed text-foreground/35">
                      {system.operationalFragment}
                    </blockquote>
                  )}
                  <p className="mt-6 text-xs text-foreground/30">{system.tags.join(' · ')}</p>
                </div>

                <div>
                  <p className="mb-4 text-xs font-medium uppercase tracking-wider text-foreground/30">
                    Focus areas
                  </p>
                  <ul className="space-y-3">
                    {system.focusAreas.map((area) => (
                      <li key={area} className="flex items-start gap-3 text-sm text-foreground/50">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
