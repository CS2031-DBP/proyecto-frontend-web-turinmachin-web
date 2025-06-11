import { useSuspenseQuery } from '@tanstack/react-query';
import type { HTMLAttributes } from 'react';
import { LuMessageCircleDashed } from 'react-icons/lu';
import { getAxiosInstance } from '../../api/util/axios-instance';
import { CommentSchema } from '../schemas/comment';
import { Comment } from './Comment';
import { CommentForm } from './CommentForm';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  postId: string;
  refetchPost: () => Promise<unknown>;
}

export const CommentSection = ({ postId, refetchPost, ...props }: Props) => {
  const { data: comments, refetch: refetchComments } = useSuspenseQuery({
    queryKey: ['comments', postId],
    queryFn: () =>
      getAxiosInstance()
        .get(`/posts/${postId}/comments`)
        .then((response) => CommentSchema.array().parseAsync(response.data)),
  });

  const refetchPage = async () => {
    await refetchPost();
    await refetchComments();
  };

  const handleCommentSubmit = async (content: string) => {
    if (!content) return;

    await getAxiosInstance().post(`/posts/${postId}/comments`, {
      content,
    });

    await refetchPage();
  };

  return (
    <div {...props}>
      <CommentForm onSubmitContent={handleCommentSubmit} />

      {comments.length === 0 ? (
        <div className="text-foreground-muted my-6 text-center">
          <LuMessageCircleDashed size={32} className="mx-auto" />
          <p className="my-2 text-lg">¡Sé el primero en comentar!</p>
        </div>
      ) : (
        <ul>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              refetchPage={refetchPage}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
