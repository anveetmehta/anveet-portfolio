import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { writingEntries } from '@/content/content';

export function WritingSection() {
  return (
    <Section
      id="writing"
      title="Writing"
      description="Publishing surface prepared for future blog expansion and editorial workflows."
    >
      <div className="space-y-4">
        {writingEntries.map((entry) => (
          <Card key={entry.title}>
            <p className="text-xs uppercase tracking-wide text-slate-500">{entry.status}</p>
            <h3 className="mt-2 text-lg font-semibold">{entry.title}</h3>
            <p className="mt-2 text-slate-700">{entry.summary}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
