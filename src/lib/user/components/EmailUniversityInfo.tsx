'use client';

import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { extractEmailDomain } from '@/lib/common/util/string';
import { UniversitySchema } from '@/lib/university/schemas/university';
import { isErrorFromAlias } from '@zodios/core';
import { useCallback, useEffect, useState } from 'react';
import { LuInfo } from 'react-icons/lu';
import { twJoin } from 'tailwind-merge';

export interface Props {
  email: string;
}

export const EmailUniversityInfo = ({ email }: Props) => {
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

  if (!emailDomain) return null;

  return (
    <p
      className={twJoin(
        university ? 'text-foreground-muted' : 'text-yellow-200',
      )}
    >
      <LuInfo className="mr-2 mb-1 inline" />
      {pending ? (
        'Buscando...'
      ) : university ? (
        <>
          Este correo le pertenece a{' '}
          <span className="text-special font-semibold">
            {university.shortName ?? university.name}
          </span>
          .
        </>
      ) : (
        'Este correo no le pertenece a alguna universidad que conozcamos!'
      )}
    </p>
  );
};
