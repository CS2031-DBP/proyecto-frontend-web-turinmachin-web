import { createServerApiClient } from '@/api/util/client';
import { auth } from '@/auth';
import { CommentSection } from '@/comment/components/CommentSection';
import { Dropdown } from '@/common/components/Dropdown';
import { FileCarousel } from '@/common/components/FileCarousel';
import { Main } from '@/common/components/layout/Main';
import { ResourceDetails } from '@/common/components/ResourceDetails';
import { routes } from '@/common/util/routes';
import { DeletePostButton } from '@/post/components/DeletePostButton';
import { PostActionBar } from '@/post/components/PostActionBar';
import { TagList } from '@/post/components/TagList';
import { PostSchema } from '@/post/schemas/post';
import { sessionHasRights } from '@/user/util';
import { isErrorFromAlias } from '@zodios/core';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LuEllipsis, LuPencil } from 'react-icons/lu';

export interface Props {
  params: Promise<{ id: string }>;
}

const Post = async ({ params }: Readonly<Props>) => {
  const { id: postId } = await params;
  const session = await auth();
  const apiClient = createServerApiClient(session);

  let post: PostSchema;

  try {
    post = await apiClient.getPost({ params: { id: postId } });
  } catch (err) {
    if (isErrorFromAlias(apiClient.api, 'getPost', err)) {
      notFound();
    }

    throw err;
  }

  return (
    <Main>
      <div className="flex items-center justify-between">
        <ResourceDetails
          user={post.author}
          university={post.university}
          degree={post.degree}
          fromDate={post.createdAt}
          className="mb-3"
        />
        {sessionHasRights(session, post.author) && (
          <Dropdown
            items={[
              <DeletePostButton key={0} postId={postId} />,
              post.author.id === session.user.id && (
                <Link key={1} href={routes.posts.editById(post.id)}>
                  <LuPencil className="mr-2 inline" />
                  Editar
                </Link>
              ),
            ]}
            buttonProps={{ className: 'py-1 px-2' }}
          >
            <LuEllipsis size={20} className="text-foreground-muted inline" />
          </Dropdown>
        )}
      </div>
      <p className="mb-2 text-xl">{post.content}</p>
      {post.tags.length !== 0 && <TagList tags={post.tags} className="my-2" />}
      {post.files.length !== 0 && (
        <FileCarousel
          files={post.files}
          contain
          keyControls
          muteVideos={false}
          fullVideoControls
          height={140}
          className="my-2"
        />
      )}
      <PostActionBar post={post} session={session} />
      <hr className="border-muted my-4" />
      <CommentSection postId={postId} session={session} />
    </Main>
  );
};

export default Post;
