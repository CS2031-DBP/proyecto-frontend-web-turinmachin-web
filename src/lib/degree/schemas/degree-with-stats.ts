import { z } from 'zod';
import { DegreeSchema } from './degree';

export const DegreeWithStatsSchema = DegreeSchema.extend({
  totalUniversities: z.number(),
  totalStudents: z.number(),
});

export type DegreeWithStatsSchema = z.infer<typeof DegreeWithStatsSchema>;
