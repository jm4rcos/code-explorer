'use client';

import { signIn } from 'next-auth/react';

import { DEFAULT_LOGIN_REDIRECT } from '@/lib/routes';

import { GithubIcon } from './icons/github-icon';
import { GoogleIcon } from './icons/google-icon';
import { CustomButton } from './ui/custom-button';

export const Social = () => {
  const onClick = (provider: 'google') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <>
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
    </>
  );
};
