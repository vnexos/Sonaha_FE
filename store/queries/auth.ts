import { baseApi } from "../base";

import { authEndpoint } from "@/constants/endpoints";
import { LoginRequest, LoginResponse, User } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ result: LoginResponse }, LoginRequest>({
      query: (params) => ({
        url: authEndpoint.LOGIN,
        method: "POST",
        body: params,
      }),
    }),
    verifyToken: builder.mutation<User, null>({
      query: () => ({
        url: authEndpoint.DETAIL,
        method: "GET",
      }),
    }),
    checkTokenRole: builder.query<{ role: string | null }, string>({
      query: (token) => ({
        url: authEndpoint.CHECK_TOKEN.replaceAll("{token}", token),
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyTokenMutation,
  useCheckTokenRoleQuery,
} = authApi;
