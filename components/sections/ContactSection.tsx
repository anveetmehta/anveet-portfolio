'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { MailIcon } from '@/components/icons/SectionIcons';
import { siteMeta } from '@/content/content';

export function ContactSection() {
  return (
    <Section
      id="contact"
      title="Contact"
      description="If you're hiring for systems PM roles or building risk/compliance platforms, email me."
      variant="muted"
      icon={<MailIcon />}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl"
      >
        <a
          href={`mailto:${siteMeta.email}`}
          className="text-xl font-semibold text-accent transition-colors hover:text-accent/80 sm:text-2xl"
        >
          {siteMeta.email}
        </a>
        <div className="mt-5 flex flex-wrap gap-2">
          {siteMeta.socialLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
              className="rounded-full border border-border/70 bg-card/80 px-4 py-1.5 text-sm font-medium text-foreground/75 transition-colors hover:border-accent/40 hover:text-accent"
            >
              {link.label}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
