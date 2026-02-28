'use client';

import { motion } from 'framer-motion';
import { type WorkflowStep } from '@/content/content';

type WorkflowDiagramProps = {
  steps: WorkflowStep[];
};

export function WorkflowDiagram({ steps }: WorkflowDiagramProps) {
  return (
    <ol className="relative ml-4 border-l-2 border-accent/20 pl-8 space-y-6">
      {steps.map((step, index) => (
        <motion.li
          key={step.title}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, delay: index * 0.1 }}
          className="relative"
        >
          {/* Timeline dot */}
          <span className="absolute -left-[2.55rem] flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent/40 bg-background text-xs font-bold text-accent">
            {index + 1}
          </span>
          <div className="rounded-xl border border-border bg-muted/40 p-5">
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-foreground/75">{step.details}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
