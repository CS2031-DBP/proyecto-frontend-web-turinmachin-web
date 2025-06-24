import { z } from 'zod';

export const CreateUniversitySchema = z.object({
  name: z.string().nonempty(),
  shortName: z.string().trim().nonempty(),
  degreeIds: z.string().uuid().array(),
  emailDomains: z.string().trim().nonempty().array(),
});

export type CreateUniversitySchema = z.infer<typeof CreateUniversitySchema>;
