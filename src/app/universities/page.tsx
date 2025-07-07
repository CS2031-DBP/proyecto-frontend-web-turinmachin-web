import { auth } from '@/lib/auth';
import { Main } from '@/lib/common/components/layout/Main';
import { routes } from '@/lib/routes';
import { UniversityExplorer } from '@/lib/university/components/UniversityExplorer';
import { isSessionAdmin } from '@/lib/user/util';
import Link from 'next/link';
import { LuPlus } from 'react-icons/lu';

const Universities = async () => {
  const session = await auth();

  return (
    <Main>
      <h1 className="mb-4 text-3xl font-semibold">Universidades</h1>
      {isSessionAdmin(session) && (
        <div className="mb-4 flex justify-end">
          <Link href={routes.universities.add} className="button-normal">
            <LuPlus className="mr-2 inline size-5" />
            Añadir
          </Link>
        </div>
      )}
      <UniversityExplorer />
    </Main>
  );
};

export default Universities;
