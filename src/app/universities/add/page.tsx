import { createServerApiClient } from '@/api/util/create-server-api-client';
import { auth } from '@/auth';
import { Main } from '@/common/components/layout/Main';
import { routes } from '@/common/util/routes';
import { UniversityCreator } from '@/university/components/UniversityCreator';
import { isSessionAdmin } from '@/user/util';
import { redirect } from 'next/navigation';

export interface Props {
  params: Promise<{ id: string }>;
}

const AddUniversity = async ({ params }: Readonly<Props>) => {
  const { id: universityId } = await params;

  const session = await auth();
  const apiClient = createServerApiClient(session);

  if (!isSessionAdmin(session)) {
    return redirect(routes.universities.byId(universityId));
  }

  const availableDegrees = await apiClient.getAllDegrees();

  return (
    <Main>
      <h1 className="mb-8 text-2xl font-semibold">Añadir universidad</h1>
      <UniversityCreator availableDegrees={availableDegrees} />
    </Main>
  );
};

export default AddUniversity;
