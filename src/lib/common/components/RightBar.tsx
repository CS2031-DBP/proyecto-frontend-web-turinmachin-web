import clsx from 'clsx';
import { type HTMLAttributes } from 'react';
import { LuGraduationCap, LuUniversity } from 'react-icons/lu';

export type Props = HTMLAttributes<HTMLDivElement>;

const universities = [
  { name: 'UTEC', icon: LuUniversity },
  { name: 'PUCP', icon: LuUniversity },
  { name: 'UPC', icon: LuUniversity },
  { name: 'ULIMA', icon: LuUniversity },
  { name: 'UP', icon: LuUniversity },
];

const careers = [
  { name: 'Computer Science', icon: LuGraduationCap },
  { name: 'Data Science', icon: LuGraduationCap },
  { name: 'Mathematics', icon: LuGraduationCap },
];

export const RightBar = ({ className, ...props }: Props) => {
  return (
    <aside {...props} className={clsx(className, 'mx-6 my-4 flex flex-col')}>
      <section className="grow">
        <div>
          <h3 className="mt-2 mb-2 text-xl font-semibold">Universidades</h3>
          <ul className="space-y-2">
            {universities.map((university) => (
              <li
                key={university.name}
                className="flex items-center space-x-2 px-2 text-lg"
              >
                <university.icon />
                <span>{university.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mt-2 mb-2 text-xl font-semibold">Carreras</h3>
          <ul className="space-y-2">
            {careers.map((career) => (
              <li
                key={career.name}
                className="flex items-center space-x-2 px-2 text-lg"
              >
                <career.icon />
                <span>{career.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </aside>
  );
};
