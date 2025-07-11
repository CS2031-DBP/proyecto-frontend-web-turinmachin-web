import { Button } from '@/common/components/Button';
import { Spinner } from '@/common/components/Spinner';
import { ProfilePicture } from '@/user/components/ProfilePicture';
import { UserSchema } from '@/user/schemas/user';
import { Session } from 'next-auth';
import { LuCircle, LuGhost, LuPlus } from 'react-icons/lu';
import { useChatHome } from '../hooks/use-chat-home';

export interface Props {
  session: Session;
  onUserSelect: (user: UserSchema) => void;
  goToSearch: () => void;
}

export const ChatHome = ({ session, onUserSelect, goToSearch }: Props) => {
  const { recentUsers } = useChatHome({ session });

  return (
    <>
      <p className="mb-2 text-xl font-semibold">Chat</p>
      <Button
        onClick={goToSearch}
        className="my-4 flex items-center justify-center"
      >
        <LuPlus className="mr-2" />
        Nueva conversación
      </Button>

      {recentUsers === null ? (
        <div className="flex grow items-center justify-center">
          <Spinner className="size-8 border-4" />
        </div>
      ) : recentUsers.length === 0 ? (
        <div className="border-muted text-foreground-muted flex grow flex-col items-center justify-center gap-y-4 rounded border">
          <LuGhost className="size-12" />
          <p>¡No tienes conversaciones recientes!</p>
        </div>
      ) : (
        <ul className="border-muted grow overflow-y-auto rounded border">
          {recentUsers.map(({ user, alert }) => (
            <li
              key={user.id}
              onClick={() => onUserSelect(user)}
              role="button"
              className="hover:bg-foreground/5 flex cursor-pointer items-center space-x-2 px-3 py-2"
            >
              <ProfilePicture
                profilePicture={user.profilePicture}
                className="size-10"
              />
              <div>
                {user.displayName ? (
                  <>
                    <div className="font-semibold">{user.displayName}</div>
                    <div className="text-foreground-muted text-sm">
                      @{user.username}
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-foreground-muted font-medium">@</span>
                    <span className="font-semibold">{user.username}</span>
                  </>
                )}
              </div>
              {alert && <LuCircle className="ml-4 fill-red-500 text-red-500" />}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
