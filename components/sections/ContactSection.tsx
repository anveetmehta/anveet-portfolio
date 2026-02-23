import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { siteMeta } from '@/content/content';

export function ContactSection() {
  return (
    <Section
      id="contact"
      title="Contact"
      description="Simple contact module with room for future form integrations and analytics events."
    >
      <Card className="max-w-2xl">
        <p className="text-foreground/80">
          For collaborations or conversations, reach out at{' '}
          <a href={`mailto:${siteMeta.email}`} className="font-medium text-accent">
            {siteMeta.email}
          </a>
          .
        </p>
      </Card>
    </Section>
  );
}
