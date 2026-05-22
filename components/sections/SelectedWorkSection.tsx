// components/sections/SelectedWorkSection.tsx — Tier 2, upgrade 05
// A 3-up gallery of abstract project moments. Place above ShapedSystemsSection.
// Each moment is a programmatic SVG composition — no asset dependencies.
//
// Replace the moments[] array with real screenshots/diagrams when available;
// the SVG fallback is a stand-in.

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/Container';

type Moment = {
  title: string;
  href: string;
  tone: 'blue' | 'amber' | 'violet';
  motif: 'flow' | 'mesh' | 'strata';
};

const MOMENTS: Moment[] = [
  { title: 'Onboarding state machine',  href: '/case-studies/guided-onboarding-system',   tone: 'blue',   motif: 'flow' },
  { title: 'Risk decision architecture', href: '/case-studies/workflow-visibility-platform', tone: 'amber',  motif: 'mesh' },
  { title: 'Workflow cognition layers',  href: '#',                                          tone: 'violet', motif: 'strata' },
];

export function SelectedWorkSection() {
  return (
    <section id="selected-work" className="border-b border-border/30 py-24 sm:py-32">
      <Container>
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-foreground/35">Selected Work</p>
            <h2 className="mt-3 max-w-md text-2xl font-semibold leading-tight tracking-tight sm:text-3xl"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}>
              Operational systems, made <em>tangible.</em>
            </h2>
          </div>
          <Link href="/case-studies" className="hidden text-xs text-foreground/40 hover:text-foreground/70 sm:inline">All work →</Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MOMENTS.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="paper-card group relative overflow-hidden rounded-2xl border border-border/50 bg-card/60"
            >
              <Link href={m.href} className="block">
                <div className="aspect-[4/3] relative">
                  <Motif tone={m.tone} motif={m.motif} />
                </div>
                <div className="p-5">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-foreground/45">
                    {m.motif}
                  </p>
                  <h3 className="mt-1.5 text-sm font-medium text-foreground/85 transition-colors group-hover:text-foreground">
                    {m.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Motif({ tone, motif }: { tone: Moment['tone']; motif: Moment['motif'] }) {
  const stroke = {
    blue:   'hsl(221 83% 53% / 0.6)',
    amber:  'hsl(28 88% 50% / 0.55)',
    violet: 'hsl(265 60% 55% / 0.6)',
  }[tone];
  const bg = {
    blue:   'hsl(221 83% 53% / 0.08)',
    amber:  'hsl(28 88% 50% / 0.10)',
    violet: 'hsl(265 60% 55% / 0.08)',
  }[tone];

  return (
    <div className="absolute inset-0" style={{ background: bg }}>
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--foreground) / 0.08) 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 150" fill="none" preserveAspectRatio="xMidYMid meet">
        {motif === 'flow' && (
          <g stroke={stroke} strokeWidth="1.4" fill="none">
            <path d="M20 40 Q 80 40 100 75 T 180 110" />
            <path d="M20 75 Q 80 75 100 75 T 180 75" />
            <path d="M20 110 Q 80 110 100 75 T 180 40" />
            <circle cx="20" cy="40" r="3" fill={stroke} /><circle cx="20" cy="75" r="3" fill={stroke} /><circle cx="20" cy="110" r="3" fill={stroke} />
            <circle cx="180" cy="40" r="3" fill={stroke} /><circle cx="180" cy="75" r="3" fill={stroke} /><circle cx="180" cy="110" r="3" fill={stroke} />
          </g>
        )}
        {motif === 'mesh' && (
          <g>
            <g stroke={stroke} strokeWidth="0.8" strokeDasharray="3 3">
              <line x1="40" y1="30" x2="120" y2="40"/>
              <line x1="120" y1="40" x2="170" y2="90"/>
              <line x1="170" y1="90" x2="80" y2="120"/>
              <line x1="80" y1="120" x2="40" y2="30"/>
              <line x1="40" y1="30" x2="170" y2="90"/>
              <line x1="120" y1="40" x2="80" y2="120"/>
            </g>
            <g fill={stroke}>
              <circle cx="40" cy="30" r="4"/><circle cx="120" cy="40" r="5"/>
              <circle cx="170" cy="90" r="4"/><circle cx="80" cy="120" r="4"/>
            </g>
          </g>
        )}
        {motif === 'strata' && (
          <g fill={stroke}>
            <rect x="20"  y="110" width="100" height="6" rx="2" opacity="0.4"/>
            <rect x="20"  y="92"  width="140" height="6" rx="2" opacity="0.55"/>
            <rect x="20"  y="74"  width="120" height="6" rx="2" opacity="0.70"/>
            <rect x="20"  y="56"  width="160" height="6" rx="2" opacity="0.85"/>
            <rect x="20"  y="38"  width="90"  height="6" rx="2"/>
          </g>
        )}
      </svg>
    </div>
  );
}
