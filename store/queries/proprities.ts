import { baseApi } from "../base";

import { propritiesEndpoint } from "@/constants/endpoints";

export const propritiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProprities: builder.query<any, any>({
      query: () => ({
        url: propritiesEndpoint.GET_ALL_PROPRITIES,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPropritiesQuery } = propritiesApi;
