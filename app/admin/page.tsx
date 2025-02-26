"use client";
import React from "react";
import Heading from "@/utils/Heading";
import AdminSidebar from "@/components/common/Admin/sidebar/AdminSidebar";
//import AdminProtected from "../hooks/adminProtected";
import DashboardHero from "@/components/common/Admin/DashboardHero";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      {/* <AdminProtected> */}
      <Heading
        title="SONAHA - Admin"
        description="Quản Lý Dự Án Bất Động Sản Của Tập Đoàn SoNa"
        keywords="Programming,MERN,Redux,Machine Learning"
      />
      <div className="flex min-h-screen">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHero isDashboard={true} />
        </div>
      </div>
      {/* </AdminProtected> */}
    </div>
  );
};

export default page;
