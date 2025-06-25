import { z } from 'zod';

export const UniversitySchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string().optional(),
  websiteUrl: z.string().optional(),
});

export type UniversitySchema = z.infer<typeof UniversitySchema>;
