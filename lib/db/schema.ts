import {
  pgTable,
  text,
  timestamp,
  jsonb,
  pgEnum,
  varchar,
  serial,
  integer,
} from 'drizzle-orm/pg-core';

export const postStatusEnum = pgEnum('post_status', [
  'draft',
  'review',
  'approved',
  'published',
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
