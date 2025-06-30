'use client';

import { DegreeSchema } from '@/lib/degree/schemas/degree';
import { UniversitySchema } from '@/lib/university/schemas/university';
import { Session } from 'next-auth';
import { LuGraduationCap, LuUniversity } from 'react-icons/lu';
import { twJoin } from 'tailwind-merge';
import { usePostExplorer } from '../hooks/use-post-explorer';
import { PostListing } from './PostListing';

export interface Props {
  session: Session | null;
  universities: UniversitySchema[];
  degrees: DegreeSchema[];
}

export const PostsExplorer = ({ session, universities, degrees }: Props) => {
  const { form, currentQueries, onSubmit } = usePostExplorer();
  const formData = form.watch();

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

        <div className="flex flex-wrap gap-2">
          <label className="border-muted has-focus:border-special flex max-w-full items-center rounded border">
            <LuUniversity size={24} className="mx-2 inline shrink-0" />
            <select
              {...form.register('universityId')}
              className={twJoin(
                'min-w-0 py-2 focus:outline-none',
                !formData.universityId && 'text-foreground-muted',
              )}
            >
              <option value="">(Cualquiera)</option>
              {universities.map((university) => (
                <option key={university.id} value={university.id} className="">
                  {university.shortName ?? university.name}
                </option>
              ))}
            </select>
          </label>
          <label className="border-muted has-focus:border-special flex max-w-full items-center rounded border">
            <LuGraduationCap size={24} className="mx-2 inline shrink-0" />
            <select
              {...form.register('degreeId')}
              className={twJoin(
                'min-w-0 py-2 focus:outline-none',
                !formData.degreeId && 'text-foreground-muted',
              )}
            >
              <option value="">(Cualquiera)</option>
              {degrees.map((degree) => (
                <option key={degree.id} value={degree.id} className="">
                  {degree.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </form>

      <div className="flex grow flex-col px-8">
        <PostListing session={session} queries={currentQueries} className="" />
      </div>
    </>
  );
};
