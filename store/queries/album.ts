import { albumEndpoint } from "@/constants/endpoints";
import { baseApi } from "../base";

export const albumApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createImg: builder.mutation<any, any>({
            query: (newImg) => {
                console.log(albumEndpoint.CRAETE_PROPERTY_IMG.replaceAll("{id}", newImg.id));
                return ({
                url: albumEndpoint.CRAETE_PROPERTY_IMG.replaceAll("{id}", newImg.id),
                method: "POST",
                body: newImg,
            })},
            extraOptions: {
                onSuccess: (data: any) => {
                    console.log("Mutation thành công:", data);
                },
            },

        }),

        createVideo: builder.mutation<any, any>({
            query: (newVideo) => ({
                url: albumEndpoint.CRAETE_PROPERTY_VIDEO.replace("{id}", newVideo.id),
                method: "POST",
                body: newVideo,
            }),
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
