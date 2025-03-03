import { detailPropertiesEndpoint } from "@/constants/endpoints";
import { baseApi } from "../base";

// chỗ gọi api 
export const detailPropertiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDetailProperties: builder.query<any, any>({
      query: (id) => ({
        url: detailPropertiesEndpoint.DETAIL_PROPERTIES.replaceAll("{id}",id),
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDetailPropertiesQuery } = detailPropertiesApi;