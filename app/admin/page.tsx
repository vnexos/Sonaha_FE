"use client";
import React from "react";

import Heading from "@/utils/Heading";
import DashboardHero from "@/components/common/Admin/DashboardHero";
import DashboardWidgets from "@/components/common/Admin/Widgets/DashboardWidgets";

const Page = () => {
  return (
    <div>
      <Heading
        description="Quản Lý Dự Án Bất Động Sản Của Tập Đoàn SoNa"
        keywords="Programming,MERN,Redux,Machine Learning"
        title="SONAHA - Admin"
      />
      <div className="w-full">
        <DashboardHero isDashboard={true} />
      </div>
      <DashboardWidgets />
    </div>
  );
};

export default Page;
