import { useApiClient } from '@/api/hooks/use-api-client';
import { Button } from '@/common/components/Button';
import { Spinner } from '@/common/components/Spinner';
import { ProfilePicture } from '@/user/components/ProfilePicture';
import { UserSchema } from '@/user/schemas/user';
import { Session } from 'next-auth';
import { useCallback, useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { useSupabase } from '../hooks/use-supabase';

export interface Props {
  session: Session;
  onUserSelect: (user: UserSchema) => void;
  goToSearch: () => void;
}

export const ChatHome = ({ session, onUserSelect, goToSearch }: Props) => {
  const { apiClient } = useApiClient();
  const { supabase } = useSupabase();
  const [recentUsers, setRecentUsers] = useState<UserSchema[] | null>(null);

  const fetchRecentUsers = useCallback(async () => {
    const res = await supabase
      .from('messages')
      .select('from_id, to_id')
      .or(`from_id.eq.${session.user.id},to_id.eq.${session.user.id}`)
      .order('created_at', { ascending: false });

    if (!res.data) throw new Error('Could not fetch recent chats');

    const userIds = res.data.map((data) =>
      data.from_id === session.user.id ? data.to_id : data.from_id,
    );

    const dedupedIds = [...new Set(userIds)];
    const userPromises = dedupedIds.map((id) =>
      apiClient.getUserById({ params: { id } }),
    );
    const users = await Promise.allSettled(userPromises);
    setRecentUsers(
      users
        .map((result) => (result.status === 'fulfilled' ? result.value : null))
        .filter((user) => user !== null),
    );
  }, [supabase, session.user.id, apiClient]);

  useEffect(() => {
    fetchRecentUsers();
  }, [fetchRecentUsers]);

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
        <div className="border-muted flex grow items-center justify-center rounded border">
          <p className="text-foreground-muted">
            ¡No tienes conversaciones recientes!
          </p>
        </div>
      ) : (
        <ul className="border-muted grow overflow-y-auto rounded border">
          {recentUsers.map((user) => (
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
