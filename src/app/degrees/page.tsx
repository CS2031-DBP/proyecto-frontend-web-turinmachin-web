import { auth } from '@/lib/auth';
import { Main } from '@/lib/common/components/layout/Main';
import { DegreeExplorer } from '@/lib/degree/components/DegreeExplorer';
import { routes } from '@/lib/routes';
import { isSessionAdmin } from '@/lib/user/util';
import Link from 'next/link';
import { LuPlus } from 'react-icons/lu';

const Degrees = async () => {
  const session = await auth();

  return (
    <Main>
      <h1 className="mb-4 text-3xl font-semibold">Carreras</h1>
      {isSessionAdmin(session) && (
        <div className="mb-4 flex justify-end">
          <Link href={routes.degrees.add} className="button-normal">
            <LuPlus className="mr-2 inline size-5" />
            Añadir
          </Link>
        </div>
      )}

      <DegreeExplorer />
    </Main>
  );
};

export default Degrees;
