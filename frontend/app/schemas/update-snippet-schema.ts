import { z } from 'zod';

export const UpdateSnippetSchema = z.object({
  description: z.string().nullable().optional(),
  isPublished: z.boolean().optional(),
  technologyId: z
    .string()
    .uuid({
      message: 'Invalid technology ID format',
    })
    .nullable()
    .optional(),
  title: z.string({
    required_error: 'Title is required!',
  }),
});

export const updateSnippetContentSchema = z.object({
  content: z.string().nullable().optional(),
});
