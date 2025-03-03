import { bannerEndpoint } from "@/constants/endpoints";
import { baseApi } from "../base";

// chỗ gọi api 
export const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBanner: builder.query<any, any>({
      query: () => ({
        url: bannerEndpoint.GET_ALL_BANNERS,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBannerQuery } = bannerApi;