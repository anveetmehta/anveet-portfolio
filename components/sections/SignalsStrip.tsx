'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Container } from '@/components/Container';
import { signals, type Signal } from '@/content/content';

function parseNumeric(val: string): { num: number; suffix: string } | null {
  const m = val.match(/^(\d+(?:\.\d+)?)(.*)/);
  return m ? { num: parseFloat(m[1]), suffix: m[2] } : null;
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate(v) {
        el.textContent = Math.round(v).toLocaleString() + suffix;
      },
    });
    return controls.stop;
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

type SignalsStripProps = { data?: Signal[] };

export function SignalsStrip({ data = signals }: SignalsStripProps) {
  return (
    <div className="border-b border-t border-border/30 bg-card/20 py-12">
      <Container>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:flex lg:justify-between lg:gap-0">
          {data.map((signal, i) => {
            const parsed = parseNumeric(signal.value);
            return (
              <motion.div
                key={signal.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.09 }}
                className="flex flex-col gap-2"
              >
                <span className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  {parsed ? (
                    <AnimatedCounter value={parsed.num} suffix={parsed.suffix} />
                  ) : (
                    signal.value
                  )}
                </span>
                <span className="text-xs text-foreground/40">{signal.label}</span>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
