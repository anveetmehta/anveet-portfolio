import { type ReactNode } from 'react';
import { Container } from '@/components/Container';
import { cn } from '@/lib/cn';

type SectionVariant = 'default' | 'muted';

type SectionProps = {
  id?: string;
  title: string;
  description?: string;
  variant?: SectionVariant;
  children: ReactNode;
};

export function Section({ id, title, description, variant = 'default', children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-10 sm:py-14',
        variant === 'muted' && 'bg-muted/40'
      )}
    >
      <Container>
        <header className="mb-8 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          {description ? <p className="mt-3 text-foreground/70">{description}</p> : null}
        </header>
        {children}
      </Container>
    </section>
  );
}
