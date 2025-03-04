import { createSlice } from "@reduxjs/toolkit";

import { authApi } from "../queries/auth";

import { User } from "@/types";
import webStorageClient from "@/utils/webStorageClient";
interface AuthSlickInterface {
  isAuthenticatedAccount: boolean;
  user?: User | undefined;
}

const initialState: AuthSlickInterface = {
  isAuthenticatedAccount: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginFromToken: (state, action) => {
      state.user = action.payload;
      state.isAuthenticatedAccount = true;
    },
    clearLoginToken: (state) => {
      state.user = undefined;
      state.isAuthenticatedAccount = false;
      webStorageClient.setToken("");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        webStorageClient.setToken(action.payload?.result.token);
        state.user = action.payload.result.user;
        if (state.user.user_id) state.isAuthenticatedAccount = true;
      },
    );
  },
});

export const { loginFromToken, clearLoginToken } = authSlice.actions;

export default authSlice.reducer;
