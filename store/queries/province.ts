import { baseApi } from "../base";

import { provinceEndpoint } from "@/constants/endpoints";

export const provinceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProvince: builder.query<any, void>({
      query: () => ({
        url: provinceEndpoint.GET_ALL_PROVINCE,
        method: "GET",
      }),
    }),
    getDistricts: builder.mutation<any, string>({
      query: (provinceID) => ({
        url: provinceEndpoint.GET_DISTRICTS.replace("{provinceID}", provinceID),
        method: "GET",
      }),
    }),
    getWards: builder.mutation<any, string>({
      query: (districtID) => ({
        url: provinceEndpoint.GET_WARDS.replace("{districtID}", districtID),
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProvinceQuery,
  useGetWardsMutation,
  useGetDistrictsMutation,
} = provinceApi;
