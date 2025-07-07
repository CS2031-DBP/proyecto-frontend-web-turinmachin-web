import { auth } from '@/lib/auth';
import { Main } from '@/lib/common/components/layout/Main';
import { PostExplorer } from '@/lib/post/components/PostExplorer';

const Posts = async () => {
  const session = await auth();

  return (
    <Main className="p-0">
      <PostExplorer session={session} />
    </Main>
  );
};

export default Posts;
