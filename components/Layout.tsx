'use client';

import Link from 'next/link';
import { type ReactNode, useState } from 'react';
import { Container } from '@/components/Container';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ScrollProgress } from '@/components/ScrollProgress';
import { useActiveSection } from '@/hooks/useActiveSection';
import { siteMeta } from '@/content/content';
import { cn } from '@/lib/cn';

type NavItem = {
  label: string;
  href: string;
  sectionId: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '/#about', sectionId: 'about' },
  { label: 'Projects', href: '/#projects', sectionId: 'projects' },
  { label: 'Case Studies', href: '/#case-studies', sectionId: 'case-studies' },
  { label: 'How I Think', href: '/#expertise', sectionId: 'expertise' },
  { label: 'Insights', href: '/#insights', sectionId: 'insights' },
  { label: 'Contact', href: '/#contact', sectionId: 'contact' },
];

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const activeSection = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_42%)]">
      <ScrollProgress />
      <header className="sticky top-0 z-20 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            {siteMeta.name}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 text-sm md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.sectionId}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-1.5 transition-colors hover:text-accent',
                  activeSection === item.sectionId
                    ? 'bg-accent/10 font-medium text-accent'
                    : 'text-foreground/70'
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="ml-2 border-l border-border/70 pl-3">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border/70 text-foreground/70 transition-colors hover:text-foreground"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </Container>

        {/* Mobile slide-down menu */}
        {mobileOpen && (
          <div className="border-t border-border/50 bg-background/95 backdrop-blur-md md:hidden">
            <Container className="py-4">
              <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.sectionId}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'rounded-md px-3 py-2.5 text-sm transition-colors',
                      activeSection === item.sectionId
                        ? 'bg-accent/10 font-medium text-accent'
                        : 'text-foreground/70 hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </Container>
          </div>
        )}
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
