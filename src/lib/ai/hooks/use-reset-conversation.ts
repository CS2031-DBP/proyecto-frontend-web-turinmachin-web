// src/lib/ai/hooks/use-reset-conversation.ts

import { useState } from 'react';
import { useAIConversation } from './use-ai-conversation';

export const useResetConversation = () => {
  const { resetConversation } = useAIConversation();
  const [pending, setPending] = useState(false);

  const handleReset = async () => {
    try {
      setPending(true);
      await resetConversation();
    } finally {
      setPending(false);
    }
  };

  return {
    resetConversation: handleReset,
    pending,
  };
};
