import { writingEntries, type WritingEntry } from '@/content/content';
import { fetchNotionWritingPosts, hasNotionWritingConfig } from '@/lib/notion';

export async function getWritingEntries(): Promise<WritingEntry[]> {
  if (!hasNotionWritingConfig()) {
    return writingEntries;
  }

  try {
    const notionPosts = await fetchNotionWritingPosts();

    if (notionPosts.length === 0) {
      return writingEntries;
    }

    return notionPosts;
  } catch (error) {
    console.error('Failed to fetch writing posts from Notion. Falling back to local content.', error);
    return writingEntries;
  }
}
