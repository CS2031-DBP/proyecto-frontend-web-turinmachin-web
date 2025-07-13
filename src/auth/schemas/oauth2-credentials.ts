import { z } from 'zod/v4';

export const GoogleLoginRequestSchema = z.object({
  idToken: z.string().min(1),
});

export type GoogleLoginRequestSchema = z.infer<typeof GoogleLoginRequestSchema>;
