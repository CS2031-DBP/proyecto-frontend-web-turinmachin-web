import { createServerApiClient } from '@/lib/api/util/client';
import { Spinner } from '@/lib/common/components/Spinner';
import { Session } from 'next-auth';
import useSWR from 'swr';
import { twJoin } from 'tailwind-merge';
import { PostCard } from './PostCard';

export interface Props {
  page: number;
  session: Session | null;
}

export const PostPage = ({ page, session }: Props) => {
  const apiClient = createServerApiClient(session);
  const { data } = useSWR(['posts', page], () =>
    apiClient.getPosts({ queries: { page } }),
  );

  if (!data) {
    return (
      <div
        className={twJoin(
          'flex items-center justify-center',
          page === 0 ? 'h-full' : 'my-8',
        )}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {data.content.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          className="my-6"
          session={session}
        />
      ))}
    </>
  );
};
