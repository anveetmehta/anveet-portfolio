import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { articles, media } from './schema';

export type Article = InferSelectModel<typeof articles>;
export type NewArticle = InferInsertModel<typeof articles>;
export type MediaRecord = InferSelectModel<typeof media>;
export type NewMediaRecord = InferInsertModel<typeof media>;
