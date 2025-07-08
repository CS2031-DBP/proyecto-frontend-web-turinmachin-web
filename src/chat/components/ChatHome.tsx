import { Button } from '@/common/components/Button';
import { Spinner } from '@/common/components/Spinner';
import { useQueryExplorer } from '@/common/hooks/use-query-explorer';
import { ProfilePicture } from '@/user/components/ProfilePicture';
import { useUsers } from '@/user/hooks/use-users';
import { UserSchema } from '@/user/schemas/user';

export interface Props {
  onUserSelect: (user: UserSchema) => void;
}

export const ChatHome = ({ onUserSelect }: Props) => {
  const { currentQueries, form, onSubmit } = useQueryExplorer();
  const { users, isLoading, error, retry } = useUsers({
    queries: currentQueries,
  });

  return (
    <>
      <p className="mb-2 text-xl font-semibold">Chat</p>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <input
          placeholder="Busca a alguien..."
          {...form.register('query')}
          className="form-input w-full"
        />
      </form>

      {isLoading ? (
        <div className="flex grow items-center justify-center">
          <Spinner className="size-8 border-4" />
        </div>
      ) : error || users === undefined ? (
        <div className="flex grow flex-col items-center justify-center">
          <div className="mb-3 text-center text-lg font-semibold">
            Algo salió mal :(
          </div>
          <Button variant="outline" onClick={retry}>
            Reintentar
          </Button>
        </div>
      ) : (
        <ul className="border-muted my-4 grow overflow-y-auto rounded border">
          {users.content.map((user) => (
            <li
              key={user.id}
              onClick={() => onUserSelect(user)}
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
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
