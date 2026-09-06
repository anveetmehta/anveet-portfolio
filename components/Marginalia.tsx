import { type ReactNode } from 'react';

export function Marginalia({ note, children }: { note: ReactNode; children: ReactNode }) {
  return (
    <div className="relative my-6 lg:grid lg:grid-cols-[1fr_minmax(160px,200px)] lg:gap-8">
      <div>{children}</div>
      <aside
        aria-label="margin note"
        className="mt-3 lg:mt-1 inline-block max-w-[220px] -rotate-[1.5deg] rounded-sm border-l-2 border-accent-warm/60 bg-accent-warm/[0.18] dark:bg-accent-warm/[0.15] px-3 py-2 text-sm leading-snug text-ink-2"
        style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400 }}
      >
        <span aria-hidden className="mr-1 not-italic opacity-60" style={{ fontStyle: 'normal' }}>—</span>
        {note}
      </aside>
    </div>
  );
}
