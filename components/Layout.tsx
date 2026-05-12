'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container } from '@/components/Container';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ScrollProgress } from '@/components/ScrollProgress';
import { siteMeta } from '@/content/content';

type NavPreview = {
  label: string;
  items: string[];
};

const NAV_ITEMS: { label: string; href: string; preview?: NavPreview }[] = [
  { label: 'The System', href: '#systems-layer' },
  { label: 'Systems', href: '#systems' },
  {
    label: 'Explorations',
    href: '#explorations',
    preview: {
      label: 'Active Explorations',
      items: ['RegRadar', 'Council of Elites', 'Workflow Intelligence Systems'],
    },
  },
  { label: 'Signals', href: '#signals-engine' },
  {
    label: 'Notes',
    href: '#notes',
    preview: {
      label: 'Recent Notes',
      items: [
        'Why operational complexity compounds invisibly',
        'False positives are a workflow problem',
        'AI copilots for operational systems',
      ],
    },
  },
  { label: 'Open Threads', href: '#open-threads' },
];

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openPreview(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActivePreview(label);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setActivePreview(null), 120);
  }

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

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
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.preview ? openPreview(item.label) : undefined}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    href={item.href}
                    className="text-foreground/45 transition-colors hover:text-foreground/80"
                  >
                    {item.label}
                  </Link>

                  <AnimatePresence>
                    {item.preview && activePreview === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        onMouseEnter={() => openPreview(item.label)}
                        onMouseLeave={scheduleClose}
                        className="absolute left-1/2 top-[calc(100%+10px)] z-50 -translate-x-1/2 w-56"
                      >
                        {/* Arrow */}
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-l border-t border-border/40 bg-card" />
                        <div className="relative overflow-hidden rounded-xl border border-border/40 bg-card/95 py-3 shadow-xl shadow-black/20 backdrop-blur-md">
                          <p className="px-4 pb-2 text-[10px] font-medium tracking-widest text-foreground/30 uppercase">
                            {item.preview.label}
                          </p>
                          {item.preview.items.map((sub) => (
                            <Link
                              key={sub}
                              href={item.href}
                              className="block px-4 py-1.5 text-xs text-foreground/55 transition-colors hover:bg-muted/50 hover:text-foreground/90"
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
