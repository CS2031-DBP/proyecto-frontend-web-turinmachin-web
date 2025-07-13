import { z } from 'zod/v4';

export const ChatSubscriptionSchema = z.object({
  endpoint: z.string().url(),
  auth: z.string().min(1),
  key: z.string().min(1),
});

export type ChatSubscriptionSchema = z.infer<typeof ChatSubscriptionSchema>;
