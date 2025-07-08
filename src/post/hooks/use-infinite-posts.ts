import { useApiClient } from '@/api/hooks/use-api-client';
import { Api } from '@/api/util/api';
import { useViewTrigger } from '@/common/hooks/use-view-trigger';
import { ZodiosQueryParamsByAlias } from '@zodios/core';
import { RefObject, useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { PostPageSchema } from '../schemas/post';

export type Queries = ZodiosQueryParamsByAlias<Api, 'getPosts'>;

export interface UsePostsOptions {
  queries?: Queries;
  loaderRef: RefObject<Element | null>;
}

export const useInfinitePosts = ({ queries, loaderRef }: UsePostsOptions) => {
  const { apiClient } = useApiClient();

  const [finished, setFinished] = useState(false);

  const getKey = (
    page: number,
    previousPage: PostPageSchema | null,
  ): [string, Queries] | null => {
    if (
      previousPage &&
      previousPage.page.number >= previousPage.page.totalPages - 1
    ) {
      setFinished(true);
      return null;
    }

    return ['posts', { ...queries, page }];
  };

  const {
    data = [],
    isLoading,
    isValidating,
    setSize,
    mutate,
  } = useSWRInfinite(getKey, ([, queries]) => apiClient.getPosts({ queries }));

  useEffect(() => {
    setFinished(false);
    mutate(undefined, { revalidate: true });
  }, [queries, setSize, mutate]);

  useViewTrigger(loaderRef, !isLoading && !isValidating && !finished, () => {
    setSize((prevSize) => prevSize + 1);
  });

  const posts = data.flatMap((page) => page.content);
  return { pages: data, posts, finished };
};
