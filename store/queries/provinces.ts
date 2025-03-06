import { baseApi } from "../base";

import { provinceEndpoint } from "@/constants/endpoints";
import { Province } from "@/types";

export const provinceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProvince: builder.query<Province[], undefined>({
      query: () => ({
        url: provinceEndpoint.GET_ALL_PROVINCE,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllProvinceQuery } = provinceApi;
