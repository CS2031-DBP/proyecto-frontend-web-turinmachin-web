'use client';

import { AIMessageResponseSchema } from '@/lib/ai/schemas/ai-message-response';
import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { useEffect, useState } from 'react';

export const useAIConversation = ({
  enabled = true,
}: { enabled?: boolean } = {}) => {
  const { apiClient } = useApiClient();

  const [messages, setMessages] = useState<AIMessageResponseSchema[]>([]);
  const [loading, setLoading] = useState(enabled);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const fetchMessages = async () => {
      try {
        const data = await apiClient.getConversation();
        setMessages(data);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [apiClient, enabled]);

  const sendMessage = async (content: string) => {
    if (!enabled) return;
    setSending(true);

    const tempUserMessage: AIMessageResponseSchema = {
      id: `temp-user-${Date.now()}`,
      role: 'USER',
      content,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, tempUserMessage]);

    try {
      const response = await apiClient.sendMessage({ content });
      setMessages((prev) => [...prev, response]);
    } finally {
      setSending(false);
    }
  };

  const resetConversation = async () => {
    if (!enabled) return;
    await apiClient.resetConversation(undefined);
    setMessages([]);
  };

  return {
    messages,
    loading,
    sending,
    sendMessage,
    resetConversation,
  };
};
