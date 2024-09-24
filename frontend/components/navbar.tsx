'use client';

import React from 'react';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { CustomButton } from './ui/custom-button';
import { Logo } from './logo';

export const Navbar = () => {
  const pathname = usePathname();

  const { data: session } = useSession();

  if (session) {
    return (
      <nav className="absolute w-full top-0 left-0 right-0 flex items-center h-16 justify-between px-8">
        <Link href="/" className="text-title text-2xl font-semibold">
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          <p className="text-title text-base mr-4">
            {session.user?.username || session.user.email}
          </p>
          <CustomButton
            variant="outline"
            onClick={() =>
              signOut({
                callbackUrl: '/',
                redirect: true,
              })
            }
          >
            SignOut
          </CustomButton>
          <div className="ml-2">
            <ModeToggle />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="absolute w-full top-0 left-0 right-0 flex items-center h-16 justify-between px-8">
      <Link href="/" className="text-title text-2xl font-semibold">
        Code Explorer
      </Link>
      <div className="flex items-center gap-2">
        {!pathname.includes('auth') && (
          <>
            <Link href="/auth/login">
              <CustomButton variant="ghost">SignIn</CustomButton>
            </Link>

            <Link href="/auth/register">
              <CustomButton variant="outline">SignUp</CustomButton>
            </Link>
          </>
        )}
        <div className="ml-2">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
