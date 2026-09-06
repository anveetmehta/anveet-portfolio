import { cn } from '@/lib/cn';

export type NoteMaturity = 'seedling' | 'budding' | 'evergreen';

const styles: Record<NoteMaturity, string> = {
  seedling:  'border-amber-500/40   bg-amber-500/10   text-amber-700   dark:text-amber-300',
  budding:   'border-accent/40      bg-accent/10      text-accent      dark:text-accent',
  evergreen: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
};

const labels: Record<NoteMaturity, string> = {
  seedling: 'seedling',
  budding: 'budding',
  evergreen: 'evergreen',
};

export function NoteMaturityBadge({ maturity, className }: { maturity: NoteMaturity; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-widest uppercase',
        styles[maturity],
        className
      )}
    >
      <span aria-hidden className="mr-1.5">
        {maturity === 'seedling'  && '🌱'}
        {maturity === 'budding'   && '🪴'}
        {maturity === 'evergreen' && '🌲'}
      </span>
      {labels[maturity]}
    </span>
  );
}
