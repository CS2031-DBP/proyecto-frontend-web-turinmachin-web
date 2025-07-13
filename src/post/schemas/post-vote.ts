import { z } from 'zod/v4';

export const PostVoteSchema = z.union([
  z.literal(-1),
  z.literal(0),
  z.literal(1),
]);

export type PostVoteSchema = z.infer<typeof PostVoteSchema>;
