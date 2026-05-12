'use client';

const THINKING_ITEMS = [
  'Adaptive operational systems',
  'Human-AI orchestration',
  'Workflow cognition',
  'Trust infrastructure evolution',
  'Machine-assisted judgment',
  'Operational intelligence as interface',
  'Regulated system design',
  'AI-native compliance workflows',
  'Latent system knowledge',
  'Invisible competitive infrastructure',
  'Context-aware automation',
  'Founder-operator mental models',
];

const SEPARATOR = '·';

export function ThinkingStrip() {
  const items = [...THINKING_ITEMS, ...THINKING_ITEMS];

  return (
    <div className="relative overflow-hidden border-t border-b border-border/20 py-3">
      <p className="sr-only">Currently thinking about: {THINKING_ITEMS.join(', ')}</p>

      {/* Left fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" aria-hidden />
      {/* Right fade */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" aria-hidden />

      <div
        className="flex gap-0 whitespace-nowrap"
        style={{ animation: 'marquee 36s linear infinite' }}
        aria-hidden
      >
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-4 text-[11px] font-medium tracking-widest text-foreground/25 uppercase">
            {item}
            <span className="text-foreground/12 text-[8px]">{SEPARATOR}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
