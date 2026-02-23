import { Container } from '@/components/Container';
import { siteMeta } from '@/content/content';

export function HeroSection() {
  return (
    <section className="border-b border-slate-200 py-24 sm:py-28">
      <Container>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Portfolio Foundation</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
          {siteMeta.name}
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-slate-700">{siteMeta.description}</p>
      </Container>
    </section>
  );
}
