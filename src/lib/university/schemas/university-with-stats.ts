import { z } from 'zod';
import { UniversitySchema } from './university';

export const UniversityWithStatsSchema = UniversitySchema.extend({
  totalStudents: z.number(),
}).omit({ emailDomains: true });

export type UniversityWithStatsSchema = z.infer<
  typeof UniversityWithStatsSchema
>;
