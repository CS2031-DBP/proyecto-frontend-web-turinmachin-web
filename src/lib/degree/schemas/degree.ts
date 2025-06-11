import { z } from 'zod/v4';

export const DegreeSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type DegreeSchema = z.infer<typeof DegreeSchema>;
