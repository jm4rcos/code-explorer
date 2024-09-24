import { RegisterSchema } from '@/app/schemas/register-schema';
import { z } from 'zod';

export type RegisterDTO = z.infer<typeof RegisterSchema>;
