import { Section } from '@/components/Section';
import { nowItems } from '@/content/content';

export function NowSection() {
  return (
    <Section
      id="now"
      title="Now"
      description="Themes I'm exploring through small builds."
    >
      <ul className="max-w-3xl space-y-3">
        {nowItems.map((item) => (
          <li key={item} className="flex items-start gap-3 text-foreground/75">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
