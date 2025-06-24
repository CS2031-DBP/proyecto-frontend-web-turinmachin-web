import { apiClient } from '@/lib/api/util/client';
import { auth } from '@/lib/auth';
import { Main } from '@/lib/common/components/layout/Main';
import { routes } from '@/lib/routes';
import { isSessionAdmin } from '@/lib/user/util';
import Link from 'next/link';
import { LuPlus } from 'react-icons/lu';

const Degrees = async () => {
  const session = await auth();
  const degrees = await apiClient.getDegrees();

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

      <ul className="space-y-6">
        {degrees.map((degree) => (
          <li key={degree.id}>
            <Link
              href={routes.degrees.byId(degree.id)}
              className="border-muted hover:border-special block rounded-2xl border px-8 py-4 text-lg"
            >
              {degree.name}
            </Link>
          </li>
        ))}
      </ul>
    </Main>
  );
};

export default Degrees;
