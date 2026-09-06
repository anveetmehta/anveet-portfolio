// components/sections/RightNowSection.tsx — Tier 1, upgrade 03
// A monthly-updated block. Sits right under the hero (or above OpenThreads).
// Edit the entries array directly in this file — that's the whole point.

'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/Container';

type Entry = { when: string; text: string };

const RIGHT_NOW: Entry[] = [
  { when: 'Nov',   text: 'Shipping the RegRadar private beta with two design-partner banks.' },
  { when: 'Week',  text: 'Drafting a piece on machine-assisted interpretation in regulated environments.' },
  { when: 'Today', text: 'Reading: Working in Public — Nadia Eghbal. Coffee no. 3.' },
];

export function RightNowSection() {
  return (
    <section id="now" className="border-b border-border py-20">
      <Container>
        <div className="max-w-2xl">
          <div className="flex items-center gap-2.5 text-[10px] font-medium tracking-widest uppercase text-emerald-700 dark:text-emerald-300/85">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500/85" />
            </span>
            Right Now
          </div>

          <ul className="mt-6 divide-y divide-border/20">
            {RIGHT_NOW.map((e, i) => (
              <motion.li
                key={e.when + i}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="grid grid-cols-[64px_1fr] gap-4 py-3.5 text-sm leading-relaxed text-ink"
              >
                <span className="font-mono text-[10px] tracking-widest text-ink-2 uppercase mt-0.5">
                  {e.when}
                </span>
                <span>{e.text}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
