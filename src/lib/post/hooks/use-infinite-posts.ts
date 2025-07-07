import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { Api } from '@/lib/api/util/client';
import { useViewTrigger } from '@/lib/common/hooks/use-view-trigger';
import { ZodiosQueryParamsByAlias } from '@zodios/core';
import { RefObject, useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { PostPageSchema } from '../schemas/post';

export interface UsePostsOptions {
  queries?: ZodiosQueryParamsByAlias<Api, 'getPosts'>;
  loaderRef: RefObject<Element | null>;
}

export const useInfinitePosts = ({ queries, loaderRef }: UsePostsOptions) => {
  const { apiClient } = useApiClient();

  const [finished, setFinished] = useState(false);

  const getKey = (
    pageIndex: number,
    previousPage: PostPageSchema | null,
  ): [string, number] | null => {
    if (
      previousPage &&
      previousPage.page.number >= previousPage.page.totalPages - 1
    ) {
      setFinished(true);
      return null;
    }

    return ['posts', pageIndex];
  };

  const {
    data = [],
    isLoading,
    isValidating,
    setSize,
    mutate,
  } = useSWRInfinite(getKey, ([, page]) =>
    apiClient.getPosts({ queries: { ...queries, page } }),
  );

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
