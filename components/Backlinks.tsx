import Link from 'next/link';
import { NoteMaturityBadge, type NoteMaturity } from '@/components/NoteMaturityBadge';

export type Backlink = {
  slug: string;
  title: string;
  excerpt?: string;
  maturity?: NoteMaturity;
};

export function Backlinks({ items }: { items: Backlink[] }) {
  if (!items?.length) return null;
  return (
    <aside className="mt-16 border-t border-border pt-8">
      <p className="font-mono text-[10px] tracking-widest uppercase text-ink-3">
        Notes that link here &middot; {items.length}
      </p>
      <ul className="mt-6 space-y-3">
        {items.map((b) => (
          <li key={b.slug}>
            <Link
              href={`/writing/${b.slug}`}
              className="group flex items-baseline gap-3 text-sm text-ink-2 transition-colors hover:text-ink"
            >
              <span aria-hidden className="font-mono text-xs text-accent">↳</span>
              <span className="flex-1">
                <em
                  className="text-base not-italic tracking-tight"
                  style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400 }}
                >
                  {b.title}
                </em>
                {b.excerpt && (
                  <span className="ml-2 text-xs text-ink-3">— {b.excerpt}</span>
                )}
              </span>
              {b.maturity && <NoteMaturityBadge maturity={b.maturity} />}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
