import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/Container';
import { WorkflowDiagram } from '@/components/WorkflowDiagram';
import { getAllCaseStudies, getCaseStudyBySlug } from '@/lib/content';

type CaseStudyPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return getAllCaseStudies().map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const caseStudy = getCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found'
    };
  }

  return {
    title: `${caseStudy.title} | Case Study | Anveet Mehta`,
    description: caseStudy.excerpt
  };
}

export default function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const caseStudy = getCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <article className="py-16 sm:py-20">
      <Container>
        <header className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Case Study</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{caseStudy.title}</h1>
          <p className="mt-5 text-lg text-slate-700">{caseStudy.excerpt}</p>
        </header>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-xl font-semibold">Context</h2>
            <p className="mt-3 text-slate-700">{caseStudy.context}</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Problem</h2>
            <p className="mt-3 text-slate-700">{caseStudy.problem}</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Role</h2>
            <p className="mt-3 text-slate-700">{caseStudy.role}</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Approach</h2>
            <p className="mt-3 text-slate-700">{caseStudy.approach}</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Architecture / Workflow</h2>
            <div className="mt-4">
              <WorkflowDiagram steps={caseStudy.architecture} />
            </div>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Impact</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
              {caseStudy.impact.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Learnings</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
              {caseStudy.learnings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </Container>
    </article>
  );
}
