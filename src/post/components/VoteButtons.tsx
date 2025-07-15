'use client';

import { Session } from 'next-auth';
import { HTMLAttributes } from 'react';
import {
  BiDownArrow,
  BiSolidDownArrow,
  BiSolidUpArrow,
  BiUpArrow,
} from 'react-icons/bi';
import { twJoin, twMerge } from 'tailwind-merge';
import { useVoteButtons } from '../hooks/use-vote-buttons';

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
  const { displayScore, localCurrentVote, upvote, downvote } = useVoteButtons({
    postId,
    originalVote,
    postScore,
    session,
  });
  const UpvoteIcon = localCurrentVote === 1 ? BiSolidUpArrow : BiUpArrow;
  const DownvoteIcon = localCurrentVote === -1 ? BiSolidDownArrow : BiDownArrow;

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
          'hover:text-upvote h-full pr-2 pl-3',
          localCurrentVote === 1 && 'text-upvote',
        )}
        title="Upvote"
        onClick={upvote}
      >
        <UpvoteIcon className="inline" size={22} />
      </button>
      <span className="min-w-4 text-center">{displayScore}</span>
      <button
        className={twJoin(
          'hover:text-downvote h-full pr-3 pl-2',
          localCurrentVote === -1 && 'text-downvote',
        )}
        title="Downvote"
        onClick={downvote}
      >
        <DownvoteIcon className="inline" size={22} />
      </button>
    </div>
  );
};
