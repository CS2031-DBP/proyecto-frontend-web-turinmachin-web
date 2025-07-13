import { useApiClient } from '@/api/hooks/use-api-client';
import { useState } from 'react';

export const useTagSuggestions = () => {
  const { apiClient } = useApiClient();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (content: string) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const removeSuggestion = (tag: string) =>
    setSuggestions((prev) => prev.filter((t) => t !== tag));

  return { suggestions, loading, fetchSuggestions, removeSuggestion };
};
