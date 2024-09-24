import { z } from 'zod';

export const RegisterSchema = z.object({
  username: z
    .string({
      invalid_type_error: 'Name is required!',
    })
    .min(2, {
      message: 'Name must be at least 2 characters long.',
    }),
  email: z
    .string({
      invalid_type_error: 'Email is required!',
    })
    .email({
      message: 'Invalid email!',
    }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long.',
  }),
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;
