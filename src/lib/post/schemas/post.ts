import { createPageSchema } from '@/lib/api/schemas/page';
import { z } from 'zod';
import { FileInfoSchema } from '../../common/schemas/file-info';
import { DegreeSchema } from '../../degree/schemas/degree';
import { UniversitySchema } from '../../university/schemas/university';
import { UserSchema } from '../../user/schemas/user';
import { PostVoteSchema } from './post-vote';

export const PostSchema = z.object({
  id: z.string(),
  author: UserSchema,
  content: z.string(),
  files: FileInfoSchema.array(),
  university: UniversitySchema,
  degree: DegreeSchema.optional(),
  tags: z.string().array(),
  score: z.number(),
  totalComments: z.number().default(0),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  currentVote: PostVoteSchema.optional(),
});

export type PostSchema = z.infer<typeof PostSchema>;

export const PostPageSchema = createPageSchema(PostSchema);
export type PostPageSchema = z.infer<typeof PostPageSchema>;
