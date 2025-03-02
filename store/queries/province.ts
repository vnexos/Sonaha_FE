import { propritiesEndpoint, provinceEndpoint } from "@/constants/endpoints";
import { baseApi } from "../base";

// chỗ gọi api
export const provincesApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getProvinces: builder.query<any, any>({
         query: () => ({
            url: provinceEndpoint.GET_APP_PROVINCES,
            method: "GET",
         }),
      }),
   }),
});

export const { useGetProvincesQuery } = provincesApi;
