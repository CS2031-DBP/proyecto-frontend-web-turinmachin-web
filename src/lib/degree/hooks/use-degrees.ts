import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { Api } from '@/lib/api/util/client';
import { useViewTrigger } from '@/lib/common/hooks/use-view-trigger';
import { ZodiosQueryParamsByAlias } from '@zodios/core';
import { RefObject, useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { DegreePageSchema } from '../schemas/degree';

export interface UseUniversities {
  queries?: ZodiosQueryParamsByAlias<Api, 'getDegrees'>;
  loaderRef: RefObject<Element | null>;
}

export const useDegrees = ({ queries, loaderRef }: UseUniversities) => {
  const { apiClient } = useApiClient();

  const [finished, setFinished] = useState(false);

  const getKey = (
    pageIndex: number,
    previousPage: DegreePageSchema | null,
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
    apiClient.getDegrees({ queries: { ...queries, page } }),
  );

  useEffect(() => {
    setFinished(false);
    mutate(undefined, { revalidate: true });
  }, [queries, setSize, mutate]);

  useViewTrigger(loaderRef, !isLoading && !isValidating && !finished, () => {
    setSize((prevSize) => prevSize + 1);
  });

  const degrees = data.flatMap((page) => page.content);
  return { pages: data, degrees, finished };
};
