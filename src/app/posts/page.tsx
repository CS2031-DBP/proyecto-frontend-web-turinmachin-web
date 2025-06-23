import { apiClient } from '@/lib/api/util/client';
import { auth } from '@/lib/auth';
import { Main } from '@/lib/common/components/layout/Main';
import { PostsExplorer } from '@/lib/post/components/PostsExplorer';

const Posts = async () => {
  const session = await auth();

  const universities = await apiClient.getUniversities();
  const degrees = await apiClient.getDegrees();

  return (
    <Main className="p-0">
      <PostsExplorer
        session={session}
        universities={universities}
        degrees={degrees}
      />
    </Main>
  );
};

export default Posts;
