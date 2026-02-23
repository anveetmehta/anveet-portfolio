import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <article
      className={cn(
        'rounded-2xl border border-border/80 bg-card/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300',
        className
      )}
    >
    <article className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className ?? ''}`}>
      {children}
    </article>
  );
}
