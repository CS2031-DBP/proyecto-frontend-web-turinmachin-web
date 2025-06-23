import { apiClient } from '@/lib/api/util/client';
import { auth } from '@/lib/auth';
import { Main } from '@/lib/common/components/layout/Main';
import { PostListing } from '@/lib/post/components/PostListing';

export interface Props {
  params: Promise<{ id: string }>;
}

const University = async ({ params }: Readonly<Props>) => {
  const session = await auth();

  const { id: universityId } = await params;
  const university = await apiClient.getUniversityById({
    params: { id: universityId },
  });

  return (
    <Main className="py-12">
      <div className="mb-8">
        <h1 className="text-center text-3xl leading-11 font-semibold">
          {university.name}
        </h1>
        {university.shortName && (
          <p className="text-foreground-muted my-2 text-center text-xl">
            ({university.shortName})
          </p>
        )}
      </div>

      <hr className="border-muted my-4" />

      <PostListing session={session} queries={{ universityId }} />
    </Main>
  );
};

export default University;
