import { useApiClient } from '@/api/hooks/use-api-client';
import { appContract } from '@/api/util/contract';
import { ClientInferRequest } from '@ts-rest/core';
import useSWR from 'swr';

export type UseDegreesOptions = ClientInferRequest<
  typeof appContract.getDegrees
>['query'];

export const useDegrees = (query: UseDegreesOptions) => {
  const { apiClient } = useApiClient();

  const { data, isLoading, error } = useSWR(
    ['degrees', query],
    ([, query]) =>
      apiClient.getDegrees({ query }).then((res) => res.body.content),
    {},
  );

  return { degrees: data, isLoading, error };
};
