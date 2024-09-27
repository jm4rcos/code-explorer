'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import { ArrowRightIcon } from 'lucide-react';

import { GithubIcon } from '@/components/icons/github-icon';
import { GoogleIcon } from '@/components/icons/google-icon';
import { InputField } from '@/components/input-field';
import { CustomButton } from '@/components/ui/custom-button';

import { useLoginForm } from '@/app/hooks/use-login-form';

export const LoginForm: React.FC = () => {
  const { register, handleSubmit, errors, onSubmit, isSubmitting } = useLoginForm();

  const handleFormSubmit = async (data: any) => {
    await onSubmit(data);
  };

  return (
    <div className="text-center flex flex-col gap-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-semibold">Login to your Account</h1>
        <p>Join our community of developers and start contributing for the new future.</p>
      </div>
      <form className="flex items-center gap-8 max-w-xl w-full" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="w-full flex flex-col gap-3">
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
          <CustomButton
            disabled
            // onClick={() => onClick('google')}
            variant="outline"
            className="flex cursor-not-allowed group items-center justify-start gap-2 w-full p-5 rounded-sm"
          >
            <GoogleIcon />
            <p className="group-hover:text-title">Login with Google</p>
          </CustomButton>

          <CustomButton
            disabled
            variant="outline"
            className="flex cursor-not-allowed group items-center justify-start gap-2 w-full p-5 rounded-sm"
          >
            <GithubIcon />
            <p className="group-hover:text-title">Login with Github</p>
          </CustomButton>

          <Link href="/auth/register">
            <CustomButton
              variant="ghost"
              className="flex group items-center justify-center gap-2 w-full py-5 px-0 rounded-sm"
            >
              <p className="text-title group-hover:text-secondary">Don't have an account?</p>
              <ArrowRightIcon className="group-hover:text-secondary w-5 h-5 text-title opacity-0 group-hover:opacity-100 -ml-12 group-hover:-ml-1 transition-all duration-300 ease-in-out" />
            </CustomButton>
          </Link>
        </div>
      </form>

      <span className="text-title cursor-pointer hover:underline text-sm">Forgot your password?</span>
    </div>
  );
};

export default LoginForm;
