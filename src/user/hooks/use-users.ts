import { useApiClient } from '@/api/hooks/use-api-client';
import { Api } from '@/api/util/api';
import { ZodiosQueryParamsByAlias } from '@zodios/core';
import useSWR from 'swr';

export interface UseUsersOptions {
  queries?: ZodiosQueryParamsByAlias<Api, 'getUsers'>;
}

export const useUsers = ({ queries }: UseUsersOptions = {}) => {
  const { apiClient } = useApiClient();

  const { data, error, isLoading, mutate } = useSWR(['users', queries], () =>
    apiClient.getUsers({ queries }),
  );

  const retry = async () => {
    await mutate(undefined, { revalidate: true });
  };

  return { users: data, isLoading, error, retry };
};
