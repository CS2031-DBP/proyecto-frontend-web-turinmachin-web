import { auth } from '@/lib/auth';
import { Main } from '@/lib/common/components/layout/Main';
import { DegreeCreator } from '@/lib/degree/components/DegreeCreator';
import { routes } from '@/lib/routes';
import { isSessionAdmin } from '@/lib/user/util';
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
      <DegreeCreator session={session} />
    </Main>
  );
};

export default AddDegree;
