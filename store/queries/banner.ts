import { bannerEndpoint } from "@/constants/endpoints";
import { baseApi } from "../base";
import { create } from "domain";

export const bannerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBanner: builder.query<any, any>({
            query: () => ({
                url: bannerEndpoint.GET_ALL_BANNER,
                method: "GET",
            }),
        }),
        createBanner: builder.mutation<any, any>({
            query: (newBanner) => ({
                url: bannerEndpoint.CREATE_BANNER,
                method: "POST",
                body: newBanner,
            }),
            extraOptions: {
                onSuccess: (data: any) => {
                    console.log("Mutation thành công:", data);
                }
            }
        },),

        deleteBanner: builder.mutation<any, any>({
            query: (id) => ({
                url: bannerEndpoint.DELETE_BANNER.replace("{id}", id),
                method: "DELETE",
            }),
            extraOptions: {
                onSuccess: (data: any) => {
                    console.log("Mutation thành công:", data);
                }
            },
        }),
    }),

});

export const { useGetBannerQuery ,useCreateBannerMutation,useDeleteBannerMutation} = bannerApi;
