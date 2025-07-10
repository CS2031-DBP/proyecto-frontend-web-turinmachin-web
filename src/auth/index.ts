import { isErrorFromAlias } from '@zodios/core';
import NextAuth, { CredentialsSignin } from 'next-auth';
import 'next-auth/jwt'; // Required to augment JWT interface
import Credentials from 'next-auth/providers/credentials';
import { createServerApiClient } from '../api/util/create-server-api-client';
import { pick } from '../common/util/object';
import { AuthCredentialsSchema } from './schemas/auth-credentials';
import { LoginResponseSchema } from './schemas/login-response';
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

class InvalidLoginError extends CredentialsSignin {
  constructor(message: string) {
    super(message);
    this.code = message;
  }
}

const apiClient = createServerApiClient(null);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(rawCredentials) {
        const {
          success,
          data: credentials,
          error,
        } = AuthCredentialsSchema.safeParse(rawCredentials);

        if (!success) {
          console.error(error);
          throw new InvalidLoginError('Invalid credential schema');
        }

        let loginResponse: LoginResponseSchema;

        if (credentials.type === 'register') {
          try {
            loginResponse = await apiClient.register(credentials);
          } catch (err) {
            if (isErrorFromAlias(apiClient.api, 'register', err)) {
              throw new InvalidLoginError(
                '¡Este correo o nombre de usuario ya está en uso!',
              );
            }
            throw err;
          }
        } else if (credentials.type === 'login') {
          try {
            loginResponse = await apiClient.login(credentials);
          } catch (err) {
            if (isErrorFromAlias(apiClient.api, 'login', err)) {
              if (err.response.status === 403) {
                throw new InvalidLoginError(
                  'Esta cuenta usa inicio de sesión con Google.',
                );
              } else {
                // Implies 401
                if (err) throw new InvalidLoginError('Credenciales inválidas.');
              }
            }
            throw err;
          }
        } else if (credentials.type === 'google') {
          try {
            loginResponse = await apiClient.googleLogin(credentials);
            console.log(loginResponse);
          } catch (err) {
            if (isErrorFromAlias(apiClient.api, 'googleLogin', err)) {
              throw new InvalidLoginError(
                'Este usuario no está asociado a una cuenta Google.',
              );
            }
            throw err;
          }
        } else {
          throw new InvalidLoginError('Invalid login type');
        }

        return {
          accessToken: loginResponse.token,
          user: {
            ...pick(
              loginResponse.user,
              'id',
              'username',
              'displayName',
              'role',
              'verified',
            ),
            hasUniversity: !!loginResponse.user.university,
          },
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
        token.user = {
          ...pick(
            updatedUser,
            'id',
            'email',
            'username',
            'displayName',
            'role',
            'verified',
          ),
          hasUniversity: !!updatedUser.university,
        };
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
  trustHost: true,
});
