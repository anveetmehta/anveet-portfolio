import { Section } from '@/components/Section';

export function AboutSection() {
  return (
    <Section
      id="about"
      title="About"
      description="Placeholder summary section. Expand with positioning narrative, values, and background details."
    >
      <p className="max-w-3xl text-slate-700">
        This architecture-first implementation keeps visual decisions intentionally minimal so content strategy and
        positioning can be layered in iteratively.
      </p>
    </Section>
  );
}
