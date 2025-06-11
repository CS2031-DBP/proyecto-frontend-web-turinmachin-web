import { z } from 'zod/v4';
import { FileInfoSchema } from '../../common/schemas/file-info';
import { DegreeSchema } from '../../degree/schemas/degree';
import { UniversitySchema } from '../../university/schemas/university';
import { UserSchema } from '../../user/schemas/user';

export const PostVoteSchema = z.union([
  z.literal(-1),
  z.literal(0),
  z.literal(1),
]);

export type PostVoteSchema = z.infer<typeof PostVoteSchema>;

export const PostSchema = z.object({
  id: z.string(),
  author: UserSchema,
  content: z.string(),
  files: FileInfoSchema.array(),
  university: UniversitySchema,
  degree: DegreeSchema.optional(),
  tags: z.string().array(),
  score: z.number(),
  totalComments: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  currentVote: PostVoteSchema.optional(),
});

export type PostSchema = z.infer<typeof PostSchema>;
