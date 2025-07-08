import { createServerApiClient } from '@/api/util/client';
import { auth } from '@/auth';
import { Main } from '@/common/components/layout/Main';
import { routes } from '@/common/util/routes';
import { quantify } from '@/common/util/string';
import { DeleteDegreeButton } from '@/degree/components/DeleteDegreeButton';
import { DegreeWithStatsSchema } from '@/degree/schemas/degree-with-stats';
import { PostListing } from '@/post/components/PostListing';
import { isSessionAdmin } from '@/user/util';
import { isErrorFromAlias } from '@zodios/core';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LuPencil, LuUniversity, LuUser } from 'react-icons/lu';

export interface Props {
  params: Promise<{ id: string }>;
}

const Degree = async ({ params }: Readonly<Props>) => {
  const { id: degreeId } = await params;

  const session = await auth();
  const apiClient = createServerApiClient(session);

  let degree: DegreeWithStatsSchema;
  try {
    degree = await apiClient.getDegreeById({
      params: { id: degreeId },
    });
  } catch (err) {
    if (isErrorFromAlias(apiClient.api, 'getDegreeById', err)) {
      return notFound();
    }
    throw err;
  }

  return (
    <Main className="">
      {isSessionAdmin(session) && (
        <div className="flex justify-end space-x-4">
          <Link
            href={routes.degrees.editById(degreeId)}
            className="button-outline"
          >
            <LuPencil className="mr-2 mb-1 inline" />
            Editar
          </Link>
          <DeleteDegreeButton degreeId={degree.id} />
        </div>
      )}
      <div className="my-8">
        <h1 className="text-center text-3xl leading-11 font-semibold">
          {degree.name}
        </h1>
        {degree.shortName && (
          <p className="text-foreground-muted my-2 text-center text-xl">
            ({degree.shortName})
          </p>
        )}
      </div>

      <ul className="text-foreground-muted space-y-2">
        <li>
          <LuUser className="mr-2 mb-1 inline" />
          {quantify(degree.totalStudents, 'estudiante')}
        </li>
        <li>
          <LuUniversity className="mr-2 mb-1 inline" />
          {quantify(degree.totalUniversities, 'universidad', 'es')}
        </li>
      </ul>

      <hr className="border-muted my-4" />

      <PostListing session={session} queries={{ degreeId }} />
    </Main>
  );
};

export default Degree;
