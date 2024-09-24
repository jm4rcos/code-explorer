import { z } from 'zod';

export const commentSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  snippetId: z.string().uuid(),
  authorId: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
