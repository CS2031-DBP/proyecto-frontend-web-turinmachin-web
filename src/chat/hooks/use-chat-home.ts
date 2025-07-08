import { useApiClient } from '@/api/hooks/use-api-client';
import { UserSchema } from '@/user/schemas/user';
import { Session } from 'next-auth';
import { useCallback, useEffect, useState } from 'react';
import { useSupabase } from '../hooks/use-supabase';

export interface UseChatHomeOptions {
  session: Session;
}

export const useChatHome = ({ session }: UseChatHomeOptions) => {
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

  return { recentUsers };
};
