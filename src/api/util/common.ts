import { ApiFetcherArgs, InitClientArgs, tsRestFetchApi } from '@ts-rest/core';
import qs from 'qs';

export const baseClientArgs: Partial<InitClientArgs> = {
  throwOnUnknownStatus: true,
  validateResponse: true,
  // FIX: this is a really hacky workaround
  // needed to enforce that array query parameters be stringified
  // with arrayFormat: 'repeat'.
  api: async (args: ApiFetcherArgs) => {
    if (args.rawQuery) {
      const fixedQuery = qs.stringify(args.rawQuery, { arrayFormat: 'repeat' });
      args.path = args.path.split('?')[0] + '?' + fixedQuery;
    }

    return tsRestFetchApi(args);
  },
};
