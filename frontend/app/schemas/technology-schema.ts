import { z } from 'zod';

export const technologySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  image: z.string(),
});
