import { z } from 'zod';

export const GoogleLoginRequestSchema = z.object({
  idToken: z.string().min(1),
});

export type GoogleLoginRequestSchema = z.infer<typeof GoogleLoginRequestSchema>;
