import { cn } from '@/lib/cn';

type Platform = 'linkedin' | 'medium' | 'blog' | 'all';

const platformStyles: Record<Platform, string> = {
  linkedin: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  medium: 'bg-green-500/10 text-green-600 dark:text-green-400',
  blog: 'bg-accent/10 text-accent',
  all: 'bg-muted text-foreground/60',
};

const platformLabels: Record<Platform, string> = {
  linkedin: 'LinkedIn',
  medium: 'Medium',
  blog: 'Blog',
  all: 'All',
};

export function PlatformBadge({ platform }: { platform: Platform }) {
  return (
    <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', platformStyles[platform])}>
      {platformLabels[platform]}
    </span>
  );
}
