import { useApiClient } from '@/api/hooks/use-api-client';
import { appContract } from '@/api/util/contract';
import { ClientInferRequest } from '@ts-rest/core';
import useSWR from 'swr';

export interface UseUsersOptions {
  queries?: ClientInferRequest<typeof appContract.getUsers>['query'];
}

export const useUsers = ({ queries: query }: UseUsersOptions = {}) => {
  const { apiClient } = useApiClient();

  const { data, error, isLoading, mutate } = useSWR(['users', query], () =>
    apiClient.getUsers({ query }).then((res) => res.body),
  );

  const retry = async () => {
    await mutate(undefined, { revalidate: true });
  };

  return { users: data, isLoading, error, retry };
};
