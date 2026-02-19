import { Section } from '@/components/Section';
import { siteMeta } from '@/content/content';

export function ContactSection() {
  return (
    <Section
      id="contact"
      title="Contact"
      description="Simple contact module with room for future form integrations and analytics events."
    >
      <p className="text-slate-700">
        For collaborations or conversations, reach out at{' '}
        <a href={`mailto:${siteMeta.email}`} className="font-medium">
          {siteMeta.email}
        </a>
        .
      </p>
    </Section>
  );
}
