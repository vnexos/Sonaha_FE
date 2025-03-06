import { baseApi } from "../base";

import { contactEndpoint } from "@/constants/endpoints";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllContact: builder.query<any, any>({
      query: () => ({
        url: contactEndpoint.GET_CONTACT,
        method: "GET",
      }),
    }),
    sendContact: builder.mutation<any, any>({
      query: (params) => ({
        url: contactEndpoint.SEND_CONTACT,
        method: "POST",
        body: params,
      }),
    }),
    deleteContact: builder.mutation<any, any>({
      query: (id) => ({
        url: contactEndpoint.DELETE_CONTACT.replace("{id}", id),
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetAllContactQuery, useSendContactMutation,useDeleteContactMutation } = contactApi;
