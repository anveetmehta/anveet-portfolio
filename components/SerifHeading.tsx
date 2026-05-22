// components/SerifHeading.tsx — Tier 1, upgrade 01
// Pair Instrument Serif (italic display) with Geist sans on hero h1s and pulled
// quotes. Use as a drop-in replacement for the existing accent-gradient span.
//
// Example:
//   <h1 className="text-5xl font-semibold leading-[1.06] tracking-tight ...">
//     {before}
//     <SerifAccent>{accentPart}</SerifAccent>
//   </h1>

'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function SerifAccent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <em
      className={cn(
        'font-serif italic font-normal not-italic-fallback',
        'bg-gradient-to-r from-accent to-violet-500 bg-clip-text text-transparent',
        'dark:from-blue-400 dark:to-violet-400',
        className
      )}
      style={{ fontStyle: 'italic' }}
    >
      {children}
    </em>
  );
}

// Pure serif heading, for section labels and pulled quotes
export function SerifHeading({ children, className, as: As = 'h2' }: { children: ReactNode; className?: string; as?: 'h1' | 'h2' | 'h3' }) {
  return (
    <As className={cn('font-serif font-normal tracking-tight', className)} style={{ fontFamily: 'var(--font-display)' }}>
      {children}
    </As>
  );
}

// Roman numeral (i. ii. iii. ...) for the working-principles list
export function RomanNumeral({ n, className }: { n: number; className?: string }) {
  const numerals = ['', 'i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];
  return (
    <span
      className={cn('font-serif italic text-foreground/40', className)}
      style={{ fontFamily: 'var(--font-display)' }}
    >
      {numerals[n] ?? n}.
    </span>
  );
}

/* tailwind.config.ts addition needed:
   fontFamily: {
     sans:  ['var(--font-geist-sans)', ...],
     mono:  ['var(--font-geist-mono)', ...],
     serif: ['var(--font-instrument-serif)', 'Iowan Old Style', 'Georgia', 'serif'],
   }
*/
