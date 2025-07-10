import { useApiClient } from '@/api/hooks/use-api-client';
import { Api } from '@/api/util/api';
import { ZodiosQueryParamsByAlias } from '@zodios/core';
import useSWR from 'swr';

export type UseDegreesOptions = ZodiosQueryParamsByAlias<Api, 'getDegrees'>;

export const useDegrees = (queries: UseDegreesOptions) => {
  const { apiClient } = useApiClient();

  const { data, isLoading, error } = useSWR(
    ['degrees', queries],
    ([, queries]) =>
      apiClient.getDegrees({ queries }).then((page) => page.content),
    {},
  );

  return { degrees: data, isLoading, error };
};
