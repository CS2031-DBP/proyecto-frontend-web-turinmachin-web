import { z } from 'zod/v4';

export const TagSchema = z
  .string()
  .trim()
  .toLowerCase()
  .nonempty()
  .transform((tag) =>
    tag
      .replaceAll(/[^a-z0-9_\-]/g, '')
      .replaceAll(/-+/g, '-')
      .replaceAll(/_+/g, ''),
  );

export type TagSchema = z.infer<typeof TagSchema>;
