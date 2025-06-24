'use client';

import { DegreeSchema } from '@/lib/degree/schemas/degree';
import { routes } from '@/lib/routes';
import { UniversitySchema } from '@/lib/university/schemas/university';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuGraduationCap, LuUniversity } from 'react-icons/lu';

export interface Props {
  universities: UniversitySchema[];
  degrees: DegreeSchema[];
}

export const RightBar = ({ universities, degrees, ...props }: Props) => {
  const pathname = usePathname();

  return (
    <aside
      {...props}
      className="mx-6 my-4 flex w-46 min-w-46 flex-col space-y-10 lg:w-68 lg:min-w-68"
    >
      <section>
        <h2 className="mb-4 flex flex-nowrap items-center text-xl font-semibold">
          <Link href={routes.universities.root} className="hover:text-special">
            <LuUniversity className="mr-2 inline" />
            Universidades
          </Link>
        </h2>
        <ul className="text-foreground-muted space-y-3 pl-4">
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
                href={routes.degrees.byId(degree)}
                className="hover:text-foreground"
              >
                {degree.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};
