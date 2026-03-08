import OpenAI from 'openai';
import { type Idea } from '@/lib/db/types';
import { slugify, estimateReadingTime } from '@/lib/admin-posts';

export type GeneratedContent = {
  title: string;
  slug: string;
  summary: string;
  content: string;
  metaDescription: string;
  keywords: string[];
  tags: string[];
  readingTimeMinutes: number;
  linkedinVersion: string;
};

const PLATFORM_TEMPLATES: Record<string, { wordTarget: string; structure: string }> = {
  linkedin: {
    wordTarget: '300-600 words',
    structure: `Structure:
1. Hook line (pattern interrupt — a bold claim, surprising stat, or counter-intuitive observation)
2. Personal observation: "In my experience building X..." or "What I've seen in fintech..."
3. The core insight broken into 3-5 tight bullet points
4. One concrete takeaway the reader can act on today
5. Closing CTA question to drive engagement

Formatting rules for LinkedIn:
- Short paragraphs (1-3 lines max)
- Line breaks between every thought
- No headers or markdown — LinkedIn doesn't render them
- Use "→" for lists instead of bullets
- End with a question like "What's your experience?" or "Where are you seeing this?"`,
  },
  medium: {
    wordTarget: '1500-3000 words',
    structure: `Structure:
1. Title (clear, specific, not clickbait)
2. Executive summary (2-3 sentences: what this is and who should read it)
3. Context / problem statement (with concrete example from the field)
4. A named framework (give it a memorable name, e.g. "The Compliance Mesh", "The 3-Layer Trust Model")
5. Framework sections as H2 subheadings with explanations + examples
6. Evidence from practice (things you've seen, built, or measured)
7. Execution checklist (numbered steps the reader can take)
8. Closing insight (1 clear takeaway, future implication)

Use H2 (##) and H3 (###) for structure. Include numbered lists and bullet points.`,
  },
  blog: {
    wordTarget: '1500-3000 words',
    structure: `Structure:
1. Title (specific, practical)
2. Opening hook — a scenario or problem the reader recognises immediately
3. Context: why this matters now, in this specific domain
4. A named framework (give it a name)
5. Each framework component as its own H2 section with explanation + real example
6. What goes wrong when people miss this
7. Execution checklist (numbered, actionable)
8. Closing: the principle distilled to one sentence

Use H2 (##) and H3 (###) for structure.`,
  },
  all: {
    wordTarget: '1500-3000 words for the main article, 300-500 words for the LinkedIn version',
    structure: `Write a full long-form article (blog format) and a separate LinkedIn version.

Blog structure:
1. Opening hook
2. Named framework with H2 subheadings
3. Evidence and examples
4. Execution checklist
5. Closing insight

LinkedIn version (separate, plain text, no markdown):
1. Hook line
2. Core insight in 3-5 bullets using "→"
3. One action takeaway
4. CTA question`,
  },
};

export const BRAND_VOICE_SYSTEM_PROMPT = `You are writing as Anveet Mehta — a product and systems thinker with deep experience in fintech, risk, compliance, and building products at scale.

Voice and tone:
- Direct, precise, zero filler words. Never say "In today's fast-paced world" or "It's more important than ever."
- Write like you're explaining something to a sharp peer over coffee — not lecturing, not selling
- Use "I" naturally: "In my experience...", "What I've found...", "When I was working on..."
- Concrete over abstract. Always anchor insights to a specific situation, system, or constraint
- Systems-first: you think in flows, feedback loops, and constraints — not features or journeys
- Sceptical of conventional wisdom. Your unique value is the contrarian frame that turns out to be correct

Signature themes:
- "Systems over journeys" — products are systems, not linear paths
- Operational clarity: making complex regulated products feel simple and safe
- Multi-agent AI applied to real workflows
- Risk and compliance as design constraints, not afterthoughts
- The compounding value of building experiments that become platforms

Originality rules (CRITICAL):
- Every paragraph must contain a specific insight, not a restatement of the topic
- No listicle padding — if a bullet doesn't add something new, cut it
- Avoid these phrases: "game-changer", "paradigm shift", "leverage", "synergy", "thought leader", "holistic approach", "dive deep", "unpack", "circle back"
- Write from lived experience. If you're making a claim, ground it in a concrete observation from product work
- The content must read as original thought from a practitioner, not assembled text from the internet

Copyright: End every article with this exact line on its own paragraph:
---
*© Anveet Mehta. All rights reserved. Originally published at anveetmehta.com*`;

function buildUserPrompt(idea: Idea, template: { wordTarget: string; structure: string }, feedback?: string): string {
  return `Write an article based on the following idea.

IDEA BRIEF:
Title: ${idea.title}
Description: ${idea.description || 'Not provided'}
Unique angle / what makes this different: ${idea.angle || 'Not provided'}
Target audience: ${idea.targetAudience || 'Product managers and builders in regulated industries'}
Source / inspiration: ${idea.sourceInspiration || 'Not provided'}
${idea.generationPrompt ? `\nAdditional instructions from the author:\n${idea.generationPrompt}` : ''}

TARGET FORMAT:
Platform: ${idea.platform}
Target length: ${template.wordTarget}
${template.structure}

OUTPUT FORMAT:
Respond with exactly these sections, using the delimiters shown:

---ARTICLE_START---
[Full article in markdown]
---ARTICLE_END---

---LINKEDIN_START---
[LinkedIn version in plain text, no markdown formatting]
---LINKEDIN_END---

---META_START---
title: [Final article title]
summary: [2-sentence summary for article cards, max 200 chars]
metaDescription: [SEO meta description, 120-160 chars]
keywords: [comma-separated list of 3-6 SEO keywords]
tags: [comma-separated list of 2-4 content tags]
---META_END---

Important: The LinkedIn section should always be populated even if the platform is blog/medium — it's the cross-posting version.${feedback ? `\n---REVISION FEEDBACK---\nPrevious version feedback from the author: ${feedback}\nAddress these specifically. Do not repeat the same mistakes.` : ''}`;
}

export function parseResponse(raw: string): Omit<GeneratedContent, 'slug' | 'readingTimeMinutes'> {
  const extract = (startTag: string, endTag: string) => {
    const start = raw.indexOf(startTag);
    const end = raw.indexOf(endTag);
    if (start === -1 || end === -1) return '';
    return raw.slice(start + startTag.length, end).trim();
  };

  const content = extract('---ARTICLE_START---', '---ARTICLE_END---');
  const linkedinVersion = extract('---LINKEDIN_START---', '---LINKEDIN_END---');
  const metaBlock = extract('---META_START---', '---META_END---');

  const getMeta = (key: string) => {
    const match = metaBlock.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
    return match ? match[1].trim() : '';
  };

  const keywords = getMeta('keywords')
    .split(',')
    .map(k => k.trim())
    .filter(Boolean);

  const tags = getMeta('tags')
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);

  return {
    title: getMeta('title') || 'Generated Article',
    summary: getMeta('summary') || '',
    content: content || raw, // fallback to raw if parsing fails
    metaDescription: getMeta('metaDescription') || getMeta('summary') || '',
    keywords,
    tags,
    linkedinVersion,
  };
}

export async function generateArticleFromIdea(idea: Idea, feedback?: string): Promise<GeneratedContent> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set');
  }

  const client = new OpenAI({ apiKey });
  const template = PLATFORM_TEMPLATES[idea.platform] ?? PLATFORM_TEMPLATES.blog;

  const completion = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: BRAND_VOICE_SYSTEM_PROMPT },
      { role: 'user', content: buildUserPrompt(idea, template, feedback) },
    ],
    temperature: 0.75, // enough creativity to feel fresh, not so high it drifts
    max_tokens: 4000,
  });

  const raw = completion.choices[0]?.message?.content ?? '';
  const parsed = parseResponse(raw);

  return {
    ...parsed,
    slug: slugify(parsed.title),
    readingTimeMinutes: estimateReadingTime(parsed.content),
  };
}
