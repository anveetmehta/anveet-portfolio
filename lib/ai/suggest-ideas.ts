import OpenAI from 'openai';

export type SuggestedIdea = {
  title: string;
  description: string;
  angle: string;
  contentPillar: 'systems-thinking' | 'product-execution' | 'fintech-risk' | 'ai-building' | 'career-craft';
  sourceInspiration: string;
  isTrending: true;
};

const PILLAR_QUERIES: Record<string, string> = {
  'fintech-risk': 'fintech regulation compliance banking India 2025',
  'ai-building': 'AI product engineering software builders 2025',
  'systems-thinking': 'systems thinking product operations scalability',
  'product-execution': 'product management roadmap delivery execution',
  'career-craft': 'product manager career growth leadership promotion',
};

async function fetchHeadlinesForPillar(pillar: string, query: string): Promise<string[]> {
  try {
    const encoded = encodeURIComponent(query);
    const url = `https://news.google.com/rss/search?q=${encoded}&hl=en&gl=US&ceid=US:en`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; portfolio-bot/1.0)' },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return [];
    const text = await res.text();
    // Extract <title> tags (skip the first one which is the feed title)
    const matches = [...text.matchAll(/<title><!\[CDATA\[(.+?)\]\]><\/title>/g)].map(m => m[1]);
    if (matches.length === 0) {
      // Try non-CDATA format
      const plain = [...text.matchAll(/<title>([^<]+)<\/title>/g)].map(m => m[1]).slice(1);
      return plain.slice(0, 3);
    }
    return matches.slice(0, 3);
  } catch {
    return [];
  }
}

async function fetchAllHeadlines(): Promise<{ pillar: string; headlines: string[] }[]> {
  const results = await Promise.allSettled(
    Object.entries(PILLAR_QUERIES).map(async ([pillar, query]) => ({
      pillar,
      headlines: await fetchHeadlinesForPillar(pillar, query),
    }))
  );
  return results
    .filter((r): r is PromiseFulfilledResult<{ pillar: string; headlines: string[] }> => r.status === 'fulfilled')
    .map(r => r.value);
}

export async function suggestIdeas(existingTitles: string[]): Promise<SuggestedIdea[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');

  const headlineData = await fetchAllHeadlines();

  const headlineContext = headlineData
    .map(({ pillar, headlines }) =>
      headlines.length > 0
        ? `${pillar}:\n${headlines.map(h => `- ${h}`).join('\n')}`
        : `${pillar}: (no recent headlines found)`
    )
    .join('\n\n');

  const existingContext = existingTitles.length > 0
    ? `\nExisting ideas (avoid duplicating these):\n${existingTitles.map(t => `- ${t}`).join('\n')}`
    : '';

  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const prompt = `Today is ${today}. You are helping Anveet Mehta — a product manager and systems thinker with expertise in fintech, compliance, AI, and product execution — discover timely content ideas.

Content pillars:
- fintech-risk: Fintech products, regulatory compliance, risk management, banking India
- ai-building: Building AI products, engineering with AI, practical AI workflows
- systems-thinking: Systems design, product operations, feedback loops, scale
- product-execution: Product roadmaps, delivery, stakeholder management, metrics
- career-craft: PM career growth, leadership, hiring, negotiation

Recent news headlines by pillar:
${headlineContext}
${existingContext}

Generate exactly 5 content idea suggestions that are timely, specific, and would resonate with PMs, builders, and operators in regulated industries. Each idea should be grounded in one of the news headlines above where possible.

Respond with a JSON array of exactly 5 objects:
[
  {
    "title": "specific, actionable idea title",
    "description": "2-3 sentences expanding on the idea and why it matters now",
    "angle": "the contrarian or unique take that makes this worth writing",
    "contentPillar": "one of: fintech-risk | ai-building | systems-thinking | product-execution | career-craft",
    "sourceInspiration": "the headline or trend that inspired this idea"
  }
]

Return ONLY the JSON array. No markdown, no explanation.`;

  const client = new OpenAI({ apiKey });
  const completion = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8,
    max_tokens: 2000,
  });

  const raw = completion.choices[0]?.message?.content ?? '[]';

  try {
    const parsed = JSON.parse(raw.trim().replace(/^```json\n?/, '').replace(/\n?```$/, ''));
    return (parsed as SuggestedIdea[]).slice(0, 5).map(idea => ({ ...idea, isTrending: true as const }));
  } catch {
    return [];
  }
}
