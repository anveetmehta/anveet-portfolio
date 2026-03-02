import {
  pgTable,
  text,
  timestamp,
  jsonb,
  pgEnum,
  varchar,
  serial,
  integer,
  boolean,
} from 'drizzle-orm/pg-core';

export const postStatusEnum = pgEnum('post_status', [
  'draft',
  'review',
  'approved',
  'published',
  'archived',
]);

export const ideaStatusEnum = pgEnum('idea_status', [
  'captured',
  'prioritized',
  'generating',
  'generated',
  'archived',
]);

export const platformEnum = pgEnum('platform', [
  'linkedin',
  'medium',
  'blog',
  'all',
]);

export const contentPillarEnum = pgEnum('content_pillar', [
  'systems-thinking',
  'product-execution',
  'fintech-risk',
  'ai-building',
  'career-craft',
]);

// ── Articles table ──────────────────────────────────────────────────
export const articles = pgTable('articles', {
  id: serial('id').primaryKey(),
  publicId: varchar('public_id', { length: 20 }).notNull().unique(),
  title: text('title').notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  summary: text('summary').notNull().default(''),
  content: text('content').notNull().default(''),
  tags: jsonb('tags').$type<string[]>().notNull().default([]),
  prerequisites: jsonb('prerequisites').$type<string[]>().notNull().default([]),
  checks: jsonb('checks')
    .$type<{ item: string; passed: boolean; note: string }[]>()
    .notNull()
    .default([]),
  status: postStatusEnum('status').notNull().default('draft'),
  // New: platform + content categorisation
  platform: platformEnum('platform').notNull().default('blog'),
  contentPillar: contentPillarEnum('content_pillar'),
  // New: SEO fields
  metaDescription: text('meta_description').notNull().default(''),
  keywords: jsonb('keywords').$type<string[]>().notNull().default([]),
  // New: cross-posting
  readingTimeMinutes: integer('reading_time_minutes'),
  linkedinVersion: text('linkedin_version').notNull().default(''),
  // New: idea linkage
  sourceIdeaId: varchar('source_idea_id', { length: 20 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ── Ideas table ─────────────────────────────────────────────────────
export const ideas = pgTable('ideas', {
  id: serial('id').primaryKey(),
  publicId: varchar('public_id', { length: 20 }).notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull().default(''),
  angle: text('angle').notNull().default(''),
  targetAudience: text('target_audience').notNull().default(''),
  platform: platformEnum('platform').notNull().default('all'),
  priority: integer('priority').notNull().default(2), // 1=low, 2=medium, 3=high
  contentPillar: contentPillarEnum('content_pillar'),
  sourceInspiration: text('source_inspiration').notNull().default(''),
  status: ideaStatusEnum('status').notNull().default('captured'),
  isTrending: boolean('is_trending').notNull().default(false),
  generationPrompt: text('generation_prompt').notNull().default(''),
  generatedArticleId: varchar('generated_article_id', { length: 20 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ── Media table (for future image/video uploads) ────────────────────
export const media = pgTable('media', {
  id: serial('id').primaryKey(),
  filename: text('filename').notNull(),
  url: text('url').notNull(),
  altText: text('alt_text').default(''),
  mimeType: varchar('mime_type', { length: 100 }),
  sizeBytes: integer('size_bytes'),
  articleId: integer('article_id').references(() => articles.id, {
    onDelete: 'set null',
  }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
