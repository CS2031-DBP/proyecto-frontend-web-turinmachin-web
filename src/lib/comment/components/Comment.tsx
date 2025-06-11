import clsx from 'clsx';
import { useState, type HTMLAttributes } from 'react';
import { LuEllipsis, LuTrash } from 'react-icons/lu';
import { useParams } from 'react-router';
import { getAxiosInstance } from '../../api/util/axios-instance';
import { useUser } from '../../auth/hooks/use-user';
import { Dropdown } from '../../common/components/dropdown/Dropdown';
import { ResourceDetails } from '../../common/components/ResourceDetails';
import { CommentSchema } from '../schemas/comment';
import { CommentForm } from './CommentForm';

export interface Props extends HTMLAttributes<HTMLLIElement> {
  comment: CommentSchema;
  refetchPage: () => Promise<void>;
}

export const Comment = ({
  comment,
  refetchPage,
  className,
  ...props
}: Props) => {
  const [replying, setReplying] = useState(false);

  const { postId } = useParams();
  const [, user] = useUser();

  const handleReplyClick = () => {
    setReplying(true);
  };

  const handleReplySubmit = async (content: string) => {
    await getAxiosInstance().post(
      `/posts/${postId}/comments/${comment.id}/replies`,
      {
        content,
      },
    );

    await refetchPage();
  };

  const deleteSelf = async () => {
    await getAxiosInstance().delete(`/posts/${postId}/comments/${comment.id}`);
    await refetchPage();
  };

  return (
    <li {...props} className={clsx(className, 'my-6')}>
      <div className="flex items-center justify-between">
        <ResourceDetails
          user={comment.author}
          university={comment.author.university}
          fromDate={comment.createdAt}
          className="max-h-4 text-sm"
        />
        {(user?.role != 'USER' || comment.author.id === user?.id) && (
          <Dropdown
            items={[
              <button onClick={deleteSelf}>
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
            className="text-foreground-muted cursor-pointer text-sm hover:brightness-125"
          >
            Responder
          </button>
        ) : (
          <CommentForm
            onCancel={() => setReplying(false)}
            onSubmitContent={handleReplySubmit}
            submitLabel="Responder"
            autoFocusInput
          />
        )}

        <ul>
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} refetchPage={refetchPage} />
          ))}
        </ul>
      </div>
    </li>
  );
};
