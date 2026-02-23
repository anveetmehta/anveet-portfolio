import { type WorkflowStep } from '@/content/content';

type WorkflowDiagramProps = {
  steps: WorkflowStep[];
};

export function WorkflowDiagram({ steps }: WorkflowDiagramProps) {
  return (
    <ol className="space-y-4">
      {steps.map((step, index) => (
        <li key={step.title} className="rounded-xl border border-border bg-muted/40 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-foreground/50">Step {index + 1}</p>
          <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
          <p className="mt-2 text-foreground/75">{step.details}</p>
        </li>
      ))}
    </ol>
  );
}
