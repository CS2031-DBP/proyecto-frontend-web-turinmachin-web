import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { LuEllipsis, LuTrash } from 'react-icons/lu';
import { NavLink, useNavigate, useParams } from 'react-router';
import { apiQuery } from '../../lib/api/util/api-query';
import { getAxiosInstance } from '../../lib/api/util/axios-instance';
import { useUser } from '../../lib/auth/hooks/use-user';
import { CommentSection } from '../../lib/comment/components/CommentSection';
import { Dropdown } from '../../lib/common/components/dropdown/Dropdown';
import { FileCarousel } from '../../lib/common/components/FileCarousel';
import { LoadingScreen } from '../../lib/common/components/pages/LoadingScreen';
import { ResourceDetails } from '../../lib/common/components/ResourceDetails';
import { PostActionBar } from '../../lib/post/components/PostActionBar';
import { TagList } from '../../lib/post/components/TagList';
import { PostSchema } from '../../lib/post/schemas/post';

export const Post = () => {
  const { postId } = useParams();
  if (!postId) {
    throw new Error('Missing postId query parameter');
  }

  const { data: post, refetch: refetchPost } = useSuspenseQuery({
    queryKey: ['post', postId],
    queryFn: () =>
      apiQuery(`/posts/${postId}`, PostSchema, { allowNotFound: true }),
  });

  const navigate = useNavigate();
  const [, user] = useUser();

  if (post === null) {
    return (
      <div className="flex grow flex-col justify-center">
        <h1 className="my-6 text-center text-3xl font-bold">
          El post que buscas no existe :(
        </h1>
        <div className="text-center">
          <NavLink
            to="/"
            className="border-foreground rounded-full border px-3 py-1 font-semibold"
          >
            Volver al inicio
          </NavLink>
        </div>
      </div>
    );
  }

  const deleteSelf = async () => {
    await getAxiosInstance().delete(`/posts/${post.id}`);
    navigate('/');
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <ResourceDetails
          user={post.author}
          university={post.university}
          degree={post.degree}
          fromDate={post.createdAt}
        />
        {(user?.role !== 'USER' || post.author.id === user?.id) && (
          <Dropdown
            items={[
              <button onClick={deleteSelf}>
                <LuTrash className="mr-2 inline" /> Borrar
              </button>,
            ]}
            buttonProps={{ className: 'py-1 px-2' }}
          >
            <LuEllipsis size={20} className="text-foreground-muted inline" />
          </Dropdown>
        )}
      </div>
      <p className="mb-2 text-xl">{post.content}</p>
      {post.tags.length !== 0 && <TagList tags={post.tags} />}
      {post.files.length !== 0 && (
        <FileCarousel
          files={post.files}
          contain
          keyControls
          muteVideos={false}
          fullVideoControls
          height={140}
          className="my-4"
        />
      )}
      <PostActionBar post={post} />
      <hr className="border-muted my-4" />
      <Suspense fallback={<LoadingScreen className="min-h-64" />}>
        <CommentSection postId={postId} refetchPost={refetchPost} />
      </Suspense>
    </>
  );
};
