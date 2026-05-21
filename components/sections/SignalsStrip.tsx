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
  const hasDescriptions = data.some((s) => s.description);

  return (
    <div className="border-b border-t border-border/30 bg-card/20 py-12">
      <Container>
        <div className={
          hasDescriptions
            ? 'grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
            : 'grid grid-cols-2 gap-10 sm:grid-cols-3 lg:flex lg:justify-between lg:gap-0'
        }>
          {data.map((signal, i) => {
            const parsed = parseNumeric(signal.value);
            return (
              <motion.div
                key={signal.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex flex-col gap-1.5"
              >
                {/* Value */}
                <span
                  className={
                    hasDescriptions
                      ? 'text-xl font-bold tracking-tight text-foreground'
                      : 'text-4xl font-bold tracking-tight text-foreground sm:text-5xl'
                  }
                  style={{ hyphens: 'none', overflowWrap: 'normal' }}
                >
                  {parsed ? (
                    <AnimatedCounter value={parsed.num} suffix={parsed.suffix} />
                  ) : (
                    signal.value
                  )}
                </span>

                {/* Label */}
                <span className={hasDescriptions ? 'text-xs font-medium text-foreground/50' : 'text-xs text-foreground/40'}>
                  {signal.label}
                </span>

                {/* Description */}
                {signal.description && (
                  <p className="mt-1 text-xs leading-relaxed text-foreground/35">
                    {signal.description}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
