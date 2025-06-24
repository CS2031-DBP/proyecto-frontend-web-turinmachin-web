import { apiClient } from '@/lib/api/util/client';
import { auth } from '@/lib/auth';
import { Main } from '@/lib/common/components/layout/Main';
import { routes } from '@/lib/routes';
import { isSessionAdmin } from '@/lib/user/util';
import Link from 'next/link';
import { LuPlus } from 'react-icons/lu';

const Universities = async () => {
  const session = await auth();
  const universities = await apiClient.getUniversities();

  return (
    <Main>
      <h1 className="mb-4 text-3xl font-semibold">Universidades</h1>
      {isSessionAdmin(session) && (
        <div className="flex justify-end">
          <Link href={routes.universities.add} className="button-normal">
            <LuPlus className="mr-2 inline size-5" />
            Añadir universidad
          </Link>
        </div>
      )}

      <ul className="space-y-6">
        {universities.map((university) => (
          <li key={university.id}>
            <Link
              href={routes.universities.byId(university.id)}
              className="border-muted hover:border-special block rounded-2xl border px-8 py-4 text-lg"
            >
              {university.name}
            </Link>
          </li>
        ))}
      </ul>
    </Main>
  );
};

export default Universities;
