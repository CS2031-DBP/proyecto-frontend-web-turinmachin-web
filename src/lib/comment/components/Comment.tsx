'use client';

import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { sessionHasRights } from '@/lib/user/util';
import { Session } from 'next-auth';
import { useState, type HTMLAttributes } from 'react';
import { LuEllipsis, LuTrash } from 'react-icons/lu';
import { useSWRConfig } from 'swr';
import { twMerge } from 'tailwind-merge';
import { Dropdown } from '../../common/components/dropdown/Dropdown';
import { ResourceDetails } from '../../common/components/ResourceDetails';
import { CommentSchema } from '../schemas/comment';
import { CommentForm } from './CommentForm';

export interface Props extends HTMLAttributes<HTMLLIElement> {
  postId: string;
  comment: CommentSchema;
  session: Session | null;
}

export const Comment = ({
  postId,
  comment,
  session,
  className,
  ...props
}: Props) => {
  const { mutate } = useSWRConfig();
  const [replying, setReplying] = useState(false);
  const { apiClient } = useApiClient();

  const handleReplyClick = () => {
    setReplying(true);
  };

  const deleteSelf = async () => {
    await apiClient.deletePostComment(undefined, {
      params: { id: postId, commentId: comment.id },
    });
    await mutate(['comments', postId]);
    await mutate(['posts', postId]);
  };

  return (
    <li {...props} className={twMerge(className, 'my-6')}>
      <div className="flex items-center justify-between">
        <ResourceDetails
          user={comment.author}
          university={comment.author.university}
          fromDate={comment.createdAt}
          className="text-sm"
        />
        {sessionHasRights(session, comment.author) && (
          <Dropdown
            items={[
              <button key={0} onClick={deleteSelf}>
                <LuTrash className="mr-2 inline" /> Borrar
              </button>,
            ]}
            buttonProps={{ className: 'py-1 px-2' }}
          >
            <LuEllipsis size={20} className="text-foreground-muted inline" />
          </Dropdown>
        )}
      </div>
      <div className="pl-8">
        <p className="text-lg">{comment.content}</p>
        {!replying ? (
          <button
            onClick={handleReplyClick}
            className="text-foreground-muted text-sm hover:brightness-125"
          >
            Responder
          </button>
        ) : (
          <CommentForm
            postId={postId}
            parentId={comment.id}
            onCancel={() => setReplying(false)}
            submitLabel="Responder"
            autoFocusInput
            session={session}
          />
        )}

        <ul>
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              postId={postId}
              session={session}
            />
          ))}
        </ul>
      </div>
    </li>
  );
};
