import OpenAI from 'openai';
import { BRAND_VOICE_SYSTEM_PROMPT, parseResponse, type GeneratedContent } from './generate-article';
import { type RegTechNewsItem } from './fetch-regtech-news';
import { slugify, estimateReadingTime } from '@/lib/admin-posts';

export async function draftRegTechCommentary(
  newsItem: RegTechNewsItem,
  region: 'india' | 'global'
): Promise<GeneratedContent> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');

  const client = new OpenAI({ apiKey });

  const regionLabel =
    region === 'india'
      ? 'India (RBI/SEBI/IRDAI ecosystem)'
      : 'Global (Basel/FATF/FSB)';

  const userPrompt = `You are writing a RegTech commentary piece.

NEWS ITEM:
Title: ${newsItem.title}
Source: ${newsItem.source}
Date: ${newsItem.pubDate}
URL: ${newsItem.link}
Region: ${regionLabel}

Write a practitioner's commentary (~600-800 words) on what this regulatory development means for product builders and PMs in fintech.

Be opinionated. Take a clear stance. Use first-person observations. Explain the regulatory context briefly, then focus on the implications for builders: what to watch for, what to build for, what to avoid.

OUTPUT FORMAT:
Respond with exactly these sections, using the delimiters shown:

---ARTICLE_START---
[Full commentary in markdown]
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
---META_END---`;

  const completion = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: BRAND_VOICE_SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 3000,
  });

  const raw = completion.choices[0]?.message?.content ?? '';
  const parsed = parseResponse(raw);

  return {
    ...parsed,
    slug: slugify(parsed.title),
    readingTimeMinutes: estimateReadingTime(parsed.content),
  };
}
