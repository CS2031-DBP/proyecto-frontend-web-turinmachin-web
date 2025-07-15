'use client';
import { Spinner } from '@/common/components/Spinner';
import { routes } from '@/common/util/routes';
import Link from 'next/link';
import { useRef } from 'react';
import { useQueryExplorer } from '../../common/hooks/use-query-explorer';
import { useInfiniteUniversities } from '../hooks/use-infinite-universities';

export const UniversityExplorer = () => {
  const loaderRef = useRef<HTMLDivElement>(null);

  const { form, onSubmit, currentQueries } = useQueryExplorer();
  const { universities, finished } = useInfiniteUniversities({
    loaderRef,
    queries: currentQueries,
  });

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6">
        <input
          placeholder="Buscar..."
          {...form.register('query')}
          className="form-input w-100 max-w-full"
        />
      </form>
      <ul className="space-y-6">
        {universities.map((university) => (
          <li key={university.id}>
            <Link
              href={routes.universities.byId(university.id)}
              className="border-muted hover:border-special block rounded-2xl border px-8 py-4 text-lg"
            >
              <div>{university.name}</div>
              {university.shortName && (
                <div className="text-foreground-muted my-1">
                  {university.shortName}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
      {!finished && (
        <div ref={loaderRef} className="my-12 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </>
  );
};
