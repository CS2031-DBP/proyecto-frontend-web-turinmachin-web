import { z } from 'zod/v4';

export const CreateDegreeSchema = z.object({
  name: z.string().trim().nonempty(),
  shortName: z
    .string()
    .trim()
    .optional()
    .transform((s) => (!s ? undefined : s)),
});

export type CreateDegreeSchema = z.infer<typeof CreateDegreeSchema>;
