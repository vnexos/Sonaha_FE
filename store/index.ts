import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./base";
import auth from "./slices/auth";

export const store: any = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
