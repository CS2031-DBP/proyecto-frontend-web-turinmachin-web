import { createPageSchema } from '@/api/schemas/page';
import { z } from 'zod/v4';

export const UniversitySchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string().optional(),
  websiteUrl: z.string().optional(),
  emailDomains: z.string().array(),
});

export type UniversitySchema = z.infer<typeof UniversitySchema>;

export const UniversityPageSchema = createPageSchema(UniversitySchema);
export type UniversityPageSchema = z.infer<typeof UniversityPageSchema>;
