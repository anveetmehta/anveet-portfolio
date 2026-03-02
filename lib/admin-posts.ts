export type PostStatus = 'draft' | 'review' | 'approved' | 'published' | 'archived';

export interface AdminPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags: string[];
  prerequisites: string[];
  checks: { item: string; passed: boolean; note: string }[];
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
}

export function createId() {
  return `post_${Math.random().toString(36).slice(2, 10)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function getPublishedPostBySlug(posts: AdminPost[], slug: string): AdminPost | undefined {
  return posts.find((p) => p.slug === slug && p.status === 'published');
}

export function migratePost(post: AdminPost): AdminPost {
  return {
    ...post,
    slug: post.slug || slugify(post.title),
    tags: post.tags || [],
    updatedAt: post.updatedAt || post.createdAt,
  };
}

export function runChecklist(content: string, title: string, prerequisites: string[]) {
  const words = content.trim().split(/\s+/).filter(Boolean);
  return prerequisites.map((item) => {
    const normalized = item.toLowerCase();
    const inTitle = title.toLowerCase().includes(normalized);
    const inBody = content.toLowerCase().includes(normalized);
    const passed = inTitle || inBody || words.length >= 450;

    return {
      item,
      passed,
      note: passed
        ? 'Looks good based on content scan.'
        : 'Not found clearly in the draft. Consider adding this explicitly.'
    };
  });
}

export function estimateReadingTime(content: string): number {
  return Math.max(1, Math.ceil(wordCount(content) / 238));
}

export function createIdeaId() {
  return `idea_${Math.random().toString(36).slice(2, 10)}`;
}

export function generateDraft(seedIdea: string) {
  const short = seedIdea.trim() || 'Untitled idea';
  return {
    title: short.length > 60 ? `${short.slice(0, 57)}...` : short,
    summary: `A practical breakdown on ${short.toLowerCase()} with actionable steps and measurable outcomes.`,
    content: [
      `# ${short}`,
      '',
      '## Context',
      `This article explores ${short.toLowerCase()} from a systems and execution perspective.`,
      '',
      '## Framework',
      '- Define the problem in plain language.',
      '- Pick one measurable outcome.',
      '- Sequence execution into clear weekly actions.',
      '',
      '## Execution Checklist',
      '1. Clarify constraints and tradeoffs.',
      '2. Align stakeholders on success criteria.',
      '3. Instrument progress and iterate.',
      '',
      '## Closing',
      'Use this model to improve clarity, speed, and confidence in delivery decisions.'
    ].join('\n')
  };
}
