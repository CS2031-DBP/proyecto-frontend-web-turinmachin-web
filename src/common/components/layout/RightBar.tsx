'use client';

import { useApiClient } from '@/api/hooks/use-api-client';
import { routes } from '@/common/util/routes';
import { DegreeSchema } from '@/degree/schemas/degree';
import { UniversitySchema } from '@/university/schemas/university';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { LuGraduationCap, LuUniversity } from 'react-icons/lu';

const PAGE_SIZE = 5;

export const RightBar = () => {
  const { apiClient } = useApiClient();

  const [universities, setUniversities] = useState<UniversitySchema[]>([]);
  const [uniPage, setUniPage] = useState(0);
  const [uniTotalPages, setUniTotalPages] = useState<number | null>(null);

  const [degrees, setDegrees] = useState<DegreeSchema[]>([]);
  const [degPage, setDegPage] = useState(0);
  const [degTotalPages, setDegTotalPages] = useState<number | null>(null);

  const loadMoreUniversities = useCallback(async () => {
    const res = await apiClient.getUniversities({
      query: { page: uniPage, size: PAGE_SIZE },
    });

    setUniversities((prev) => [...prev, ...res.body.content]);
    setUniPage((prev) => prev + 1);
    setUniTotalPages(res.body.page.totalPages);
  }, [apiClient, uniPage]);

  const loadMoreDegrees = useCallback(async () => {
    const res = await apiClient.getDegrees({
      query: { page: degPage, size: PAGE_SIZE },
    });
    setDegrees((prev) => [...prev, ...res.body.content]);
    setDegPage((prev) => prev + 1);
    setDegTotalPages(res.body.page.totalPages);
  }, [apiClient, degPage]);

  useEffect(() => {
    loadMoreUniversities();
    loadMoreDegrees();
  }, []);

  const canLoadMoreUniversities =
    uniTotalPages === null || uniPage < uniTotalPages;

  const canLoadMoreDegrees = degTotalPages === null || degPage < degTotalPages;

  return (
    <aside className="border-muted flex w-60 min-w-60 flex-col space-y-10 overflow-y-auto border-l px-6 py-4 not-xl:hidden xl:w-68 xl:min-w-68">
      <section>
        <h2 className="mb-4 flex flex-nowrap items-center text-xl font-semibold">
          <Link href={routes.universities.root} className="hover:text-special">
            <LuUniversity className="mr-2 inline" />
            <span className="not-sm:hidden">Universidades</span>
          </Link>
        </h2>
        <div className="flex flex-col gap-2 not-sm:hidden">
          {universities.map((university) => {
            const href = routes.universities.byId(university.id);

            return (
              <Link
                key={university.id}
                href={href}
                className="bg-background hover:bg-background-alt rounded-xl px-4 py-2 transition-colors"
              >
                <div className="truncate overflow-hidden text-sm leading-tight font-medium whitespace-nowrap">
                  {university.name}
                </div>
                {university.shortName && (
                  <div className="text-foreground-muted truncate text-xs">
                    {university.shortName}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
        {canLoadMoreUniversities && (
          <button
            onClick={loadMoreUniversities}
            className="text-special mt-2 text-sm not-sm:hidden hover:underline"
          >
            Ver más universidades
          </button>
        )}
      </section>

      <section>
        <h2 className="mb-4 flex items-center text-xl font-semibold">
          <Link href={routes.degrees.root} className="hover:text-special">
            <LuGraduationCap className="mr-2 inline" />
            Carreras
          </Link>
        </h2>
        <div className="flex flex-col gap-2">
          {degrees.map((degree) => {
            const href = routes.degrees.byId(degree.id);

            return (
              <Link
                key={degree.id}
                href={href}
                className="bg-background hover:bg-background-alt rounded-xl px-4 py-2 transition-colors"
              >
                <div className="truncate overflow-hidden text-sm leading-tight font-medium whitespace-nowrap">
                  {degree.name}
                </div>
              </Link>
            );
          })}
        </div>
        {canLoadMoreDegrees && (
          <button
            onClick={loadMoreDegrees}
            className="text-special mt-2 text-sm hover:underline"
          >
            Ver más carreras
          </button>
        )}
      </section>
    </aside>
  );
};
