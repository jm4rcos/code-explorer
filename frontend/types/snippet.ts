import { technologySchema } from '@/app/schemas/technology-schema';
import { infer as ZodInfer } from 'zod';

export interface IUpdateSnippet {
  content?: string | null;
  creatorId: string;
  description?: string | null;
  id: string;
  isPublished?: boolean;
  technology?: ZodInfer<typeof technologySchema> | null;
  technologyId?: string | null;
  title: string;
}
