import { apiClient } from '@/lib/api/util/client';
import { auth } from '@/lib/auth';
import { Main } from '@/lib/common/components/layout/Main';
import { PostListing } from '@/lib/post/components/PostListing';
import { routes } from '@/lib/routes';
import { DeleteUniversityButton } from '@/lib/university/components/DeleteUniversityButton';
import { UniversitySchema } from '@/lib/university/schemas/university';
import { isSessionAdmin } from '@/lib/user/util';
import { isErrorFromAlias } from '@zodios/core';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LuLink, LuPencil } from 'react-icons/lu';

export interface Props {
  params: Promise<{ id: string }>;
}

const University = async ({ params }: Readonly<Props>) => {
  const session = await auth();

  const { id: universityId } = await params;

  let university: UniversitySchema;
  try {
    university = await apiClient.getUniversityById({
      params: { id: universityId },
    });
  } catch (err) {
    if (isErrorFromAlias(apiClient.api, 'getUniversityById', err)) {
      return notFound();
    }
    throw err;
  }

  return (
    <Main className="">
      {isSessionAdmin(session) && (
        <div className="flex justify-end space-x-4">
          <Link
            href={routes.universities.editById(universityId)}
            className="button-outline"
          >
            <LuPencil className="mr-2 mb-1 inline" />
            Editar
          </Link>
          <DeleteUniversityButton session={session} university={university} />
        </div>
      )}
      <div className="mt-10 mb-6">
        <h1 className="text-center text-3xl leading-11 font-semibold">
          {university.name}
        </h1>
        {university.shortName && (
          <p className="text-foreground-muted my-2 text-center text-xl">
            ({university.shortName})
          </p>
        )}
      </div>

      {university.websiteUrl && (
        <p>
          <LuLink className="mr-2 mb-1 inline" />
          <Link
            href={university.websiteUrl}
            className="text-special hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {university.websiteUrl}
          </Link>
        </p>
      )}

      <hr className="border-muted my-4" />

      <PostListing session={session} queries={{ universityId }} />
    </Main>
  );
};

export default University;
