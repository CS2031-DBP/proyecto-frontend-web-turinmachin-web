import { createServerApiClient } from '@/api/util/server';
import notFound from '@/app/not-found';
import { auth } from '@/auth';
import { Main } from '@/common/components/layout/Main';
import { routes } from '@/common/util/routes';
import { DegreeEditor } from '@/degree/components/DegreeEditor';
import { isSessionAdmin } from '@/user/util';
import { redirect } from 'next/navigation';

export interface Props {
  params: Promise<{ id: string }>;
}

const EditDegree = async ({ params }: Readonly<Props>) => {
  const { id: degreeId } = await params;

  const session = await auth();
  const apiClient = createServerApiClient(session);

  if (!isSessionAdmin(session)) {
    return redirect(routes.degrees.byId(degreeId));
  }

  const response = await apiClient.getDegreeById({
    params: { id: degreeId },
  });

  if (response.status !== 200) {
    return notFound();
  }

  return (
    <Main>
      <h1 className="mb-8 text-2xl font-semibold">Editar carrera</h1>
      <DegreeEditor degree={response.body} />
    </Main>
  );
};

export default EditDegree;
