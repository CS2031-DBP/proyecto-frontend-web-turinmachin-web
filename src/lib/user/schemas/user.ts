import { z } from 'zod';
import { FileInfoSchema } from '../../common/schemas/file-info';
import { DegreeSchema } from '../../degree/schemas/degree';
import { UniversitySchema } from '../../university/schemas/university';
import { RoleSchema } from './role';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  displayName: z.string().optional(),
  bio: z.string().optional(),
  university: UniversitySchema.optional(),
  degree: DegreeSchema.optional(),
  profilePicture: FileInfoSchema.optional(),
  role: RoleSchema,
  streak: z.number().optional(),
  lastStreakDate: z.coerce.date().optional(),
  verified: z.boolean(),
  createdAt: z.coerce.date(),
});

export type UserSchema = z.infer<typeof UserSchema>;
