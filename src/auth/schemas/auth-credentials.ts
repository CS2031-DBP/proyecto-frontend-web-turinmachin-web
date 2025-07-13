import { z } from 'zod/v4';
import { LoginRequestSchema } from './login-request';
import { GoogleLoginRequestSchema } from './oauth2-credentials';
import { RegisterRequestSchema } from './register-request';

export const AuthCredentialsSchema = z.discriminatedUnion('type', [
  RegisterRequestSchema.extend({ type: z.literal('register') }),
  LoginRequestSchema.extend({ type: z.literal('login') }),
  GoogleLoginRequestSchema.extend({ type: z.literal('googleLogin') }),
  GoogleLoginRequestSchema.extend({ type: z.literal('googleRegister') }),
  GoogleLoginRequestSchema.extend({ type: z.literal('googleUpgrade') }),
]);

export type AuthCredentialsSchema = z.infer<typeof AuthCredentialsSchema>;
