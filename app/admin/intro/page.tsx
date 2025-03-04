"use client";
import React from "react";

import Heading from "@/utils/Heading";
import AdminSidebar from "@/components/common/Admin/sidebar/AdminSidebar";
import DashboardHero from "@/components/common/Admin/DashboardHero";
import DashboardCenter from "@/components/common/Admin/Widgets/DashboardCenter";

const page = () => {
  return (
    <div>
      <Heading
        description="Quản Lý Dự Án Bất Động Sản Của Tập Đoàn SoNa"
        keywords="Programming,MERN,Redux,Machine Learning"
        title="SONAHA - Admin"
      />
      <div className="flex min-h-screen">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHero />
          <DashboardCenter />
        </div>
      </div>
    </div>
  );
};

export default page;
