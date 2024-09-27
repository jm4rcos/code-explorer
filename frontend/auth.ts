import NextAuth from 'next-auth';

import authConfig from './auth.config';

const handler = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
    signOut: '/',
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true;
      return !!user;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.accessToken = token.accessToken;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.image = token.image;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (account?.provider === 'google') {
        //TODO: Add google login
      }

      if (!token.sub) return token;

      if (user) {
        token.accessToken = user.accessToken;
        token.username = user.username;
      }

      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  ...authConfig,
});

export { handler as GET, handler as POST };
