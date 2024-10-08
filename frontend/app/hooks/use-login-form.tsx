'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { DEFAULT_LOGIN_REDIRECT } from '@/lib/routes';

import { LoginSchema } from '../schemas/login-schema';

export type LoginFormData = z.infer<typeof LoginSchema>;

export const useLoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await signIn('credentials', {
      // redirectTo: DEFAULT_LOGIN_REDIRECT,
      email: data.email,
      password: data.password,
      redirect: false,
      // callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });

    if (result?.error) {
      console.error('Login failed:', result.error);
      toast.error('Invalid email or password');
    } else {
      router.push(DEFAULT_LOGIN_REDIRECT);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
  };
};
