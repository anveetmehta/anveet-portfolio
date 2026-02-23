import { Card } from '@/components/Card';
import { Grid } from '@/components/Grid';
import { Section } from '@/components/Section';
import { expertiseAreas } from '@/content/content';

export function ExpertiseSection() {
  return (
    <Section id="expertise" title="Expertise" description="Core capability areas structured for easy expansion.">
      <Grid columns={3}>
        {expertiseAreas.map((area) => (
          <Card key={area.title}>
            <h3 className="text-lg font-semibold">{area.title}</h3>
            <p className="mt-2 text-slate-700">{area.summary}</p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-600">
              {area.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
