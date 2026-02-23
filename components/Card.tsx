import { type ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <article className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className ?? ''}`}>
      {children}
    </article>
  );
}
