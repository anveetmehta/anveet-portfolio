'use client';

import { cn } from '@/lib/cn';

type LogoProps = {
  size?: number;
  withWordmark?: boolean;
  animated?: boolean;
  className?: string;
};

export function Logo({ size = 28, withWordmark = false, animated = false, className }: LogoProps) {
  const s = size;
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        className="relative inline-block shrink-0"
        style={{ width: s, height: s }}
        aria-hidden
      >
        {/* outer dashed ring */}
        <span
          className={cn(
            'absolute inset-0 rounded-full border border-dashed border-accent/40',
            animated && 'animate-[spin_30s_linear_infinite]'
          )}
        />
        {/* inner solid ring */}
        <span
          className="absolute rounded-full border border-accent/25"
          style={{ inset: s * 0.18 }}
        />
        {/* core */}
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
          style={{
            width: s * 0.18, height: s * 0.18,
            boxShadow: `0 0 ${s * 0.4}px hsl(var(--accent) / 0.5)`,
          }}
        />
        {/* satellites */}
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
          style={{ top: 0, left: '50%', width: s * 0.12, height: s * 0.12 }}
        />
        <span
          className="absolute translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/70"
          style={{ top: '50%', right: 0, width: s * 0.1, height: s * 0.1 }}
        />
        <span
          className="absolute -translate-x-1/2 translate-y-1/2 rounded-full bg-emerald-400"
          style={{
            bottom: '14%', left: '20%',
            width: s * 0.085, height: s * 0.085,
            boxShadow: `0 0 ${s * 0.3}px hsl(140 75% 60% / 0.5)`,
          }}
        />
      </span>

      {withWordmark && (
        <span className="text-sm font-medium text-foreground/85">Anveet Mehta</span>
      )}
    </span>
  );
}
