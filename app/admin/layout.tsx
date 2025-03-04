"use client";
import { ReactNode } from "react";

import AdminLayout from "@/components/common/admin-layout";

export default function layout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
