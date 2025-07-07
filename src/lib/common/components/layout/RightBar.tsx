'use client';

import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { DegreeSchema } from '@/lib/degree/schemas/degree';
import { routes } from '@/lib/routes';
import { UniversitySchema } from '@/lib/university/schemas/university';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LuGraduationCap, LuUniversity } from 'react-icons/lu';

const PAGE_SIZE = 5;

export const RightBar = () => {
  const { apiClient } = useApiClient();
  const pathname = usePathname();

  const [universities, setUniversities] = useState<UniversitySchema[]>([]);
  const [uniPage, setUniPage] = useState(0);
  const [uniTotalPages, setUniTotalPages] = useState<number | null>(null);

  const [degrees, setDegrees] = useState<DegreeSchema[]>([]);
  const [degPage, setDegPage] = useState(0);
  const [degTotalPages, setDegTotalPages] = useState<number | null>(null);

  useEffect(() => {
    loadMoreUniversities();
    loadMoreDegrees();
  }, []);

  const loadMoreUniversities = async () => {
    const res = await apiClient.getUniversities({
      queries: { page: uniPage, size: PAGE_SIZE },
    });
    setUniversities((prev) => [...prev, ...res.content]);
    setUniPage((prev) => prev + 1);
    setUniTotalPages(res.page.totalPages);
  };

  const loadMoreDegrees = async () => {
    const res = await apiClient.getDegrees({
      queries: { page: degPage, size: PAGE_SIZE },
    });
    setDegrees((prev) => [...prev, ...res.content]);
    setDegPage((prev) => prev + 1);
    setDegTotalPages(res.page.totalPages);
  };

  const canLoadMoreUniversities =
    uniTotalPages === null || uniPage < uniTotalPages;

  const canLoadMoreDegrees = degTotalPages === null || degPage < degTotalPages;

  return (
    <aside className="border-muted flex w-60 min-w-60 flex-col space-y-10 overflow-y-scroll border-l px-6 py-4 not-lg:hidden lg:w-68 lg:min-w-68">
      <section>
        <h2 className="mb-4 flex flex-nowrap items-center text-xl font-semibold">
          <Link href={routes.universities.root} className="hover:text-special">
            <LuUniversity className="mr-2 inline" />
            <span className="not-sm:hidden">Universidades</span>
          </Link>
        </h2>
        <ul className="text-foreground-muted space-y-3 pl-4 not-sm:hidden">
          {universities.map((university) => {
            const href = routes.universities.byId(university.id);
            return (
              <li key={university.id}>
                <Link
                  href={href}
                  className={
                    pathname === href
                      ? 'text-special font-semibold'
                      : 'hover:text-foreground'
                  }
                >
                  {university.shortName ?? university.name}
                </Link>
              </li>
            );
          })}
        </ul>
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
        <ul className="text-foreground-muted space-y-3 pl-4">
          {degrees.map((degree) => (
            <li key={degree.id}>
              <Link
                href={routes.degrees.byId(degree.id)}
                className="hover:text-foreground"
              >
                {degree.name}
              </Link>
            </li>
          ))}
        </ul>
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
