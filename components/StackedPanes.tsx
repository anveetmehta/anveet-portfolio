'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

type Pane = { id: string; href?: string; render: () => ReactNode };
type Ctx = { panes: Pane[]; push: (p: Pane) => void; clearAfter: (id: string) => void };

const StackContext = createContext<Ctx | null>(null);

export function StackedPanes({ rootPane }: { rootPane: Pane }) {
  const [panes, setPanes] = useState<Pane[]>([rootPane]);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const push = useCallback((p: Pane) => {
    setPanes((cur) => {
      if (cur.some((x) => x.id === p.id)) return cur;
      return [...cur, p];
    });
  }, []);

  const clearAfter = useCallback((id: string) => {
    setPanes((cur) => {
      const i = cur.findIndex((p) => p.id === id);
      return i < 0 ? cur : cur.slice(0, i + 1);
    });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
  }, [panes.length]);

  return (
    <StackContext.Provider value={{ panes, push, clearAfter }}>
      <div
        ref={scrollerRef}
        className="flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth border-y border-border bg-muted/20 py-12"
        style={{ scrollbarWidth: 'thin' }}
      >
        {panes.map((p, i) => (
          <article
            key={p.id}
            className="snap-start shrink-0 w-[min(620px,92vw)] px-6 first:pl-12 last:pr-12"
            data-stack-index={i}
          >
            <div className="paper-card relative h-full rounded-2xl p-8">
              {p.render()}
            </div>
          </article>
        ))}
      </div>
    </StackContext.Provider>
  );
}

export function PaneLink({ href, children, paneId, getPane }: { href: string; children: ReactNode; paneId: string; getPane: () => ReactNode }) {
  const ctx = useContext(StackContext);
  if (!ctx) return <a href={href}>{children}</a>;

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        ctx.push({ id: paneId, href, render: getPane });
      }}
      className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
    >
      {children}
    </a>
  );
}
