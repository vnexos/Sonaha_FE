import { propertiesEndpoint } from "@/constants/endpoints";
import { baseApi } from "../base";

export const filterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFilterApi: builder.query<
      any,
      {
        type?: string;
        page?: number;
        limit?: number;
        province?: string;
        district?: string;
        price?: string;
      }
    >({
      query: (params) => ({
        url: propertiesEndpoint.FILTER_PROPERTIES,
        method: "GET",
        params: {
          type: params.type,
          page: params.page,
          limit: params.limit,
          province: params.province,
          district: params.district,
          price: params.price,
        },
      }),
    }),
  }),
});

export const { useGetFilterApiQuery } = filterApi;