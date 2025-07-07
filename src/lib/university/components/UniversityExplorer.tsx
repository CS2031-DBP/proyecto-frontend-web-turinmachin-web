'use client';
import { Spinner } from '@/lib/common/components/Spinner';
import { routes } from '@/lib/routes';
import Link from 'next/link';
import { useRef } from 'react';
import { useQueryExplorer } from '../../common/hooks/use-university-explorer';
import { useUniversities } from '../hooks/use-universities';

export const UniversityExplorer = () => {
  const loaderRef = useRef<HTMLDivElement>(null);

  const { form, onSubmit, currentQueries } = useQueryExplorer();
  const { universities, finished } = useUniversities({
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
        {universities.map((university) => (
          <li key={university.id}>
            <Link
              href={routes.universities.byId(university.id)}
              className="border-muted hover:border-special block rounded-2xl border px-8 py-4 text-lg"
            >
              {university.name}
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
