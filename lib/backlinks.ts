import { notesFromSystem } from '@/content/content';

// Static reverse-index over the notesFromSystem fallback list — covers notes
// authored directly in content/content.ts. Published articles live in the
// Neon-backed `articles` table (see lib/db/schema) and are not indexed here;
// wiring backlinks for those needs a `links` column on that table.
export function getBacklinksFor(slug: string) {
  return notesFromSystem
    .filter((n) => n.links?.includes(slug))
    .map((n) => ({
      slug: n.slug ?? '',
      title: n.title,
      excerpt: n.teaser,
      maturity: n.maturity,
    }))
    .filter((b) => b.slug);
}
