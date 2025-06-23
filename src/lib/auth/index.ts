import { isErrorFromAlias } from '@zodios/core';
import NextAuth from 'next-auth';
import 'next-auth/jwt'; // Required to augment JWT interface
import Credentials from 'next-auth/providers/credentials';
import { ZodError } from 'zod';
import { apiClient } from '../api/util/client';
import { pick } from '../common/util/object';
import { LoginRequestSchema } from './schemas/login-request';
import { LoginResponseSchema } from './schemas/login-response';
import { RegisterRequestSchema } from './schemas/register-request';
import { SessionUserSchema } from './schemas/session-user';

declare module 'next-auth' {
  interface User {
    accessToken: string;
    user: SessionUserSchema;
  }

  interface Session {
    accessToken: string;
    user: SessionUserSchema;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    user: SessionUserSchema;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        let data: LoginResponseSchema;

        if (credentials.type === 'register') {
          try {
            const creds = await RegisterRequestSchema.parseAsync(credentials);
            data = await apiClient.register(creds);
          } catch (err) {
            if (
              err instanceof ZodError ||
              isErrorFromAlias(apiClient.api, 'register', err)
            ) {
              return null;
            }
            throw err;
          }
        } else {
          try {
            const creds = await LoginRequestSchema.parseAsync(credentials);
            data = await apiClient.login(creds);
          } catch (err) {
            if (
              err instanceof ZodError ||
              isErrorFromAlias(apiClient.api, 'login', err)
            ) {
              return null;
            }
            throw err;
          }
        }

        return {
          accessToken: data.token,
          user: pick(
            data.user,
            'id',
            'username',
            'displayName',
            'role',
            'verified',
          ),
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user.user;
      } else {
        // Refresh
        // PERF: find out a way to programmatically regenerate the JWT that actually works
        const updatedUser = await apiClient.getUserById({
          params: { id: token.user.id },
        });
        token.user = pick(
          updatedUser,
          'id',
          'email',
          'username',
          'displayName',
          'role',
          'verified',
        );
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = {
        ...session.user,
        ...token.user,
      };

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
});
