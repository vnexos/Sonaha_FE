import { redirect } from "next/navigation";
import { ReactNode } from "react";

import LoadingPage from "./loading-page";

import { useCheckTokenRoleQuery } from "@/store/queries/auth";
import webStorageClient from "@/utils/webStorageClient";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const token = webStorageClient.getToken();
  const { role, isSuccess, isError } = useCheckTokenRoleQuery(token, {
    selectFromResult: ({ data, isSuccess, isError }) => ({
      role: data?.role,
      isSuccess,
      isError,
    }),
  });

  if ((isSuccess && role !== "admin") || isError) {
    return redirect("/");
  }

  return isSuccess ? <div>{children}</div> : <LoadingPage />;
}
