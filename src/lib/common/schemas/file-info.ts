import z from 'zod/v4';

export const FileInfoSchema = z.object({
  url: z.string(),
  mediaType: z.string(),
});

export type FileInfoSchema = z.infer<typeof FileInfoSchema>;
