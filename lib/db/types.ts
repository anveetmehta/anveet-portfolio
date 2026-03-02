import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { articles, media, ideas } from './schema';

export type Article = InferSelectModel<typeof articles>;
export type NewArticle = InferInsertModel<typeof articles>;
export type MediaRecord = InferSelectModel<typeof media>;
export type NewMediaRecord = InferInsertModel<typeof media>;
export type Idea = InferSelectModel<typeof ideas>;
export type NewIdea = InferInsertModel<typeof ideas>;
