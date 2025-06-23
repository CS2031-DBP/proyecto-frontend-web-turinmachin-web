import { z } from 'zod';

export const DegreeSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string().optional(),
});

export type DegreeSchema = z.infer<typeof DegreeSchema>;
