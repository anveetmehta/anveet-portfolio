import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { aboutContent } from '@/content/content';

export function AboutSection() {
  return (
    <Section id="about" title="About">
      <Card accentColor="blue" className="max-w-4xl space-y-4">
        <p className="leading-relaxed text-foreground/80">{aboutContent.intro}</p>
        <p className="leading-relaxed text-foreground/80">{aboutContent.body}</p>
      </Card>
      <div className="mt-8 max-w-4xl">
        <h3 className="text-lg font-semibold">What I&apos;m known for</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-foreground/75">
          {aboutContent.knownFor.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
