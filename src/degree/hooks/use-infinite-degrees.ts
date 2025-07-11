import { useApiClient } from '@/api/hooks/use-api-client';
import { appContract } from '@/api/util/contract';
import { useViewTrigger } from '@/common/hooks/use-view-trigger';
import { ClientInferRequest } from '@ts-rest/core';
import { RefObject, useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { DegreePageSchema } from '../schemas/degree';

export type Queries = ClientInferRequest<
  typeof appContract.getDegrees
>['query'];

export interface UseUniversities {
  queries?: Queries;
  loaderRef: RefObject<Element | null>;
}

export const useInfiniteDegrees = ({ queries, loaderRef }: UseUniversities) => {
  const { apiClient } = useApiClient();

  const [finished, setFinished] = useState(false);

  const getKey = (
    page: number,
    previousPage: DegreePageSchema | null,
  ): [string, Queries] | null => {
    if (
      previousPage &&
      previousPage.page.number >= previousPage.page.totalPages - 1
    ) {
      setFinished(true);
      return null;
    }

    return ['degrees', { ...queries, page }];
  };

  const {
    data = [],
    isLoading,
    isValidating,
    setSize,
    mutate,
  } = useSWRInfinite(getKey, ([, query]) =>
    apiClient.getDegrees({ query }).then((res) => res.body),
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
