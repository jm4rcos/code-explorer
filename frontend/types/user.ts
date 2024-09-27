import { z } from 'zod';

import { RegisterSchema } from '@/app/schemas/register-schema';

export type RegisterDTO = z.infer<typeof RegisterSchema>;
