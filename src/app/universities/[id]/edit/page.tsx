import { createServerApiClient } from '@/api/util/server';
import notFound from '@/app/not-found';
import { auth } from '@/auth';
import { Main } from '@/common/components/layout/Main';
import { routes } from '@/common/util/routes';
import { UniversityEditor } from '@/university/components/UniversityEditor';
import { isSessionAdmin } from '@/user/util';
import { redirect } from 'next/navigation';

export interface Props {
  params: Promise<{ id: string }>;
}

const EditUniversity = async ({ params }: Readonly<Props>) => {
  const { id: universityId } = await params;

  const session = await auth();
  const apiClient = createServerApiClient(session);

  if (!isSessionAdmin(session)) {
    return redirect(routes.universities.byId(universityId));
  }

  const universityResponse = await apiClient.getUniversityById({
    params: { id: universityId },
  });

  if (universityResponse.status !== 200) {
    return notFound();
  }

  const degreesResponse = await apiClient.getAllDegrees({
    query: { universityId },
  });
  const allDegreesResponse = await apiClient.getAllDegrees();

  return (
    <Main>
      <h1 className="mb-8 text-2xl font-semibold">Editar universidad</h1>
      <UniversityEditor
        availableDegrees={allDegreesResponse.body}
        university={universityResponse.body}
        universityDegrees={degreesResponse.body}
      />
    </Main>
  );
};

export default EditUniversity;
