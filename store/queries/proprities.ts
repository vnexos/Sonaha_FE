import { propritiesEndpoint } from "@/constants/endpoints";
import { baseApi } from "../base";

export const propritiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProprities: builder.query<any, any>({
      query: () => ({
        url: propritiesEndpoint.GET_ALL_PROPRITIES,
        method: "GET",
      }),
    }),
    createProprity: builder.mutation<any, { name: string; location: string }>({
      query: (newProprity) => ({
        url: propritiesEndpoint.CreateProperti, // Thêm đường dẫn API phù hợp
        method: "POST",
        body: newProprity,
      }),
    }),
  }),
  
});

export const { useGetPropritiesQuery , useCreateProprityMutation } = propritiesApi;
