import { addToast } from "@heroui/toast";

import { baseApi } from "../base";

import { bannerEndpoint } from "@/constants/endpoints";

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
        onSuccess: () => {
          addToast({
            title: "Thông Báo",
            description: "Thêm Banner thành công",
            color: "success",
          });
        },
      },
    }),

    deleteBanner: builder.mutation<any, any>({
      query: (id) => ({
        url: bannerEndpoint.DELETE_BANNER.replace("{id}", id),
        method: "DELETE",
      }),
      extraOptions: {
        onSuccess: () => {
          addToast({
            title: "Thông Báo",
            description: "Xóa Banner thành công",
            color: "success",
          });
        },
      },
    }),
  }),
});

export const {
  useGetBannerQuery,
  useCreateBannerMutation,
  useDeleteBannerMutation,
} = bannerApi;
