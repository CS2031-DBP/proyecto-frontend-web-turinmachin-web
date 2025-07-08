import { createServerApiClient } from '@/api/util/create-server-api-client';
import notFound from '@/app/not-found';
import { auth } from '@/auth';
import { Main } from '@/common/components/layout/Main';
import { routes } from '@/common/util/routes';
import { DegreeEditor } from '@/degree/components/DegreeEditor';
import { DegreeSchema } from '@/degree/schemas/degree';
import { isSessionAdmin } from '@/user/util';
import { isErrorFromAlias } from '@zodios/core';
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

  let degree: DegreeSchema;
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
    <Main>
      <h1 className="mb-8 text-2xl font-semibold">Editar carrera</h1>
      <DegreeEditor degree={degree} />
    </Main>
  );
};

export default EditDegree;
