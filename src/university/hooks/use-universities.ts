import { useApiClient } from '@/api/hooks/use-api-client';
import { Api } from '@/api/util/api';
import { ZodiosQueryParamsByAlias } from '@zodios/core';
import useSWR from 'swr';

export type UseUniversitiesOptions = ZodiosQueryParamsByAlias<
  Api,
  'getUniversities'
>;

export const useUniversities = (queries: UseUniversitiesOptions) => {
  const { apiClient } = useApiClient();

  const { data, isLoading, error } = useSWR(
    ['universities', queries],
    ([, queries]) =>
      apiClient.getUniversities({ queries }).then((page) => page.content),
    {},
  );

  return { universities: data, isLoading, error };
};
