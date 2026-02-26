'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/Card';
import { Grid } from '@/components/Grid';
import { Section } from '@/components/Section';
import { projects } from '@/content/content';
import { cn } from '@/lib/cn';

function StatusBadge({ status }: { status: 'live' | 'building' | 'idea' }) {
  const styles = {
    live: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
    building: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
    idea: 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        styles[status]
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          status === 'live' && 'animate-pulse bg-emerald-500',
          status === 'building' && 'animate-pulse bg-amber-500',
          status === 'idea' && 'bg-blue-500'
        )}
      />
      {status}
    </span>
  );
}

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      title="Projects & Experiments"
      description="Things I'm building — some professional, some personal, all driven by curiosity."
    >
      <Grid columns={3}>
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
          >
            <Card className="flex h-full flex-col hover:-translate-y-1 hover:shadow-glow transition-all duration-300">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <StatusBadge status={project.status} />
              </div>
              <p className="mt-3 flex-1 text-sm text-foreground/75">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs text-foreground/65"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-sm font-medium text-accent"
                >
                  View project →
                </a>
              ) : null}
            </Card>
          </motion.div>
        ))}
      </Grid>
    </Section>
  );
}
