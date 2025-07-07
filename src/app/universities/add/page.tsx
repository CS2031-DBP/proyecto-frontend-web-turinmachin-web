import { createServerApiClient } from '@/lib/api/util/client';
import { auth } from '@/lib/auth';
import { Main } from '@/lib/common/components/layout/Main';
import { routes } from '@/lib/routes';
import { UniversityCreator } from '@/lib/university/components/UniversityCreator';
import { isSessionAdmin } from '@/lib/user/util';
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
