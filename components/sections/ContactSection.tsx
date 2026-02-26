import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { siteMeta } from '@/content/content';

export function ContactSection() {
  return (
    <Section
      id="contact"
      title="Contact"
      description="If you're hiring for systems PM roles or building risk/compliance platforms, email me."
    >
      <Card className="max-w-2xl">
        <p className="text-foreground/80">
          Reach out at{' '}
          <a href={`mailto:${siteMeta.email}`} className="font-medium text-accent">
            {siteMeta.email}
          </a>
        </p>
        <div className="mt-4 flex gap-4">
          {siteMeta.socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent"
            >
              {link.label} →
            </a>
          ))}
        </div>
      </Card>
    </Section>
  );
}
