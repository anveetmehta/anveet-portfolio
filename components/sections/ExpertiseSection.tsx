'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/Card';
import { Grid } from '@/components/Grid';
import { Section } from '@/components/Section';
import { expertiseAreas } from '@/content/content';

const topBorderColors = [
  'border-t-4 border-t-accent',
  'border-t-4 border-t-accent-warm',
  'border-t-4 border-t-emerald-500'
];

export function ExpertiseSection() {
  return (
    <Section
      id="how-i-think"
      title="How I Think"
      variant="muted"
    >
      <Grid columns={3}>
        {expertiseAreas.map((area, index) => (
          <motion.div
            key={area.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
          >
            <Card className={`h-full ${topBorderColors[index % topBorderColors.length]}`}>
              <span className="text-5xl font-bold text-foreground/[0.06]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="-mt-4 text-lg font-semibold">{area.title}</h3>
              <p className="mt-2 text-foreground/75">{area.summary}</p>
              <p className="mt-3 text-sm italic text-foreground/55">
                {area.example}
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-foreground/65">
                {area.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </Grid>
    </Section>
  );
}
