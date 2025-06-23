import { DegreeSchema } from '@/lib/degree/schemas/degree';
import { routes } from '@/lib/routes';
import { UniversitySchema } from '@/lib/university/schemas/university';
import Link from 'next/link';
import { LuGraduationCap, LuUniversity } from 'react-icons/lu';

export interface Props {
  universities: UniversitySchema[];
  degrees: DegreeSchema[];
}

export const RightBar = ({ universities, degrees, ...props }: Props) => {
  return (
    <aside
      {...props}
      className="mx-6 my-4 flex w-46 min-w-46 flex-col space-y-10 lg:w-68 lg:min-w-68"
    >
      <section>
        <h2 className="mb-4 flex flex-nowrap items-center text-xl font-semibold">
          <LuUniversity className="mr-2 inline" />
          <span>Universidades</span>
        </h2>
        <ul className="text-foreground-muted space-y-3 pl-4">
          {universities.map((university) => (
            <li key={university.id}>
              <Link
                href={routes.universities.byId(university)}
                className="hover:text-foreground"
              >
                {university.shortName ?? university.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="mb-4 flex items-center text-xl font-semibold">
          <LuGraduationCap className="mr-2 inline" />
          <span>Carreras</span>
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
