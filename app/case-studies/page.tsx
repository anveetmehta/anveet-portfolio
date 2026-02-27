import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { CaseStudyCard } from '@/components/CaseStudyCard';
import { Grid } from '@/components/Grid';
import { getAllCaseStudies } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Deep dives into complex problems I\'ve worked on — onboarding systems, workflow visibility, and risk infrastructure.'
};

export default function CaseStudiesIndexPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Case Studies</h1>
        <p className="mt-4 max-w-2xl text-foreground/75">
          Deep dives into complex problems I&apos;ve worked on.
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
