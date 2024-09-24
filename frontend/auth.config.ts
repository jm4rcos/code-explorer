import { LoginSchema } from './app/schemas/login-schema';
import Credentials from 'next-auth/providers/credentials';

export default {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: 'POST',
              body: JSON.stringify({
                email,
                password,
              }),
              headers: { 'Content-Type': 'application/json' },
            },
          );

          if (!res.ok) {
            return null;
          }

          const user = await res.json();

          return user;
        } catch (error) {
          console.log('error', error);
          return null;
        }
      },
    }),
  ],
};
