import { CreatePostButton } from '@/lib/post/components/CreatePostButton';
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

export const LeftBar = async ({ session, ...props }: Props) => (
  <aside
    {...props}
    className="flex w-24 min-w-24 flex-col px-6 py-4 sm:w-64 sm:min-w-64 lg:w-72 lg:min-w-72"
  >
    <Link href="/" className="my-3 flex items-center text-4xl font-extrabold">
      <LuGraduationCap className="h-full w-auto" />
      <span className="ml-3 not-sm:hidden">UniLife</span>
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
