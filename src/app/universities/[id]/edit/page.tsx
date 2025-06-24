import notFound from '@/app/not-found';
import { apiClient } from '@/lib/api/util/client';
import { auth } from '@/lib/auth';
import { Main } from '@/lib/common/components/layout/Main';
import { routes } from '@/lib/routes';
import { UniversityEditor } from '@/lib/university/components/UniversityEditor';
import { UniversitySchema } from '@/lib/university/schemas/university';
import { isSessionAdmin } from '@/lib/user/util';
import { isErrorFromAlias } from '@zodios/core';
import { redirect } from 'next/navigation';

export interface Props {
  params: Promise<{ id: string }>;
}

const EditUniversity = async ({ params }: Readonly<Props>) => {
  const { id: universityId } = await params;
  const session = await auth();

  if (!isSessionAdmin(session)) {
    return redirect(routes.universities.byId(universityId));
  }

  // TODO: clean up
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

  const universityDegrees = await apiClient.getDegrees({
    queries: { universityId },
  });
  const availableDegrees = await apiClient.getDegrees();

  return (
    <Main>
      <h1 className="mb-8 text-2xl font-semibold">Editar universidad</h1>
      <UniversityEditor
        session={session}
        availableDegrees={availableDegrees}
        university={university}
        universityDegrees={universityDegrees}
      />
    </Main>
  );
};

export default EditUniversity;
