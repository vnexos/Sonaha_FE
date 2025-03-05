import { addToast } from "@heroui/toast";

import { baseApi } from "../base";

import { albumEndpoint } from "@/constants/endpoints";

export const albumApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createImg: builder.mutation<any, FormData>({
      query: (NewImgData) => {
        const propertyId = NewImgData.get("id"); // Lấy id từ FormData

        if (!propertyId) {
          throw new Error("Property ID is required");
        }
        // Ép kiểu propertyId thành string và thay thế vào URL
        const url = albumEndpoint.CRAETE_PROPERTY_IMG.replace(
          "{id}",
          propertyId.toString(),
        );

        return {
          url,
          method: "POST",
          body: NewImgData,
        };
      },
      extraOptions: {
        onSuccess: () => {
          addToast({
            title: "Thông Báo",
            description: "Tạo mới ảnh thành công",
            color: "success",
          });
        },
      },
    }),

    createVideo: builder.mutation<any, FormData>({
      query: (newVideoData) => {
        const propertyId = newVideoData.get("id"); // Lấy id từ FormData

        if (!propertyId) {
          throw new Error("Property ID is required");
        }
        // Ép kiểu propertyId thành string và thay thế vào URL
        const url = albumEndpoint.CRAETE_PROPERTY_VIDEO.replace(
          "{id}",
          propertyId.toString(),
        );

        return {
          url,
          method: "POST",
          body: newVideoData,
        };
      },
      extraOptions: {
        onSuccess: () => {
          addToast({
            title: "Thông Báo",
            description: "Tạo mới video thành công",
            color: "success",
          });
        },
      },
    }),
    deleteAlbum: builder.mutation<any, any>({
      query: (id) => ({
        url: albumEndpoint.DELETE_ALBUM.replace("{id}", id),
        method: "DELETE",
      }),
      extraOptions: {
        onSuccess: () => {
          addToast({
            title: "Thông Báo",
            description: "Xóa album thành công",
            color: "success",
          });
        },
      },
    }),
  }),
});

export const {
  useCreateImgMutation,
  useCreateVideoMutation,
  useDeleteAlbumMutation,
} = albumApi;
