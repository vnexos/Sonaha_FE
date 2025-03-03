import { bannerEndpoint } from "@/constants/endpoints";
import { baseApi } from "../base";

export const bannerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBanner: builder.query<any, any>({
            query: () => ({
                url: bannerEndpoint.GET_ALL_BANNER,
                method: "GET",
            }),
        }),
    }),

});

export const { useGetBannerQuery } = bannerApi;
