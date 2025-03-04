import { propritiesEndpoint } from "@/constants/endpoints";
import { baseApi } from "../base";
import { PropertyType } from "@/types/admin/proprity-type";

export const propritiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProprities: builder.query<any, void>({
      query: () => ({
        url: propritiesEndpoint.GET_ALL_PROPRITIES,
        method: "GET",
      }),

    }),

    getPropritiesID: builder.mutation<any, number>({
      query: (id) => ({
        url: `${propritiesEndpoint.GET_ID_PROPRITIES.replace("{ID}", id.toString())}`,
        method: "GET",
      }),
    }),

    createProprity: builder.mutation<any, any>({
      query: (newProprity) => ({
        url: propritiesEndpoint.CRAETE_PROPERTY,
        method: "POST",
        body: newProprity,
      }),
      extraOptions: {
        onSuccess: (data: any) => {
          console.log("Mutation thành công:", data);
        },
      },

    }),

    //nó bị sao a

    deleteProperty: builder.mutation<void, number>({
      query: (id) => ({
        url: propritiesEndpoint.Del_ID_PROPRITIES.replace("{ID}", id.toString()),
        method: "DELETE",
      }),
    }),

    updateProperty: builder.mutation<PropertyType, Partial<PropertyType>>({
      query: ({ property_id, ...data }) => ({
        url: propritiesEndpoint.UPDATE_ID_PROPRITIES,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetPropritiesQuery,
  useGetPropritiesIDMutation, // cais nay lam mutation moi dung
  useCreateProprityMutation,
  useDeletePropertyMutation,
  useUpdatePropertyMutation,
} = propritiesApi;
