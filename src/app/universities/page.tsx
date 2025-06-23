import { apiClient } from '@/lib/api/util/client';
import { Main } from '@/lib/common/components/layout/Main';
import { routes } from '@/lib/routes';
import Link from 'next/link';

const Universities = async () => {
  const universities = await apiClient.getUniversities();

  return (
    <Main>
      <h1 className="mb-4 text-3xl font-semibold">Universidades</h1>
      <ul className="space-y-6">
        {universities.map((university) => (
          <li key={university.id}>
            <Link
              href={routes.universities.byId(university)}
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
