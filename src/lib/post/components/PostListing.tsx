'use client';

import { api } from '@/lib/api/util/client';
import { useSessionApiClient } from '@/lib/auth/schemas/hooks/use-session-api-client';
import { Spinner } from '@/lib/common/components/Spinner';
import { useViewTrigger } from '@/lib/common/hooks/use-view-trigger';
import { ZodiosQueryParamsByAlias } from '@zodios/core';
import { Session } from 'next-auth';
import { useEffect, useRef, useState, type HTMLAttributes } from 'react';
import { LuFileSearch, LuGhost } from 'react-icons/lu';
import useSWRInfinite from 'swr/infinite';
import { twJoin, twMerge } from 'tailwind-merge';
import { PostPageSchema } from '../schemas/post';
import { PostCard } from './PostCard';

export interface Props extends HTMLAttributes<HTMLUListElement> {
  session: Session | null;
  queries?: Omit<ZodiosQueryParamsByAlias<typeof api, 'getPosts'>, 'page'>;
}

export const PostListing = ({
  session,
  queries,
  className,
  ...props
}: Props) => {
  const [finished, setFinished] = useState(false);

  const getKey = (
    pageIndex: number,
    previousPage: PostPageSchema | null,
  ): [string, number] | null => {
    if (previousPage && previousPage.content.length === 0) {
      setFinished(true);
      return null;
    }

    return ['posts', pageIndex];
  };

  const apiClient = useSessionApiClient(session);
  const {
    data = [],
    isLoading,
    isValidating,
    setSize,
    mutate,
  } = useSWRInfinite(getKey, ([, page]) =>
    apiClient.getPosts({ queries: { size: 10, ...queries, page } }),
  );

  const loaderRef = useRef<HTMLDivElement>(null);

  useViewTrigger(loaderRef, !isLoading && !isValidating && !finished, () => {
    setSize((prevSize) => prevSize + 1);
  });

  useEffect(() => {
    setFinished(false);
    mutate(undefined, { revalidate: true });
  }, [queries, setSize, mutate]);

  const allData = data.flatMap((page) => page.content);

  return (
    <>
      <ul {...props} className={twMerge(className, 'mx-auto w-full max-w-lg')}>
        {allData.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            className="my-6"
            session={session}
          />
        ))}
      </ul>

      {!finished ? (
        <div
          ref={loaderRef}
          className={twJoin(
            'flex min-h-25 items-center justify-center',
            data.length === 0 ? 'grow' : '',
          )}
        >
          <Spinner />
        </div>
      ) : allData.length === 0 ? (
        <div className="text-foreground-muted my-8 flex grow flex-col justify-center text-center">
          <LuFileSearch size={54} className="mx-auto" />
          <p className="my-4 text-center text-lg">
            Nada por aquí, nada por allá.
          </p>
        </div>
      ) : (
        <div className="text-foreground-muted my-8 text-center">
          <LuGhost size={54} className="mx-auto" />
          <p className="my-4 text-center text-lg">
            Parece que has llegado al final.
          </p>
        </div>
      )}
    </>
  );
};
