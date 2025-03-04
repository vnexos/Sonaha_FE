import { albumEndpoint } from "@/constants/endpoints";
import { baseApi } from "../base";

export const albumApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createImg: builder.mutation<any, any>({
            query: (newImg) => ({
                url: albumEndpoint.CRAETE_PROPERTY_IMG,
                method: "POST",
                body: newImg,
            }),
            extraOptions: {
                onSuccess: (data: any) => {
                    console.log("Mutation thành công:", data);
                },
            },

        }),

        createVideo: builder.mutation<any, any>({
            query: (newVideo) => ({
                url: albumEndpoint.CRAETE_PROPERTY_VIDEO,
                method: "POST",
                body: newVideo,
            }),
            extraOptions: {
                onSuccess: (data: any) => {
                    console.log("Mutation thành công:", data);
                },
            },

        }),
    })

});

export const { useCreateImgMutation, useCreateVideoMutation } = albumApi;
