import Link from 'next/link';
import { Container } from '@/components/Container';

export default function NotFound() {
  return (
    <section className="py-24">
      <Container>
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-slate-700">The page you requested does not exist.</p>
        <Link href="/" className="mt-5 inline-flex text-sm font-medium">
          Return home →
        </Link>
      </Container>
    </section>
  );
}
