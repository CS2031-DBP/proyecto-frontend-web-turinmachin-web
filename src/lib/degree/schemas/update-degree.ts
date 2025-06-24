import { z } from 'zod';

export const UpdateDegreeSchema = z.object({
  name: z.string().trim().nonempty(),
  shortName: z
    .string()
    .trim()
    .optional()
    .transform((s) => (!s ? undefined : s)),
});

export type UpdateDegreeSchema = z.infer<typeof UpdateDegreeSchema>;
