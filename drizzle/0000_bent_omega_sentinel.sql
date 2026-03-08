CREATE TYPE "public"."content_pillar" AS ENUM('systems-thinking', 'product-execution', 'fintech-risk', 'ai-building', 'career-craft');--> statement-breakpoint
CREATE TYPE "public"."domain_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."idea_status" AS ENUM('captured', 'prioritized', 'generating', 'generated', 'archived');--> statement-breakpoint
CREATE TYPE "public"."platform" AS ENUM('linkedin', 'medium', 'blog', 'all');--> statement-breakpoint
CREATE TYPE "public"."post_status" AS ENUM('draft', 'review', 'approved', 'published', 'archived');--> statement-breakpoint
CREATE TABLE "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"public_id" varchar(20) NOT NULL,
	"title" text NOT NULL,
	"slug" varchar(255) NOT NULL,
	"summary" text DEFAULT '' NOT NULL,
	"content" text DEFAULT '' NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"prerequisites" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"checks" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"status" "post_status" DEFAULT 'draft' NOT NULL,
	"platform" "platform" DEFAULT 'blog' NOT NULL,
	"content_pillar" "content_pillar",
	"meta_description" text DEFAULT '' NOT NULL,
	"keywords" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"reading_time_minutes" integer,
	"linkedin_version" text DEFAULT '' NOT NULL,
	"source_idea_id" varchar(20),
	"article_type" text DEFAULT 'insight' NOT NULL,
	"commentary_region" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "articles_public_id_unique" UNIQUE("public_id"),
	CONSTRAINT "articles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "domain_chapters" (
	"id" serial PRIMARY KEY NOT NULL,
	"public_id" varchar(20) NOT NULL,
	"domain_id" integer NOT NULL,
	"title" text NOT NULL,
	"summary" text DEFAULT '' NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"linked_slugs" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"linked_types" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "domain_chapters_public_id_unique" UNIQUE("public_id")
);
--> statement-breakpoint
CREATE TABLE "domains" (
	"id" serial PRIMARY KEY NOT NULL,
	"public_id" varchar(20) NOT NULL,
	"title" text NOT NULL,
	"slug" varchar(255) NOT NULL,
	"summary" text DEFAULT '' NOT NULL,
	"icon" text DEFAULT '' NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"status" "domain_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "domains_public_id_unique" UNIQUE("public_id"),
	CONSTRAINT "domains_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "ideas" (
	"id" serial PRIMARY KEY NOT NULL,
	"public_id" varchar(20) NOT NULL,
	"title" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"angle" text DEFAULT '' NOT NULL,
	"target_audience" text DEFAULT '' NOT NULL,
	"platform" "platform" DEFAULT 'all' NOT NULL,
	"priority" integer DEFAULT 2 NOT NULL,
	"content_pillar" "content_pillar",
	"source_inspiration" text DEFAULT '' NOT NULL,
	"status" "idea_status" DEFAULT 'captured' NOT NULL,
	"is_trending" boolean DEFAULT false NOT NULL,
	"generation_prompt" text DEFAULT '' NOT NULL,
	"generated_article_id" varchar(20),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ideas_public_id_unique" UNIQUE("public_id")
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"filename" text NOT NULL,
	"url" text NOT NULL,
	"alt_text" text DEFAULT '',
	"mime_type" varchar(100),
	"size_bytes" integer,
	"article_id" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "domain_chapters" ADD CONSTRAINT "domain_chapters_domain_id_domains_id_fk" FOREIGN KEY ("domain_id") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;