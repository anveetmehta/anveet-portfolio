import { Section } from '@/components/Section';
import { nowItems } from '@/content/content';

export function NowSection() {
  return (
    <Section
      id="now"
      title="Now"
      description="Themes I'm exploring through small builds."
    >
      <div className="flex flex-wrap gap-2.5">
        {nowItems.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border/70 bg-card/80 px-4 py-2 text-sm text-foreground/75 shadow-sm transition-colors hover:border-accent/40 hover:text-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </Section>
  );
}
