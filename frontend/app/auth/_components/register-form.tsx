'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { ArrowRightIcon } from 'lucide-react';
import toast from 'react-hot-toast';

import { InputField } from '@/components/input-field';
import { Social } from '@/components/social';
import { CustomButton } from '@/components/ui/custom-button';

import { useRegisterForm } from '@/app/hooks/use-register-form';
import { RegisterFormData } from '@/app/schemas/register-schema';

export const RegisterForm: React.FC = () => {
  const { register, handleSubmit, errors, onSubmit, isSubmitting } = useRegisterForm();

  const router = useRouter();

  const handleFormSubmit = async (data: RegisterFormData) => {
    try {
      await onSubmit(data);
      toast.success('Account created successfully');
      router.push('/auth/login');
    } catch (error) {
      if (error instanceof Error) {
        toast.error('This email is already in use');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="text-center flex flex-col gap-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-semibold">Create your Account</h1>
        <p>Join our community of developers and start contributing for the new future.</p>
      </div>
      <form className="flex items-center gap-8 max-w-xl w-full" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="w-full flex flex-col gap-3">
          <InputField placeholder="Name" name="username" type="text" register={register} error={errors.username} />

          <InputField placeholder="Email" name="email" type="email" register={register} error={errors.email} />

          <InputField
            placeholder="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password}
          />

          <CustomButton
            disabled={isSubmitting}
            className="bg-secondary flex group items-center justify-center gap-2 w-full py-5 px-0 rounded-sm"
          >
            <p className="text-background group-hover:text-background">Submit</p>
            <ArrowRightIcon className="group-hover:text-background w-5 h-5 text-title opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-300 ease-in-out" />
          </CustomButton>
        </div>
        <div className="w-1 h-8 bg-title rounded-full rotate-12" />
        <div className="flex w-full flex-col gap-3">
          <Social />

          <Link href="/auth/login">
            <CustomButton
              variant="ghost"
              className="flex group items-center justify-center gap-2 w-full py-5 px-0 rounded-sm"
            >
              <p className="text-title group-hover:text-secondary">Already have an account?</p>
              <ArrowRightIcon className="group-hover:text-secondary w-5 h-5 text-title opacity-0 group-hover:opacity-100 -ml-12 group-hover:-ml-1 transition-all duration-300 ease-in-out" />
            </CustomButton>
          </Link>

          <span className="p-2 text-text cursor-pointer hover:underline text-sm">Forgot your password?</span>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
