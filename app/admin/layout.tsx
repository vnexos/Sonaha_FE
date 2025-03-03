"use client";
import React from "react";

import AdminSidebar from "@/components/common/Admin/sidebar/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <AdminProtected>
    <div className="flex min-h-screen">
      <div className="1500px:w-[16%] w-1/5">
        <AdminSidebar />
      </div>
      <div className="w-[84%] flex flex-col">
        <div className="flex-1 p-4 overflow-auto">{children}</div>
      </div>
    </div>
    // {/* </AdminProtected> */ }
  );
}
