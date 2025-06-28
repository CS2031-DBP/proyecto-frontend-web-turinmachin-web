import { z } from 'zod';

export const UpdateUniversitySchema = z.object({
  name: z.string().nonempty(),
  shortName: z
    .string()
    .trim()
    .optional()
    .transform((s) => (!s ? undefined : s)),
  websiteUrl: z
    .string()
    .trim()
    .optional()
    .transform((s) => (!s ? undefined : s)),
  degreeIds: z.string().uuid().array(),
  emailDomains: z
    .string()
    .trim()
    .nonempty()
    .array()
    .min(1, 'Debes incluir al menos un dominio de correo'),
});

export type UpdateUniversitySchema = z.infer<typeof UpdateUniversitySchema>;
