import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      image: string;
      accessToken: string;
    };
  }

  interface User {
    id: string;
    username: string;
    email: string;
    image: string;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    jwt: string;
    sub: string;
    username: string;
    email: string;
    image: string;
    accessToken: string;
  }
}
