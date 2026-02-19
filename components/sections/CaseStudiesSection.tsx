import Link from 'next/link';
import { CaseStudyCard } from '@/components/CaseStudyCard';
import { Grid } from '@/components/Grid';
import { Section } from '@/components/Section';
import { getAllCaseStudies } from '@/lib/content';

export function CaseStudiesSection() {
  const caseStudies = getAllCaseStudies();

  return (
    <Section
      id="selected-case-studies"
      title="Selected Case Studies"
      description="Preview of modular case studies pulled from centralized content data."
    >
      <Grid>
        {caseStudies.slice(0, 2).map((caseStudy) => (
          <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
        ))}
      </Grid>
      <div className="mt-8">
        <Link href="/case-studies" className="text-sm font-medium">
          Browse all case studies →
        </Link>
      </div>
    </Section>
  );
}
