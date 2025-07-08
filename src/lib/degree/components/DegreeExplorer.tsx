'use client';
import { Spinner } from '@/lib/common/components/Spinner';
import { useQueryExplorer } from '@/lib/common/hooks/use-query-explorer';
import { routes } from '@/lib/routes';
import Link from 'next/link';
import { useRef } from 'react';
import { useDegrees } from '../hooks/use-degrees';

export const DegreeExplorer = () => {
  const loaderRef = useRef<HTMLDivElement>(null);

  const { form, onSubmit, currentQueries } = useQueryExplorer();
  const { degrees, finished } = useDegrees({
    loaderRef,
    queries: currentQueries,
  });

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6">
        <input
          placeholder="Buscar..."
          autoFocus
          {...form.register('query')}
          className="form-input w-100 max-w-full"
        />
      </form>
      <ul className="space-y-6">
        {degrees.map((degree) => (
          <li key={degree.id}>
            <Link
              href={routes.degrees.byId(degree.id)}
              className="border-muted hover:border-special block rounded-2xl border px-8 py-4 text-lg"
            >
              {degree.name}
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
