import { z } from 'zod';

export const CreateSnippetSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title is required!',
  }),
});
