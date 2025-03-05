import { albumEndpoint } from "@/constants/endpoints";
import { baseApi } from "../base";

export const albumApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createImg: builder.mutation<any, FormData>({
            query: (NewImgData) => {
              const propertyId = NewImgData.get("id"); // Lấy id từ FormData
              console.log("Property ID:", propertyId); // Debug
              if (!propertyId) {
                throw new Error("Property ID is required");
              }
              // Ép kiểu propertyId thành string và thay thế vào URL
              const url = albumEndpoint.CRAETE_PROPERTY_IMG.replace("{id}", propertyId.toString());
              return {
                url,
                method: "POST",
                body: NewImgData,
              };
            },
            extraOptions: {
              onSuccess: (data: any) => {
                console.log("Mutation thành công:", data);
              },
            },
          }),

        createVideo: builder.mutation<any, FormData>({
            query: (newVideoData) => {
              const propertyId = newVideoData.get("id"); // Lấy id từ FormData
              console.log("Property ID:", propertyId); // Debug
              if (!propertyId) {
                throw new Error("Property ID is required");
              }
              // Ép kiểu propertyId thành string và thay thế vào URL
              const url = albumEndpoint.CRAETE_PROPERTY_VIDEO.replace("{id}", propertyId.toString());
              return {
                url,
                method: "POST",
                body: newVideoData,
              };
            },
            extraOptions: {
              onSuccess: (data: any) => {
                console.log("Mutation thành công:", data);
              },
            },
          }),
        deleteAlbum: builder.mutation<any, any>({
            query: (id) => ({
                url: albumEndpoint.DELETE_ALBUM.replace("{id}", id),
                method: "DELETE",
            }),
            extraOptions: {
                onSuccess: (data: any) => {
                    console.log("Mutation thành công:", data);
                },
            },

        }),
    })

});

export const { useCreateImgMutation, useCreateVideoMutation,useDeleteAlbumMutation  } = albumApi;
