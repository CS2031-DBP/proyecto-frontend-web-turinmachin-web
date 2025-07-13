import { z } from 'zod/v4';
import { DegreeSchema } from './degree';

export const DegreeWithStatsSchema = DegreeSchema.extend({
  totalUniversities: z.number(),
  totalStudents: z.number(),
});

export type DegreeWithStatsSchema = z.infer<typeof DegreeWithStatsSchema>;
