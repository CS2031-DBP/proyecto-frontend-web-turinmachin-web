import { useApiClient } from '@/api/hooks/use-api-client';
import { appContract } from '@/api/util/contract';
import { useViewTrigger } from '@/common/hooks/use-view-trigger';
import { ClientInferRequest } from '@ts-rest/core';
import { RefObject, useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { UniversityPageSchema } from '../schemas/university';

export type Queries = ClientInferRequest<
  typeof appContract.getUniversities
>['query'];

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
  } = useSWRInfinite(getKey, ([, query]) =>
    apiClient.getUniversities({ query }).then((res) => res.body),
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
