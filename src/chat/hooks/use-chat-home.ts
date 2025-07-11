import { useApiClient } from '@/api/hooks/use-api-client';
import { UserSchema } from '@/user/schemas/user';
import { Session } from 'next-auth';
import { useCallback, useEffect, useState } from 'react';
import { useSupabase } from '../hooks/use-supabase';
import { ChatMessageSchema } from '../schemas/chat-message';

export interface UseChatHomeOptions {
  session: Session;
}

interface UserEntry {
  user: UserSchema;
  alert: boolean;
}

export const useChatHome = ({ session }: UseChatHomeOptions) => {
  const { apiClient } = useApiClient();
  const { supabase } = useSupabase();
  const [recentUsers, setRecentUsers] = useState<UserEntry[] | null>(null);

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
      Promise.all([
        apiClient.getUserById({ params: { id } }),
        supabase
          .from('messages')
          .select('')
          .eq('from_id', id)
          .eq('to_id', session.user.id)
          .eq('read', false)
          .limit(1),
      ] as const),
    );
    const users = await Promise.allSettled(userPromises);
    setRecentUsers(
      users
        .map((result) => {
          if (result.status === 'rejected') return null;

          const [userResponse, readResponse] = result.value;
          if (userResponse.status !== 200) return null;

          return {
            user: userResponse.body,
            alert: !!readResponse.data && readResponse.data.length > 0,
          };
        })
        .filter((user) => user !== null),
    );
  }, [supabase, session.user.id, apiClient]);

  const updateAlerts = useCallback(
    async (prevUsers: UserEntry[] | null, message: ChatMessageSchema) => {
      if (prevUsers === null) return;

      const index = prevUsers?.findIndex(
        (entry) => entry.user.id === message.from_id,
      );

      if (index === -1) {
        const res = await apiClient.getUserById({
          params: { id: message.from_id },
        });
        if (res.status !== 200) return;
        setRecentUsers([{ user: res.body, alert: true }, ...prevUsers]);
      } else {
        setRecentUsers((prevUsers) => {
          if (prevUsers === null) return null;

          const newUsers = [...prevUsers];
          newUsers[index].alert = true;
          return newUsers;
        });
      }
    },
    [apiClient],
  );

  useEffect(() => {
    fetchRecentUsers();

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `to_id=eq.${session.user.id}`,
        },
        async (payload) => {
          const message = ChatMessageSchema.parse(payload.new);

          setRecentUsers((prev) => {
            updateAlerts(prev, message);
            return prev;
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchRecentUsers, supabase, apiClient, session.user.id, updateAlerts]);

  return { recentUsers };
};
