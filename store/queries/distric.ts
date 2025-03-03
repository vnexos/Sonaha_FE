
import { districEndpoint } from "@/constants/endpoints";
import { baseApi } from "../base";

// chỗ gọi api
export const districApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getDistric: builder.mutation<any, string>({
         query: (provinceId) => ({
            url: districEndpoint.GET_ALL_DISTRIC.replaceAll("{provinceId}",provinceId),
            method: "GET",
         }),
      }),
   }),
});

export const { useGetDistricMutation } = districApi;