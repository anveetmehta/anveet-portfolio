import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { type WritingEntry } from '@/content/content';

interface WritingSectionProps {
  entries: WritingEntry[];
}

export function WritingSection({ entries }: WritingSectionProps) {
  return (
    <Section
      id="writing"
      title="Writing"
      description="Publishing layer prepared for blog expansion and editorial experiments."
    >
      <div className="space-y-4">
        {entries.map((entry) => (
          <Card key={entry.id ?? entry.title}>
            <p className="text-xs uppercase tracking-wide text-foreground/50">{entry.status}</p>
            <h3 className="mt-2 text-lg font-semibold">{entry.title}</h3>
            <p className="mt-2 text-foreground/75">{entry.summary}</p>
            {entry.publishedAt ? (
              <p className="mt-3 text-sm text-foreground/60">
                Published {new Date(entry.publishedAt).toLocaleDateString()}
              </p>
            ) : null}
          </Card>
        ))}
      </div>
    </Section>
  );
}
