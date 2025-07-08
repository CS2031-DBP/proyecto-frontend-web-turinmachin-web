import { useApiClient } from '@/api/hooks/use-api-client';
import { extractEmailDomain } from '@/common/util/string';
import { UniversitySchema } from '@/university/schemas/university';
import { isErrorFromAlias } from '@zodios/core';
import { useCallback, useEffect, useState } from 'react';

export const useUniversityEmailInfo = (email: string) => {
  const { apiClient } = useApiClient();

  const [university, setUniversity] = useState<UniversitySchema | null>(null);
  const [pending, setPending] = useState(false);

  const emailDomain = extractEmailDomain(email);

  const fetchUniversity = useCallback(
    async (emailDomain: string) => {
      try {
        const foundUniversity = await apiClient.getUniversityByEmailDomain({
          params: { emailDomain },
        });
        setUniversity(foundUniversity);
      } catch (err) {
        if (
          isErrorFromAlias(apiClient.api, 'getUniversityByEmailDomain', err)
        ) {
          setUniversity(null);
        } else {
          throw err;
        }
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
