import { auth } from '@/auth';
import { Main } from '@/common/components/layout/Main';
import { routes } from '@/common/util/routes';
import { DegreeExplorer } from '@/degree/components/DegreeExplorer';
import { isSessionAdmin } from '@/user/util';
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
