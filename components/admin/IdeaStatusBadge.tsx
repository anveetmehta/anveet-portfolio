import { cn } from '@/lib/cn';

type IdeaStatus = 'captured' | 'prioritized' | 'generating' | 'generated' | 'archived';

const statusStyles: Record<IdeaStatus, string> = {
  captured: 'bg-muted text-foreground/60',
  prioritized: 'bg-accent/10 text-accent',
  generating: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 animate-pulse',
  generated: 'bg-green-500/15 text-green-700 dark:text-green-300',
  archived: 'bg-muted text-foreground/30',
};

const statusLabels: Record<IdeaStatus, string> = {
  captured: 'captured',
  prioritized: 'prioritized',
  generating: 'generating…',
  generated: 'generated',
  archived: 'archived',
};

export function IdeaStatusBadge({ status }: { status: IdeaStatus }) {
  return (
    <span className={cn('rounded-full px-3 py-1 text-xs font-medium uppercase', statusStyles[status])}>
      {statusLabels[status]}
    </span>
  );
}
