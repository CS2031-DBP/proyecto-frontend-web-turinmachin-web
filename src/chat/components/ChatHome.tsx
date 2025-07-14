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
      <Button
        onClick={goToSearch}
        className="button-normal mb-2 flex w-full items-center justify-center px-4 py-2 text-sm font-medium"
      >
        <LuPlus className="mr-2 size-5" />
        Nueva conversación
      </Button>

      {recentUsers === null ? (
        <div className="border-muted flex flex-1 items-center justify-center">
          <Spinner className="size-8 border-4" />
        </div>
      ) : recentUsers.length === 0 ? (
        <div className="border-muted text-foreground-muted flex flex-1 flex-col items-center justify-center gap-4 rounded border py-10 text-center">
          <LuGhost className="size-12" />
          <div>
            <p className="text-base font-medium">
              ¡No tienes conversaciones recientes!
            </p>
            <p className="text-foreground-muted text-sm">
              Inicia una nueva conversación para comenzar.
            </p>
          </div>
        </div>
      ) : (
        <ul className="border-muted grow overflow-y-auto rounded border">
          {recentUsers.map(({ user, alert }) => (
            <li
              key={user.id}
              onClick={() => onUserSelect(user)}
              role="button"
              className="hover:bg-foreground/5 flex cursor-pointer items-center gap-3 px-4 py-3 transition"
            >
              <ProfilePicture
                profilePicture={user.profilePicture}
                className="size-10"
              />
              <div className="flex flex-col">
                {user.displayName ? (
                  <>
                    <span className="font-semibold">{user.displayName}</span>
                    <span className="text-foreground-muted text-sm">
                      @{user.username}
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-semibold">
                    @{user.username}
                  </span>
                )}
              </div>
              {alert && (
                <LuCircle className="ml-auto size-4 fill-red-500 text-red-500" />
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
