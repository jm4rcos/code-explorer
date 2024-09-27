import { NextRequest, NextResponse } from 'next/server';

import { checkUserSession } from './lib/check-user-session';
import { authRoutes, DEFAULT_LOGIN_REDIRECT, protectedRoutes } from './lib/routes';

export function middleware(req: NextRequest) {
  const { nextUrl } = req;

  const isLoggedIn = checkUserSession(req);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  //const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Verifica se a rota é protegida e o usuário não está logado
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Verifica se a rota é de autenticação e o usuário está logado
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
  }

  // Permitir acesso a rotas públicas
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
