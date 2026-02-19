import Link from 'next/link';
import { type ReactNode } from 'react';
import { Container } from '@/components/Container';
import { siteMeta } from '@/content/content';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            {siteMeta.name}
          </Link>
          <nav className="flex items-center gap-6 text-sm text-slate-600">
            <Link href="/">Home</Link>
            <Link href="/case-studies">Case Studies</Link>
          </nav>
        </Container>
      </header>
      <main>{children}</main>
      <footer className="border-t border-slate-200 py-10 text-sm text-slate-600">
        <Container>
          <p>
            {siteMeta.name} · {siteMeta.location} · <a href={`mailto:${siteMeta.email}`}>{siteMeta.email}</a>
          </p>
        </Container>
      </footer>
    </div>
  );
}
