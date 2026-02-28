import Link from 'next/link';
import { CaseStudyCard } from '@/components/CaseStudyCard';
import { Grid } from '@/components/Grid';
import { Section } from '@/components/Section';
import { SearchIcon } from '@/components/icons/SectionIcons';
import { getAllCaseStudies } from '@/lib/content';

export function CaseStudiesSection() {
  const caseStudies = getAllCaseStudies();

  return (
    <Section
      id="case-studies"
      title="Selected Case Studies"
      description="Deep dives into complex problems I've worked on."
      icon={<SearchIcon />}
    >
      <Grid>
        {caseStudies.slice(0, 2).map((caseStudy) => (
          <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
        ))}
      </Grid>
      <div className="mt-8">
        <Link href="/case-studies" className="text-sm font-medium text-accent">
          Browse all case studies →
        </Link>
      </div>
    </Section>
  );
}
