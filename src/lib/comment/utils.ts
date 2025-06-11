import type { CommentSchema } from './schemas/comment';

export const countTotalComments = (comments: CommentSchema[]) => {
  let count = 0;
  const stack = [comments];

  while (stack.length !== 0) {
    const top = stack.pop()!;
    count += top.length;
    stack.push(...top.map((comment) => comment.replies));
  }

  return count;
};
