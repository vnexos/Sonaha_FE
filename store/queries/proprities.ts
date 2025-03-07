import { addToast } from "@heroui/toast";

import { baseApi } from "../base";

import { propritiesEndpoint } from "@/constants/endpoints";
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
        formData: true,
      }),
      extraOptions: {
        onSuccess: () => {
          addToast({
            title: "Thông Báo",
            description: "Thêm Dự Án thành công",
            color: "success",
          });
        },
      },
    }),

    //nó bị sao a

    deleteProperty: builder.mutation<void, number>({
      query: (id) => ({
        url: propritiesEndpoint.Del_ID_PROPRITIES.replace(
          "{ID}",
          id.toString(),
        ),
        method: "DELETE",
      }),
    }),

    updateProperty: builder.mutation<PropertyType, Partial<PropertyType>>({
      query: ({ ...data }) => ({
        url: propritiesEndpoint.UPDATE_ID_PROPRITIES,
        method: "PUT",
        body: data,
      }),
    }),
    getFilterApi: builder.query<
      any,
      {
        type?: string;
        page?: number;
        limit?: number;
        province?: string;
        district?: string;
        price?: string;
      }
    >({
      query: (params) => ({
        url: propritiesEndpoint.FILTER_PROPERTIES,
        method: "GET",
        params: {
          type: params.type,
          page: params.page,
          limit: params.limit,
          province: params.province,
          district: params.district,
          price: params.price,
        },
      }),
    }),
    getDetailProperties: builder.query<any, any>({
      query: (id) => ({
        url: propritiesEndpoint.DETAIL_PROPERTIES.replaceAll("{id}", id),
        method: "GET",
      }),
    }),
    
    createTypeProperties: builder.mutation<any, { id: number; nameType: string }>({
      query: ({ id, nameType }) => ({
        url: `${propritiesEndpoint.CREATE_TYPE_PROPERTIES.replace('{id}', id.toString())}?nameType=${nameType}`,
        method: 'POST',
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
  useGetFilterApiQuery,
  useGetDetailPropertiesQuery,
  useCreateTypePropertiesMutation // mutaion
} = propritiesApi;
