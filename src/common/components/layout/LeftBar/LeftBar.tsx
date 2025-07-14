import { routes } from '@/common/util/routes';
import { CreatePostButton } from '@/post/components/CreatePostButton';
import { Session } from 'next-auth';
import Link from 'next/link';
import { LuGraduationCap } from 'react-icons/lu';
import { LeftNavigation } from './LeftNavigation';
import { LoginButton } from './LoginButton';
import { SearchBar } from './SearchBar';
import { UserCard } from './UserCard';

export interface Props {
  session: Session | null;
}

export const LeftBar = ({ session, ...props }: Props) => (
  <aside
    {...props}
    className="border-muted hidden w-16 min-w-16 flex-col border-r px-2 py-4 sm:flex lg:w-72 lg:min-w-72"
  >
    <Link
      href={routes.home}
      className="my-3 flex items-center justify-center text-4xl font-extrabold"
    >
      <LuGraduationCap className="h-full w-auto" />
      <span className="ml-3 not-lg:hidden">UniLife</span>
    </Link>

    <SearchBar />
    <LeftNavigation session={session} />

    {session ? (
      <>
        <CreatePostButton session={session} />
        <UserCard session={session} />
      </>
    ) : (
      <LoginButton />
    )}
  </aside>
);
