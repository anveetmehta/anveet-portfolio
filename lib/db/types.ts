import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { articles, media, ideas, domains, domainChapters } from './schema';

export type Article = InferSelectModel<typeof articles>;
export type NewArticle = InferInsertModel<typeof articles>;
export type MediaRecord = InferSelectModel<typeof media>;
export type NewMediaRecord = InferInsertModel<typeof media>;
export type Idea = InferSelectModel<typeof ideas>;
export type NewIdea = InferInsertModel<typeof ideas>;
export type Domain = InferSelectModel<typeof domains>;
export type NewDomain = InferInsertModel<typeof domains>;
export type DomainChapter = InferSelectModel<typeof domainChapters>;
export type NewDomainChapter = InferInsertModel<typeof domainChapters>;
export type DomainWithChapters = Domain & { chapters: DomainChapter[] };
