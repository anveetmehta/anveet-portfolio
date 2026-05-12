'use client';

const THINKING_ITEMS = [
  'Adaptive operational systems',
  'Workflow cognition',
  'Human-AI orchestration',
  'Operational entropy',
  'Machine-assisted judgment',
  'Trust infrastructure',
  'AI-native workflows',
  'Real-time compliance cognition',
  'Operational decision architecture',
  'Onboarding system design',
  'Risk interpretation layers',
  'Workflow intelligence',
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
