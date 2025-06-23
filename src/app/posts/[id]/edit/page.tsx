import { apiClient } from '@/lib/api/util/client';
import { auth } from '@/lib/auth';
import { Main } from '@/lib/common/components/layout/Main';
import { PostEditor } from '@/lib/post/components/PostEditor';
import { routes } from '@/lib/routes';
import { redirect } from 'next/navigation';

export interface Props {
  params: Promise<{ id: string }>;
}

const EditPost = async ({ params }: Props) => {
  const session = await auth();
  const { id: postId } = await params;

  const post = await apiClient.getPost({ params: { id: postId } });

  if (session?.user.id !== post.author.id) {
    return redirect(routes.posts.byId(post));
  }

  return (
    <Main>
      <h1 className="text-2xl font-semibold">Editar post</h1>
      <PostEditor post={post} session={session} />
    </Main>
  );
};

export default EditPost;
