import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type AccentColor = 'none' | 'blue' | 'amber' | 'green';

type CardProps = {
  children: ReactNode;
  className?: string;
  accentColor?: AccentColor;
  dashed?: boolean;
};

const accentStyles: Record<AccentColor, string> = {
  none: '',
  blue: 'border-l-4 border-l-accent',
  amber: 'border-l-4 border-l-accent-warm',
  green: 'border-l-4 border-l-emerald-500'
};

export function Card({ children, className, accentColor = 'none', dashed = false }: CardProps) {
  return (
    <article
      className={cn(
        'rounded-2xl border border-border/80 bg-card/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300',
        accentStyles[accentColor],
        dashed && 'border-dashed opacity-75',
        className
      )}
    >
      {children}
    </article>
  );
}
