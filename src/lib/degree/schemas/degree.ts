import { createPageSchema } from '@/lib/api/schemas/page';
import { z } from 'zod';

export const DegreeSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string().optional(),
});

export type DegreeSchema = z.infer<typeof DegreeSchema>;

export const DegreePageSchema = createPageSchema(DegreeSchema);
export type DegreePageSchema = z.infer<typeof DegreePageSchema>;
