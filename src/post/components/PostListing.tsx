'use client';

import { appContract } from '@/api/util/contract';
import { Spinner } from '@/common/components/Spinner';
import { ClientInferRequest } from '@ts-rest/core';
import { Session } from 'next-auth';
import { useRef, type HTMLAttributes } from 'react';
import { LuFileSearch, LuGhost } from 'react-icons/lu';
import { twJoin, twMerge } from 'tailwind-merge';
import { useInfinitePosts } from '../hooks/use-infinite-posts';
import { PostCard } from './PostCard';

export interface Props extends HTMLAttributes<HTMLUListElement> {
  session: Session | null;
  queries?: ClientInferRequest<typeof appContract.getPosts>['query'];
}

export const PostListing = ({
  session,
  queries,
  className,
  ...props
}: Props) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const { posts, finished } = useInfinitePosts({ queries, loaderRef });

  return (
    <>
      <ul {...props} className={twMerge(className, 'mx-auto w-full max-w-lg')}>
        {posts.map((post) => (
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
            posts.length === 0 && 'grow',
          )}
        >
          <Spinner />
        </div>
      ) : posts.length === 0 ? (
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
