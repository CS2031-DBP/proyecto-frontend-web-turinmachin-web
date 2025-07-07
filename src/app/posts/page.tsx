import { createServerApiClient } from '@/lib/api/util/client';
import { auth } from '@/lib/auth';
import { Main } from '@/lib/common/components/layout/Main';
import { PostExplorer } from '@/lib/post/components/PostExplorer';

const Posts = async () => {
  const session = await auth();
  const apiClient = createServerApiClient(session);

  const universities = await apiClient.getUniversities();
  const degrees = await apiClient.getDegrees();

  return (
    <Main className="p-0">
      <PostExplorer
        session={session}
        universities={universities}
        degrees={degrees}
      />
    </Main>
  );
};

export default Posts;
