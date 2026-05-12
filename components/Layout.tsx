'use client';

import Link from 'next/link';
import { type ReactNode } from 'react';
import { Container } from '@/components/Container';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ScrollProgress } from '@/components/ScrollProgress';
import { siteMeta } from '@/content/content';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <ScrollProgress />

      <header className="sticky top-0 z-20 border-b border-border/40 bg-background/90 backdrop-blur-md">
        <Container className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            {siteMeta.name}
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-5 text-sm md:flex">
              {[
                { label: 'The System', href: '#systems-layer' },
                { label: 'Systems', href: '#systems' },
                { label: 'Explorations', href: '#explorations' },
                { label: 'Signals', href: '#signals-engine' },
                { label: 'Notes', href: '#notes' },
                { label: 'Open Threads', href: '#open-threads' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-foreground/45 transition-colors hover:text-foreground/80"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="border-l border-border/40 pl-4">
              <ThemeToggle />
            </div>
          </div>
        </Container>
      </header>

      <main>{children}</main>

      <footer className="border-t border-border/30 py-10">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <span className="text-foreground/35">{siteMeta.name}</span>

            <div className="flex items-center gap-5 text-foreground/40">
              {siteMeta.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground/70"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`mailto:${siteMeta.email}`}
                className="transition-colors hover:text-foreground/70"
              >
                Email
              </a>
              <a
                href="/rss.xml"
                className="transition-colors hover:text-foreground/70"
              >
                RSS
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
