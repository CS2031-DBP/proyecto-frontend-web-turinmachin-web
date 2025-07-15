import { useApiClient } from '@/api/hooks/use-api-client';
import { usePendingCallback } from '@/common/hooks/use-pending';
import { useState } from 'react';

export const useTagSuggestions = () => {
  const { apiClient } = useApiClient();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [pending, fetchSuggestions] = usePendingCallback(
    async (content: string) => {
      try {
        const res = await apiClient.tagCompletion({ query: { content } });

        if (res.status === 200) {
          setSuggestions(res.body);
        } else {
          console.warn('Sugerencias fallidas:', res.body);
          setSuggestions([]);
        }
      } catch (e) {
        console.error('Error al obtener sugerencias de tags', e);
        setSuggestions([]);
      }
    },
    [apiClient],
  );

  const removeSuggestion = (tag: string) =>
    setSuggestions((prev) => prev.filter((t) => t !== tag));

  return { suggestions, pending, fetchSuggestions, removeSuggestion };
};
