'use client';
import { useQueryExplorer } from '@/common/hooks/use-query-explorer';
import { Session } from 'next-auth';
import { useSearchParams } from 'next/navigation';
import { PostListing } from './PostListing';

export interface Props {
  session: Session | null;
}

export const PostExplorer = ({ session }: Props) => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  const { form, currentQueries, onSubmit } = useQueryExplorer({
    defaultValues: { query: initialQuery },
  });

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-background/85 border-muted sticky top-0 z-25 space-y-2 border-b px-8 py-6 backdrop-blur-lg"
      >
        <input
          placeholder="¡Busca algo!"
          autoFocus
          {...form.register('query')}
          className="form-input w-full min-w-0"
        />
      </form>

      <div className="flex grow flex-col px-8">
        <PostListing session={session} queries={currentQueries} className="" />
      </div>
    </>
  );
};
