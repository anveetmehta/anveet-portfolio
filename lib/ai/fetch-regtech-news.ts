export type RegTechNewsItem = {
  title: string;
  source: string;
  pubDate: string;
  link: string;
  region: 'india' | 'global';
};

const INDIA_QUERIES = [
  'RBI regulation SEBI circular India fintech 2025',
  'IRDAI India insurance regulation compliance',
  'UPI NPCI India payments regulation',
];

const GLOBAL_QUERIES = [
  'Basel Committee BIS fintech regulation 2025',
  'FATF guidance anti-money laundering',
  'MiCA PSD3 FSB report crypto regulation',
];

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function stripCdata(str: string): string {
  return str.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim();
}

async function fetchForQuery(query: string, region: 'india' | 'global'): Promise<RegTechNewsItem[]> {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en&gl=US&ceid=US:en`;

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; portfolio-bot/1.0)' },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) return [];

    const text = await res.text();
    const items: RegTechNewsItem[] = [];

    // Extract <item> blocks
    const itemMatches = [...text.matchAll(/<item>([\s\S]*?)<\/item>/g)];

    for (const match of itemMatches.slice(0, 5)) {
      const block = match[1];

      // Extract title
      const titleMatch = block.match(/<title><!\[CDATA\[(.+?)\]\]><\/title>/) ||
        block.match(/<title>([^<]+)<\/title>/);
      const rawTitle = titleMatch ? titleMatch[1] : '';
      const title = stripCdata(rawTitle).trim();
      if (!title) continue;

      // Extract link
      const linkMatch = block.match(/<link><!\[CDATA\[(.+?)\]\]><\/link>/) ||
        block.match(/<link>([^<]+)<\/link>/);
      const link = linkMatch ? stripCdata(linkMatch[1]).trim() : '';

      // Extract pubDate
      const pubDateMatch = block.match(/<pubDate>([^<]+)<\/pubDate>/);
      const pubDate = pubDateMatch ? pubDateMatch[1].trim() : '';

      // Extract source
      const sourceTagMatch = block.match(/<source[^>]*>([^<]+)<\/source>/);
      const source = sourceTagMatch
        ? stripCdata(sourceTagMatch[1]).trim()
        : extractDomain(link);

      items.push({ title, source, pubDate, link, region });
    }

    return items;
  } catch {
    return [];
  }
}

export async function fetchRegtechNews(region: 'india' | 'global'): Promise<RegTechNewsItem[]> {
  const queries = region === 'india' ? INDIA_QUERIES : GLOBAL_QUERIES;

  const results = await Promise.allSettled(
    queries.map(q => fetchForQuery(q, region))
  );

  const allItems: RegTechNewsItem[] = results
    .filter((r): r is PromiseFulfilledResult<RegTechNewsItem[]> => r.status === 'fulfilled')
    .flatMap(r => r.value);

  // Deduplicate by title
  const seen = new Set<string>();
  const deduped: RegTechNewsItem[] = [];
  for (const item of allItems) {
    const key = item.title.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(item);
    }
  }

  return deduped.slice(0, 15);
}
