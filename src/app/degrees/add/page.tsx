import { auth } from '@/auth';
import { Main } from '@/common/components/layout/Main';
import { routes } from '@/common/util/routes';
import { DegreeCreator } from '@/degree/components/DegreeCreator';
import { isSessionAdmin } from '@/user/util';
import { redirect } from 'next/navigation';

export interface Props {
  params: Promise<{ id: string }>;
}

const AddDegree = async ({ params }: Readonly<Props>) => {
  const { id: degreeId } = await params;
  const session = await auth();

  if (!isSessionAdmin(session)) {
    return redirect(routes.degrees.byId(degreeId));
  }

  return (
    <Main>
      <h1 className="mb-8 text-2xl font-semibold">Añadir carrera</h1>
      <DegreeCreator />
    </Main>
  );
};

export default AddDegree;
