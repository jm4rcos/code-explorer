'use server';

import { LoginSchema } from '@/app/schemas/login-schema';
import { signIn } from 'next-auth/react';
import { z } from 'zod';

type LoginFormData = z.infer<typeof LoginSchema>;
export async function authenticate(credentials: LoginFormData) {
  try {
    const session = await signIn('credentials', credentials);
    return {
      success: true,
      message: 'Login successful',
    };
  } catch (err: any) {
    if (err.type === 'AuthError') {
      return {
        error: { message: err.message },
      };
    }
    return { error: { message: 'Failed to login', error: err } };
  }
}
