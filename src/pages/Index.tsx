import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { LuGhost } from 'react-icons/lu';
import { isPageLast } from '../lib/api/schemas/page';
import { apiQuery } from '../lib/api/util/api-query';
import { Spinner } from '../lib/common/components/Spinner';
import { useInfiniteScroll } from '../lib/common/hooks/use-infinite-scroll';
import { PostList } from '../lib/post/components/PostList';
import { PostPageSchema } from '../lib/post/schemas/post-page';

export const Index = () => {
  const { data, fetchNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) =>
      apiQuery(`/posts?page=${pageParam}`, PostPageSchema),
    getNextPageParam: (lastPage) =>
      isPageLast(lastPage.page) ? null : lastPage.page.number + 1,
    initialPageParam: 0,
  });

  const keepFetching = !isPageLast(data.pages[data.pages.length - 1].page);

  const brainrotterRef = useInfiniteScroll(
    fetchNextPage,
    keepFetching,
    isFetchingNextPage,
  );

  const posts = data.pages.flatMap((page) => page.content);

  return (
    <>
      <h1 className="mb-8 text-center text-3xl font-bold">¡Hola de nuevo!</h1>
      <PostList posts={posts} />

      {keepFetching ? (
        <div
          ref={brainrotterRef}
          className="flex min-h-25 items-center justify-center"
        >
          <Spinner />
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
