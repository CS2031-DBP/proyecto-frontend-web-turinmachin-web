'use client';
import { TagInput } from '@/common/components/TagInput';
import { DegreeSelector } from '@/degree/components/DegreeSelector';
import { UniversitySelector } from '@/university/components/UniversitySelector';
import { Session } from 'next-auth';
import { LuSearch } from 'react-icons/lu';
import { usePostExplorer } from '../hooks/use-post-explorer';
import { PostListing } from './PostListing';

export interface Props {
  session: Session | null;
}

export const PostExplorer = ({ session }: Props) => {
  const { form, currentQueries, onSubmit } = usePostExplorer();

  const tags = form.watch('tags');
  const universityId = form.watch('universityId');
  const degreeId = form.watch('degreeId');

  const setTags = (tags: string[]) => form.setValue('tags', tags);
  const setUniversityId = (id: string | null) =>
    form.setValue('universityId', id ?? undefined);
  const setDegreeId = (id: string | null) =>
    form.setValue('degreeId', id ?? undefined);

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="bg-background/85 border-muted sticky top-0 z-25 space-y-2 border-b px-8 py-6 backdrop-blur-lg"
      >
        <div className="form-input has-focus:border-special relative flex items-center gap-x-2">
          <LuSearch className="text-foreground-muted size-5 min-w-5" />
          <input
            placeholder="¡Busca algo!"
            autoFocus
            {...form.register('query')}
            className="min-w-0 grow bg-transparent outline-none"
          />
        </div>
        <div className="flex w-full gap-x-2 gap-y-2 not-xl:flex-col">
          <div className="flex gap-x-2 xl:max-w-100">
            <UniversitySelector
              value={universityId}
              onChange={setUniversityId}
              className="min-w-0 grow"
            />
            <DegreeSelector
              nullLabel="(Cualquiera)"
              value={degreeId}
              onChange={setDegreeId}
              className="min-w-0 grow"
            />
          </div>
          <TagInput value={tags} setValue={setTags} className="min-w-0 grow" />
        </div>
      </form>

      <div className="flex grow flex-col px-8">
        <PostListing session={session} queries={currentQueries} className="" />
      </div>
    </>
  );
};
