import Link from 'next/link';
import { type ReactNode } from 'react';
import { Container } from '@/components/Container';
import { ThemeToggle } from '@/components/ThemeToggle';
import { siteMeta } from '@/content/content';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_42%)]">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            {siteMeta.name}
          </Link>
          <nav className="flex items-center gap-4 text-sm text-foreground/80 sm:gap-6">
            <Link href="/">Home</Link>
            <Link href="/case-studies">Case Studies</Link>
            <ThemeToggle />
          </nav>
        </Container>
      </header>
      <main>{children}</main>
      <footer className="border-t border-border/70 py-12 text-sm text-foreground/70">
        <Container>
          <p>
            {siteMeta.name} · {siteMeta.location} · <a href={`mailto:${siteMeta.email}`}>{siteMeta.email}</a>
          </p>
        </Container>
      </footer>
    </div>
  );
}
