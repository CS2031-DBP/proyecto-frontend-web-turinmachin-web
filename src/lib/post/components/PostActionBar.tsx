import clsx from 'clsx';
import { useState, type HTMLAttributes, type MouseEvent } from 'react';
import {
  BiDownArrow,
  BiSolidDownArrow,
  BiSolidUpArrow,
  BiUpArrow,
} from 'react-icons/bi';
import { LuMessageCircle, LuShare2 } from 'react-icons/lu';
import { NavLink } from 'react-router';
import { getAxiosInstance } from '../../api/util/axios-instance';
import { useUser } from '../../auth/hooks/use-user';
import { CopyButton } from '../../common/components/CopyButton';
import { Dropdown } from '../../common/components/dropdown/Dropdown';
import type { PostSchema } from '../schemas/post';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  post: PostSchema;
}

export const PostActionBar = ({ post, className, ...props }: Props) => {
  const [localCurrentVote, setLocalCurrentVote] = useState(
    post.currentVote ?? 0,
  );

  const [, user] = useUser();

  const displayScore = post.score - (post.currentVote ?? 0) + localCurrentVote;

  const handleUpvote = async (ev: MouseEvent) => {
    ev.stopPropagation();

    if (localCurrentVote === 1) {
      await getAxiosInstance().delete(`/posts/${post.id}/votes`);
      setLocalCurrentVote(0);
    } else {
      await getAxiosInstance().put(`/posts/${post.id}/upvotes`);
      setLocalCurrentVote(1);
    }
  };

  const handleDownvote = async (ev: MouseEvent) => {
    ev.stopPropagation();

    if (localCurrentVote === -1) {
      await getAxiosInstance().delete(`/posts/${post.id}/votes`);
      setLocalCurrentVote(0);
    } else {
      await getAxiosInstance().put(`/posts/${post.id}/downvotes`);
      setLocalCurrentVote(-1);
    }
  };

  const UpvoteIcon = localCurrentVote === 1 ? BiSolidUpArrow : BiUpArrow;
  const DownvoteIcon = localCurrentVote === -1 ? BiSolidDownArrow : BiDownArrow;

  return (
    <div
      {...props}
      className={clsx(
        className,
        'text-foreground-muted mt-2 flex space-x-3 font-semibold',
      )}
    >
      <div className="bg-background-alt hover:bg-alt flex items-center rounded-full">
        <button
          className={clsx(
            'hover:text-upvote disabled:text-foreground-muted/50 h-full pr-2 pl-3 enabled:cursor-pointer',
            localCurrentVote === 1 && 'text-upvote',
          )}
          title="Upvote"
          onClick={handleUpvote}
          disabled={user === null}
        >
          <UpvoteIcon className="inline" size={22} />
        </button>
        <span>{displayScore}</span>
        <button
          className={clsx(
            'hover:text-downvote disabled:text-foreground-muted/50 h-full pr-3 pl-2 enabled:cursor-pointer',
            localCurrentVote === -1 && 'text-downvote',
          )}
          title="Downvote"
          onClick={handleDownvote}
          disabled={user === null}
        >
          <DownvoteIcon className="inline" size={22} />
        </button>
      </div>
      <NavLink
        to={`/posts/${post.id}`}
        className="bg-background-alt hover:bg-alt hover:text-foreground flex items-center rounded-full px-4 py-2"
      >
        <LuMessageCircle className="mr-2" size={20} />
        <span>{post.totalComments}</span>
      </NavLink>
      <Dropdown
        items={[
          <CopyButton
            text={`${import.meta.env.VITE_DEPLOYMENT_URL}/posts/${post.id}`}
            label="Copiar link"
          />,
        ]}
        buttonProps={{
          className:
            'hover:text-foreground px-4 py-2 flex enabled:cursor-pointer items-center rounded-full bg-background-alt',
        }}
      >
        <LuShare2 className="mr-2" size={16} />
        Compartir
      </Dropdown>
    </div>
  );
};
