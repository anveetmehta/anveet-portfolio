// components/sections/WorkingPrinciplesSection.tsx — Tier 2, upgrade 06
// Reframes Mental Models as a first-person manifesto.
// Drop in alongside MentalModelsSection (or replace it).

'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/Container';
import { RomanNumeral } from '@/components/SerifHeading';

type Principle = { title: string; body: string };

const PRINCIPLES: Principle[] = [
  { title: 'Diagnose before designing.', body: 'I treat operational pain as architecture before I treat it as a flow.' },
  { title: 'Edge cases first.',          body: 'The exception path reveals the real shape of the system.' },
  { title: 'Trust is infrastructure.',   body: 'Payments, onboarding, compliance — they are coordinated trust, and should be designed accordingly.' },
  { title: 'Measure what shifts.',       body: 'If it doesn\u2019t change a number, it\u2019s decoration.' },
];

export function WorkingPrinciplesSection() {
  return (
    <section id="principles" className="border-b border-border/30 py-24 sm:py-32">
      <Container>
        <p className="mb-10 text-xs font-medium tracking-widest uppercase text-foreground/35">
          How I work
        </p>

        <ol className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex gap-5"
            >
              <RomanNumeral n={i + 1} className="shrink-0 text-2xl" />
              <div>
                <h3
                  className="text-xl tracking-tight"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                >
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65">{p.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
