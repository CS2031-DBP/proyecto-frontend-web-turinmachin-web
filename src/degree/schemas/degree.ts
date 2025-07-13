import { createPageSchema } from '@/api/schemas/page';
import { z } from 'zod/v4';

export const DegreeSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string().optional(),
});

export type DegreeSchema = z.infer<typeof DegreeSchema>;

export const DegreePageSchema = createPageSchema(DegreeSchema);
export type DegreePageSchema = z.infer<typeof DegreePageSchema>;
