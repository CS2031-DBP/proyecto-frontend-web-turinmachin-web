import { z } from 'zod/v4';
import { DegreeSchema } from '../../degree/schemas/degree';

export const UniversitySchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string().optional(),
  websiteUrl: z.string().optional(),
  emailDomains: z.string().array(),
  degrees: DegreeSchema.array(),
});

export type UniversitySchema = z.infer<typeof UniversitySchema>;
