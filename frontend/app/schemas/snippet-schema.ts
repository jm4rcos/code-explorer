import { z } from 'zod';

export const snippetSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  content: z.string().nullable(),
  creatorId: z.string().uuid(),
  technologyId: z.string().uuid().nullable(),
  isPublished: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const snippetLikeSchema = z.object({
  userId: z.string().uuid(),
  snippetId: z.string().uuid(),
});

export const userFavoriteSnippetSchema = z.object({
  userId: z.string().uuid(),
  snippetId: z.string().uuid(),
});
