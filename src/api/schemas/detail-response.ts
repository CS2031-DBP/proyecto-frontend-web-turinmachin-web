import { z } from 'zod';

export const DetailResponseSchema = z.object({
  type: z.string(),
  title: z.string(),
  status: z.number(),
  detail: z.string().optional(),
  instance: z.string(),
});

export type DetailResponseSchema = z.infer<typeof DetailResponseSchema>;
