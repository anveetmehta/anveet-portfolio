import OpenAI from 'openai';
import { estimateReadingTime } from '@/lib/admin-posts';

const BRAND_VOICE_SYSTEM_PROMPT = `You are writing as Anveet Mehta — a product and systems thinker with deep experience in fintech, risk, compliance, and building products at scale.

Voice and tone:
- Direct, precise, zero filler words. Never say "In today's fast-paced world" or "It's more important than ever."
- Write like you're explaining something to a sharp peer over coffee — not lecturing, not selling
- Use "I" naturally: "In my experience...", "What I've found...", "When I was working on..."
- Concrete over abstract. Always anchor insights to a specific situation, system, or constraint
- Systems-first: you think in flows, feedback loops, and constraints — not features or journeys

Originality rules (CRITICAL):
- Every paragraph must contain a specific insight, not a restatement of the topic
- Avoid: "game-changer", "paradigm shift", "leverage", "synergy", "thought leader", "holistic approach", "dive deep", "unpack"
- Write from lived experience

Copyright: The article must end with this exact line:
---
*© Anveet Mehta. All rights reserved. Originally published at anveetmehta.com*`;

export async function refineArticle(
  content: string,
  linkedinVersion: string,
  userPrompt: string
): Promise<{ content: string; linkedinVersion: string; readingTimeMinutes: number }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');

  const client = new OpenAI({ apiKey });

  const prompt = `Here is the current article:

---ARTICLE_START---
${content}
---ARTICLE_END---

Here is the current LinkedIn version:
---LINKEDIN_START---
${linkedinVersion || '(not yet written)'}
---LINKEDIN_END---

The author wants to make the following change:
"${userPrompt}"

Rewrite the article applying this change precisely. Preserve the author's voice, structure, and copyright line. If the change affects the LinkedIn version too, update it as well.

Respond with exactly these sections:

---ARTICLE_START---
[Updated article in markdown]
---ARTICLE_END---

---LINKEDIN_START---
[Updated LinkedIn version in plain text]
---LINKEDIN_END---`;

  const completion = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: BRAND_VOICE_SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 4000,
  });

  const raw = completion.choices[0]?.message?.content ?? '';

  const extract = (startTag: string, endTag: string) => {
    const start = raw.indexOf(startTag);
    const end = raw.indexOf(endTag);
    if (start === -1 || end === -1) return '';
    return raw.slice(start + startTag.length, end).trim();
  };

  const newContent = extract('---ARTICLE_START---', '---ARTICLE_END---') || content;
  const newLinkedin = extract('---LINKEDIN_START---', '---LINKEDIN_END---') || linkedinVersion;

  return {
    content: newContent,
    linkedinVersion: newLinkedin,
    readingTimeMinutes: estimateReadingTime(newContent),
  };
}
