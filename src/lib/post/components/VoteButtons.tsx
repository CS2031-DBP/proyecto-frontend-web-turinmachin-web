'use client';

import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { Session } from 'next-auth';
import { HTMLAttributes, useState } from 'react';
import {
  BiDownArrow,
  BiSolidDownArrow,
  BiSolidUpArrow,
  BiUpArrow,
} from 'react-icons/bi';
import { twJoin, twMerge } from 'tailwind-merge';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  postId: string;
  postScore: number;
  originalVote?: number;
  session: Session | null;
}

export const VoteButtons = ({
  postId,
  originalVote,
  postScore,
  className,
  session,
  ...props
}: Props) => {
  const [localCurrentVote, setLocalCurrentVote] = useState(originalVote ?? 0);

  const UpvoteIcon = localCurrentVote === 1 ? BiSolidUpArrow : BiUpArrow;
  const DownvoteIcon = localCurrentVote === -1 ? BiSolidDownArrow : BiDownArrow;

  const displayScore = postScore - (originalVote ?? 0) + localCurrentVote;

  const { apiClient } = useApiClient();

  const handleUpvote = async () => {
    if (session === null) return;

    if (localCurrentVote === 1) {
      await apiClient.removePostVote(undefined, { params: { id: postId } });
      setLocalCurrentVote(0);
    } else {
      await apiClient.upvotePost(undefined, { params: { id: postId } });
      setLocalCurrentVote(1);
    }
  };

  const handleDownvote = async () => {
    if (session === null) return;

    if (localCurrentVote === -1) {
      await apiClient.removePostVote(undefined, { params: { id: postId } });
      setLocalCurrentVote(0);
    } else {
      await apiClient.downvotePost(undefined, { params: { id: postId } });
      setLocalCurrentVote(-1);
    }
  };

  return (
    <div
      className={twMerge(
        'bg-background-alt hover:bg-alt flex items-center rounded-full py-2',
        className,
      )}
      {...props}
    >
      <button
        className={twJoin(
          'hover:text-upvote disabled:text-foreground-muted/50 h-full pr-2 pl-3',
          localCurrentVote === 1 && 'text-upvote',
        )}
        title="Upvote"
        onClick={handleUpvote}
        disabled={session === null || !session.user.verified}
      >
        <UpvoteIcon className="inline" size={22} />
      </button>
      <span className="min-w-4 text-center">{displayScore}</span>
      <button
        className={twJoin(
          'hover:text-downvote disabled:text-foreground-muted/50 h-full pr-3 pl-2',
          localCurrentVote === -1 && 'text-downvote',
        )}
        title="Downvote"
        onClick={handleDownvote}
        disabled={session === null || !session.user.verified}
      >
        <DownvoteIcon className="inline" size={22} />
      </button>
    </div>
  );
};
