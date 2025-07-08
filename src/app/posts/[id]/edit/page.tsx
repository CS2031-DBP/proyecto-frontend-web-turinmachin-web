import { createServerApiClient } from '@/api/util/create-server-api-client';
import { auth } from '@/auth';
import { Main } from '@/common/components/layout/Main';
import { routes } from '@/common/util/routes';
import { PostEditor } from '@/post/components/PostEditor';
import { redirect } from 'next/navigation';

export interface Props {
  params: Promise<{ id: string }>;
}

const EditPost = async ({ params }: Props) => {
  const { id: postId } = await params;

  const session = await auth();
  const apiClient = createServerApiClient(session);

  const post = await apiClient.getPost({ params: { id: postId } });

  if (session?.user.id !== post.author.id) {
    return redirect(routes.posts.byId(post.id));
  }

  return (
    <Main>
      <h1 className="text-2xl font-semibold">Editar post</h1>
      <PostEditor post={post} />
    </Main>
  );
};

export default EditPost;
