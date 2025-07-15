import { useApiClient } from '@/api/hooks/use-api-client';
import { usePopup } from '@/common/hooks/use-popup';
import { Session } from 'next-auth';
import { useState } from 'react';

export interface UseVoteButtonsOptions {
  postId: string;
  postScore: number;
  originalVote?: number;
  session: Session | null;
}

export const useVoteButtons = ({
  postId,
  originalVote,
  postScore,
  session,
}: UseVoteButtonsOptions) => {
  const { openPopup } = usePopup();
  const { apiClient } = useApiClient();
  const [localCurrentVote, setLocalCurrentVote] = useState(originalVote ?? 0);

  const upvote = async () => {
    if (session === null) {
      openPopup('login', {});
      return;
    }

    if (!session.user.verified) {
      openPopup('verification', {});
      return;
    }

    if (localCurrentVote === 1) {
      await apiClient.removePostVote({ params: { id: postId } });
      setLocalCurrentVote(0);
    } else {
      await apiClient.upvotePost({ params: { id: postId } });
      setLocalCurrentVote(1);
    }
  };

  const downvote = async () => {
    if (session === null) {
      openPopup('login', {});
      return;
    }

    if (!session.user.verified) {
      openPopup('verification', {});
      return;
    }

    if (localCurrentVote === -1) {
      await apiClient.removePostVote({ params: { id: postId } });
      setLocalCurrentVote(0);
    } else {
      await apiClient.downvotePost({ params: { id: postId } });
      setLocalCurrentVote(-1);
    }
  };

  const displayScore = postScore - (originalVote ?? 0) + localCurrentVote;

  return { displayScore, localCurrentVote, upvote, downvote };
};
