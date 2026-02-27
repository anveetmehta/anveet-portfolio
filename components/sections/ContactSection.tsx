import { Section } from '@/components/Section';
import { siteMeta } from '@/content/content';

export function ContactSection() {
  return (
    <Section
      id="contact"
      title="Contact"
      description="If you're hiring for systems PM roles or building risk/compliance platforms, email me."
      variant="muted"
    >
      <div className="max-w-2xl">
        <a
          href={`mailto:${siteMeta.email}`}
          className="text-xl font-semibold text-accent transition-colors hover:text-accent/80 sm:text-2xl"
        >
          {siteMeta.email}
        </a>
        <div className="mt-5 flex flex-wrap gap-2">
          {siteMeta.socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border/70 bg-card/80 px-4 py-1.5 text-sm font-medium text-foreground/75 transition-colors hover:border-accent/40 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
