import { Card } from '@/components/Card';
import { Section } from '@/components/Section';

export function AboutSection() {
  return (
    <Section
      id="about"
      title="About"
      description="A calm, editorial section designed for narrative expansion without changing layout foundations."
    >
      <Card className="max-w-4xl">
        <p className="leading-relaxed text-foreground/80">
          This implementation emphasizes architecture first: modular sections, reusable components, and centralized
          content. The visual language stays modern and restrained so future brand direction can be layered cleanly.
        </p>
      </Card>
      description="Placeholder summary section. Expand with positioning narrative, values, and background details."
    >
      <p className="max-w-3xl text-slate-700">
        This architecture-first implementation keeps visual decisions intentionally minimal so content strategy and
        positioning can be layered in iteratively.
      </p>
    </Section>
  );
}
