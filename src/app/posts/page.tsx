import { auth } from '@/auth';
import { Main } from '@/common/components/layout/Main';
import { PostExplorer } from '@/post/components/PostExplorer';

const Posts = async () => {
  const session = await auth();

  return (
    <Main className="p-0">
      <PostExplorer session={session} />
    </Main>
  );
};

export default Posts;
