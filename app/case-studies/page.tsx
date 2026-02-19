import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { CaseStudyCard } from '@/components/CaseStudyCard';
import { Grid } from '@/components/Grid';
import { getAllCaseStudies } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Case Studies | Anveet Mehta',
  description: 'Index of case studies rendered from centralized content architecture.'
};

export default function CaseStudiesIndexPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Case Studies</h1>
        <p className="mt-4 max-w-2xl text-slate-700">
          All studies are rendered dynamically from <code>content/content.ts</code> for easy future expansion.
        </p>
        <div className="mt-10">
          <Grid>
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
            ))}
          </Grid>
        </div>
      </Container>
    </section>
  );
}
