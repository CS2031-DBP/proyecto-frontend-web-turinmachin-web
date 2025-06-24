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

  if (!isSessionAdmin(session)) {
    return redirect(routes.universities.byId(universityId));
  }

  return (
    <Main>
      <h1 className="mb-8 text-2xl font-semibold">Añadir universidad</h1>
      <UniversityCreator session={session} />
    </Main>
  );
};

export default AddUniversity;
