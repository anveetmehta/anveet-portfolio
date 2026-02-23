import { Client } from '@notionhq/client';

type NotionRichText = {
  plain_text?: string;
};

type NotionTitleProperty = {
  type: 'title';
  title: NotionRichText[];
};

type NotionRichTextProperty = {
  type: 'rich_text';
  rich_text: NotionRichText[];
};

type NotionSelectProperty = {
  type: 'select';
  select: {
    name: string;
  } | null;
};

type NotionUrlProperty = {
  type: 'url';
  url: string | null;
};

type NotionDateProperty = {
  type: 'date';
  date: {
    start: string;
  } | null;
};

type NotionProperty =
  | NotionTitleProperty
  | NotionRichTextProperty
  | NotionSelectProperty
  | NotionUrlProperty
  | NotionDateProperty;

type NotionPage = {
  id: string;
  properties: Record<string, NotionProperty>;
};

export interface NotionWritingPost {
  id: string;
  title: string;
  summary: string;
  status: 'published' | 'draft' | 'planned';
  href: string;
  publishedAt?: string;
}

const notionApiKey = process.env.NOTION_API_KEY;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

const notionClient = notionApiKey ? new Client({ auth: notionApiKey }) : null;

function getPlainText(property: NotionProperty | undefined): string {
  if (!property) {
    return '';
  }

  if (property.type === 'title') {
    return property.title.map((part) => part.plain_text ?? '').join('').trim();
  }

  if (property.type === 'rich_text') {
    return property.rich_text.map((part) => part.plain_text ?? '').join('').trim();
  }

  return '';
}

function getSelectValue(property: NotionProperty | undefined): string {
  if (!property || property.type !== 'select') {
    return '';
  }

  return property.select?.name ?? '';
}

function getUrlValue(property: NotionProperty | undefined): string {
  if (!property || property.type !== 'url') {
    return '';
  }

  return property.url ?? '';
}

function getDateValue(property: NotionProperty | undefined): string | undefined {
  if (!property || property.type !== 'date') {
    return undefined;
  }

  return property.date?.start;
}

function normalizeStatus(status: string): 'published' | 'draft' | 'planned' {
  const normalized = status.toLowerCase();
  if (normalized === 'published' || normalized === 'draft') {
    return normalized;
  }

  return 'planned';
}

function mapNotionPageToWritingPost(page: NotionPage): NotionWritingPost {
  const title = getPlainText(page.properties.Title);
  const summary = getPlainText(page.properties.Summary);
  const status = normalizeStatus(getSelectValue(page.properties.Status));
  const href = getUrlValue(page.properties.URL) || `/writing/${page.id}`;
  const publishedAt = getDateValue(page.properties.PublishedAt);

  return {
    id: page.id,
    title: title || 'Untitled post',
    summary,
    status,
    href,
    publishedAt
  };
}

export function hasNotionWritingConfig(): boolean {
  return Boolean(notionClient && notionDatabaseId);
}

export async function fetchNotionWritingPosts(): Promise<NotionWritingPost[]> {
  if (!notionClient || !notionDatabaseId) {
    return [];
  }

  const response = await notionClient.databases.query({
    database_id: notionDatabaseId,
    sorts: [
      {
        property: 'PublishedAt',
        direction: 'descending'
      }
    ]
  });

  return response.results
    .filter((result): result is NotionPage => 'properties' in result)
    .map((result) => mapNotionPageToWritingPost(result));
}
