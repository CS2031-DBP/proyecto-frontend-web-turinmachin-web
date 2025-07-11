import { createServerApiClient } from '@/api/util/server';
import { auth } from '@/auth';
import { Main } from '@/common/components/layout/Main';
import { routes } from '@/common/util/routes';
import { quantify } from '@/common/util/string';
import { PostListing } from '@/post/components/PostListing';
import { DeleteUniversityButton } from '@/university/components/DeleteUniversityButton';
import { isSessionAdmin } from '@/user/util';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LuLink, LuPencil, LuUser } from 'react-icons/lu';

export interface Props {
  params: Promise<{ id: string }>;
}

const UniversityPage = async ({ params }: Readonly<Props>) => {
  const session = await auth();
  const apiClient = createServerApiClient(session);

  const { id: universityId } = await params;

  const response = await apiClient.getUniversityWithStatsById({
    params: { id: universityId },
  });

  if (response.status !== 200) {
    return notFound();
  }

  const university = response.body;

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
          <DeleteUniversityButton universityId={university.id} />
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

      <ul className="text-foreground-muted space-y-2">
        <li>
          <LuUser className="mr-2 mb-1 inline" />
          {quantify(university.totalStudents, 'estudiante')}
        </li>
        {university.websiteUrl && (
          <li>
            <LuLink className="mr-2 mb-1 inline" />
            <Link
              href={university.websiteUrl}
              className="text-special hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {university.websiteUrl}
            </Link>
          </li>
        )}
      </ul>

      <hr className="border-muted my-4" />

      <PostListing session={session} queries={{ universityId }} />
    </Main>
  );
};

export default UniversityPage;
