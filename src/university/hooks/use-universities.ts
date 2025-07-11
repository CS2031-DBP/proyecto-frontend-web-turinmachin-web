import { useApiClient } from '@/api/hooks/use-api-client';
import { appContract } from '@/api/util/contract';
import { ClientInferRequest } from '@ts-rest/core';
import useSWR from 'swr';

export type UseUniversitiesOptions = ClientInferRequest<
  typeof appContract.getUniversities
>['query'];

export const useUniversities = (queries: UseUniversitiesOptions) => {
  const { apiClient } = useApiClient();

  const { data, isLoading, error } = useSWR(
    ['universities', queries],
    ([, query]) =>
      apiClient.getUniversities({ query }).then((res) => res.body.content),
    {},
  );

  return { universities: data, isLoading, error };
};
