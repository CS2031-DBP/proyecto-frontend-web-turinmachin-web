import { z } from 'zod';

export const FileInfoSchema = z.object({
  url: z.string(),
  mediaType: z.string(),
  blurDataUrl: z.string().optional(),
});

export type FileInfoSchema = z.infer<typeof FileInfoSchema>;
