import { cn } from '@/lib/cn';
import { type PostStatus } from '@/lib/admin-posts';

const statusStyles: Record<PostStatus, string> = {
  draft: 'bg-muted text-foreground/60',
  review: 'bg-accent/10 text-accent',
  approved: 'bg-green-500/10 text-green-600 dark:text-green-400',
  published: 'bg-green-500/15 text-green-700 dark:text-green-300',
};

export function StatusBadge({ status }: { status: PostStatus }) {
  return (
    <span
      className={cn(
        'rounded-full px-3 py-1 text-xs font-medium uppercase',
        statusStyles[status]
      )}
    >
      {status}
    </span>
  );
}
