import { useApiClient } from '@/api/hooks/use-api-client';
import { Api } from '@/api/util/api';
import { useViewTrigger } from '@/common/hooks/use-view-trigger';
import { ZodiosQueryParamsByAlias } from '@zodios/core';
import { RefObject, useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { UniversityPageSchema } from '../schemas/university';

export type Queries = ZodiosQueryParamsByAlias<Api, 'getUniversities'>;

export interface UseUniversities {
  queries?: Queries;
  loaderRef: RefObject<Element | null>;
}

export const useInfiniteUniversities = ({
  queries,
  loaderRef,
}: UseUniversities) => {
  const { apiClient } = useApiClient();

  const [finished, setFinished] = useState(false);

  const getKey = (
    page: number,
    previousPage: UniversityPageSchema | null,
  ): [string, Queries] | null => {
    if (
      previousPage &&
      previousPage.page.number >= previousPage.page.totalPages - 1
    ) {
      setFinished(true);
      return null;
    }

    return ['universities', { ...queries, page }];
  };

  const {
    data = [],
    isLoading,
    isValidating,
    setSize,
    mutate,
  } = useSWRInfinite(getKey, ([, queries]) =>
    apiClient.getUniversities({ queries }),
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
