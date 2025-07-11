import { useApiClient } from '@/api/hooks/use-api-client';
import { extractEmailDomain } from '@/common/util/string';
import { UniversitySchema } from '@/university/schemas/university';
import { useCallback, useEffect, useState } from 'react';

export const useUniversityEmailInfo = (email: string) => {
  const { apiClient } = useApiClient();

  const [university, setUniversity] = useState<UniversitySchema | null>(null);
  const [pending, setPending] = useState(false);

  const emailDomain = extractEmailDomain(email);

  const fetchUniversity = useCallback(
    async (emailDomain: string) => {
      try {
        const res = await apiClient.getUniversityByEmailDomain({
          params: { emailDomain },
        });

        setUniversity(res.status === 404 ? null : res.body);
      } finally {
        setPending(false);
      }
    },
    [apiClient],
  );

  useEffect(() => {
    setUniversity(null);
    if (emailDomain) {
      setPending(true);
      const handle = setTimeout(() => fetchUniversity(emailDomain), 500);
      return () => clearTimeout(handle);
    }
  }, [emailDomain, fetchUniversity]);

  return { emailDomain, pending, university };
};
