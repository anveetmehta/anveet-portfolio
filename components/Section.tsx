import { type ReactNode } from 'react';
import { Container } from '@/components/Container';

type SectionProps = {
  id?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function Section({ id, title, description, children }: SectionProps) {
  return (
    <section id={id} className="py-16 sm:py-20">
      <Container>
        <header className="mb-8 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          {description ? <p className="mt-3 text-slate-600">{description}</p> : null}
        </header>
        {children}
      </Container>
    </section>
  );
}
