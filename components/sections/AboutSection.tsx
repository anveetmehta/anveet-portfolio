'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { UserIcon } from '@/components/icons/SectionIcons';
import { aboutContent, nowItems } from '@/content/content';

export function AboutSection() {
  return (
    <Section id="about" title="About" icon={<UserIcon />}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
      >
        <Card accentColor="blue" className="max-w-4xl space-y-4">
          <p className="leading-relaxed text-foreground/80">{aboutContent.intro}</p>
          <p className="leading-relaxed text-foreground/80">{aboutContent.body}</p>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-8 max-w-4xl"
      >
        <h3 className="text-lg font-semibold">What I&apos;m known for</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-foreground/75">
          {aboutContent.knownFor.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-8 max-w-4xl"
      >
        <h3 className="text-lg font-semibold">Currently</h3>
        <ul className="mt-3 space-y-2">
          {nowItems.map((item) => (
            <li key={item} className="flex items-start gap-3 text-foreground/75">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </Section>
  );
}
