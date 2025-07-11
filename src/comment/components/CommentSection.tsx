'use client';
import { Button } from '@/common/components/Button';
import { Spinner } from '@/common/components/Spinner';
import { Session } from 'next-auth';
import type { HTMLAttributes } from 'react';
import { LuMessageCircleDashed } from 'react-icons/lu';
import { usePostComments } from '../hooks/use-post-comments';
import { Comment } from './Comment';
import { CommentForm } from './CommentForm';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  postId: string;
  session: Session | null;
}

export const CommentSection = ({ postId, session, ...props }: Props) => {
  const { comments, error, isLoading, mutate } = usePostComments(postId);

  return (
    <div {...props}>
      {isLoading ? (
        <div className="my-14 flex flex-col items-center">
          <Spinner />
        </div>
      ) : error ? (
        <div>
          <p className="text-foreground-muted mt-8 mb-5 text-center text-xl">
            Algo salió mal :(
          </p>
          <div className="text-center">
            <Button onClick={() => mutate()}>Reintentar</Button>
          </div>
        </div>
      ) : (
        <>
          <CommentForm postId={postId} session={session} />

          {comments!.length === 0 ? (
            <div className="text-foreground-muted my-6 text-center">
              <LuMessageCircleDashed size={32} className="mx-auto" />
              <p className="my-2 text-lg">¡Sé el primero en comentar!</p>
            </div>
          ) : (
            <ul>
              {comments!.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  postId={postId}
                  session={session}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};
