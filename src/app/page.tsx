import { auth } from '@/lib/auth';
import { Main } from '@/lib/common/components/layout/Main';
import { PostListing } from '@/lib/post/components/PostListing';

const Home = async () => {
  const session = await auth();

  return (
    <Main>
      <h1 className="mb-8 text-center text-3xl font-bold">¡Hola de nuevo!</h1>
      <PostListing session={session} queries={{}} />
    </Main>
  );
};

export default Home;
