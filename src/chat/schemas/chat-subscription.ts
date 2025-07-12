import { z } from 'zod';

export const ChatSubscriptionSchema = z.object({
  endpoint: z.string().url(),
  auth: z.string().min(1),
  key: z.string().min(1),
});

export type ChatSubscriptionSchema = z.infer<typeof ChatSubscriptionSchema>;
