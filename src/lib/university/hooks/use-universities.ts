import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { Api } from '@/lib/api/util/client';
import { useViewTrigger } from '@/lib/common/hooks/use-view-trigger';
import { ZodiosQueryParamsByAlias } from '@zodios/core';
import { RefObject, useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { UniversityPageSchema } from '../schemas/university';

export interface UseUniversities {
  queries?: ZodiosQueryParamsByAlias<Api, 'getUniversities'>;
  loaderRef: RefObject<Element | null>;
}

export const useUniversities = ({ queries, loaderRef }: UseUniversities) => {
  const { apiClient } = useApiClient();

  const [finished, setFinished] = useState(false);

  const getKey = (
    pageIndex: number,
    previousPage: UniversityPageSchema | null,
  ): [string, number] | null => {
    if (
      previousPage &&
      previousPage.page.number >= previousPage.page.totalPages - 1
    ) {
      setFinished(true);
      return null;
    }

    return ['universities', pageIndex];
  };

  const {
    data = [],
    isLoading,
    isValidating,
    setSize,
    mutate,
  } = useSWRInfinite(getKey, ([, page]) =>
    apiClient.getUniversities({ queries: { ...queries, page } }),
  );

  useEffect(() => {
    setFinished(false);
    mutate(undefined, { revalidate: true });
  }, [queries, setSize, mutate]);

  useViewTrigger(loaderRef, !isLoading && !isValidating && !finished, () => {
    setSize((prevSize) => prevSize + 1);
  });

  const universities = data.flatMap((page) => page.content);
  return { pages: data, universities, finished };
};
