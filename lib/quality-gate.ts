import { wordCount } from './admin-posts';

export type QualityCheck = {
  id: string;
  label: string;
  passed: boolean;
  note: string;
  severity: 'error' | 'warning';
};

type GateInput = {
  title: string;
  content: string;
  summary: string;
  metaDescription: string;
  keywords: string[];
  tags: string[];
  platform: string;
};

const PLATFORM_WORD_TARGETS: Record<string, { min: number; max: number; label: string }> = {
  linkedin: { min: 300, max: 600, label: '300-600 words' },
  medium:   { min: 1000, max: 9999, label: '1000+ words' },
  blog:     { min: 1000, max: 9999, label: '1000+ words' },
  all:      { min: 800, max: 9999, label: '800+ words' },
};

const ACTION_WORDS = ['try', 'start', 'build', 'share', 'consider', 'apply', 'ask', 'what', '?'];

export function runQualityGate(article: GateInput): QualityCheck[] {
  const checks: QualityCheck[] = [];
  const wc = wordCount(article.content);
  const lines = article.content.split('\n').filter(Boolean);
  const firstPara = lines.find(l => !l.startsWith('#') && l.trim().length > 0) ?? '';
  const closing = article.content.slice(-300).toLowerCase();

  // --- Errors (block publishing) ---

  // Platform word count
  const target = PLATFORM_WORD_TARGETS[article.platform] ?? PLATFORM_WORD_TARGETS.blog;
  const wordCountPassed = wc >= target.min && wc <= target.max;
  checks.push({
    id: 'word-count',
    label: 'Platform word count',
    passed: wordCountPassed,
    note: wordCountPassed
      ? `${wc} words — within target (${target.label})`
      : `${wc} words — target is ${target.label}`,
    severity: 'error',
  });

  // Summary
  const summaryPassed = article.summary.trim().length > 20;
  checks.push({
    id: 'summary',
    label: 'Summary is filled in',
    passed: summaryPassed,
    note: summaryPassed ? 'Summary looks good.' : 'Add a meaningful summary (20+ chars).',
    severity: 'error',
  });

  // Meta description
  const metaLen = article.metaDescription.trim().length;
  const metaPassed = metaLen >= 60 && metaLen <= 160;
  checks.push({
    id: 'meta-description',
    label: 'SEO meta description',
    passed: metaPassed,
    note: metaLen === 0
      ? 'Meta description is missing.'
      : metaLen < 60
      ? `Too short (${metaLen} chars). Aim for 60-160.`
      : metaLen > 160
      ? `Too long (${metaLen} chars). Max 160.`
      : `${metaLen} chars — good.`,
    severity: 'error',
  });

  // Title
  const titlePassed = article.title.trim().length > 10 && !article.title.toLowerCase().startsWith('untitled');
  checks.push({
    id: 'title',
    label: 'Title is meaningful',
    passed: titlePassed,
    note: titlePassed ? 'Title looks good.' : 'Replace the generic title with something specific.',
    severity: 'error',
  });

  // --- Warnings (advisory) ---

  // Opening hook
  const firstParaWords = firstPara.trim().split(/\s+/).length;
  const hookPassed = firstPara.length > 0 && (
    firstParaWords <= 40 ||
    firstPara.includes('?') ||
    /\d/.test(firstPara)
  );
  checks.push({
    id: 'hook',
    label: 'Strong opening hook',
    passed: hookPassed,
    note: hookPassed
      ? 'Opening is concise or has a clear hook.'
      : 'Consider starting with a short, punchy sentence, a question, or a data point.',
    severity: 'warning',
  });

  // Structured content (H2 headings)
  const hasStructure = article.content.includes('## ');
  checks.push({
    id: 'structure',
    label: 'Has section headings (##)',
    passed: hasStructure,
    note: hasStructure
      ? 'Article has clear sections.'
      : 'Add H2 subheadings (## Section Name) to give the article structure.',
    severity: 'warning',
  });

  // Call to action
  const hasCta = ACTION_WORDS.some(w => closing.includes(w));
  checks.push({
    id: 'cta',
    label: 'Has a call to action',
    passed: hasCta,
    note: hasCta
      ? 'Closing contains action language.'
      : 'End with a question, prompt, or clear next step for the reader.',
    severity: 'warning',
  });

  // Keywords
  const keywordsPassed = article.keywords.length >= 2;
  checks.push({
    id: 'keywords',
    label: 'SEO keywords set',
    passed: keywordsPassed,
    note: keywordsPassed
      ? `${article.keywords.length} keywords set.`
      : 'Add at least 2 SEO keywords.',
    severity: 'warning',
  });

  // Tags
  const tagsPassed = article.tags.length >= 1;
  checks.push({
    id: 'tags',
    label: 'Tags are set',
    passed: tagsPassed,
    note: tagsPassed ? `${article.tags.length} tag(s) set.` : 'Add at least one tag.',
    severity: 'warning',
  });

  return checks;
}

export function hasPublishingErrors(checks: QualityCheck[]): boolean {
  return checks.some(c => c.severity === 'error' && !c.passed);
}
