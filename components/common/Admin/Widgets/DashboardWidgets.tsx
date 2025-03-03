"use client";

import React, { FC, useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation"; // Import useRouter để điều hướng

type Props = {
  open?: boolean;
  value?: number;
};

const DashboardWidgets: FC<Props> = ({}) => {
  const [hoveredWidget, setHoveredWidget] = useState<string | null>(null);
  const router = useRouter();

  const handleWidgetClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="mt-[30px] min-h-screen">
      <div className="grid grid-cols-[75%,25%]">
        <div className="pt-[80px] pr-8">
          <button
            className={`w-full dark:bg-[#111C43] rounded-sm shadow transition-transform ${
              hoveredWidget === "news" ? "scale-105" : "scale-100"
            } cursor-pointer`}
            onClick={() => handleWidgetClick("/admin/newnews")}
            onMouseEnter={() => setHoveredWidget("news")}
            onMouseLeave={() => setHoveredWidget(null)}
          >
            <div className="flex items-center p-5 justify-between">
              <div>
                <Icon
                  className="dark:text-[#45CBA0] text-[#000] text-[30px]"
                  icon="fluent:news-20-regular"
                />
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  Quản Lý Tin Tức
                </h5>
              </div>
            </div>
          </button>

          {/* Quản Lý Banner */}
          <button
            className={`w-full dark:bg-[#111C43] rounded-sm shadow my-8 transition-transform ${
              hoveredWidget === "banner" ? "scale-105" : "scale-100"
            } cursor-pointer`}
            onClick={() => handleWidgetClick("/admin/banner")}
            onMouseEnter={() => setHoveredWidget("banner")}
            onMouseLeave={() => setHoveredWidget(null)}
          >
            <div className="flex items-center p-5 justify-between">
              <div>
                <Icon
                  className="dark:text-[#45CBA0] text-[#000] text-[30px]"
                  icon="mdi:image-area"
                />
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  Quản Lý Banner
                </h5>
              </div>
            </div>
          </button>

          {/* Quản Lý Dự Án */}
          <button
            className={`w-full dark:bg-[#111C43] rounded-sm shadow my-8 transition-transform ${
              hoveredWidget === "project" ? "scale-105" : "scale-100"
            } cursor-pointer`}
            onClick={() => handleWidgetClick("/admin/proprities")}
            onMouseEnter={() => setHoveredWidget("project")}
            onMouseLeave={() => setHoveredWidget(null)}
          >
            <div className="flex items-center p-5 justify-between">
              <div>
                <Icon
                  className="dark:text-[#45CBA0] text-[#000] text-[30px]"
                  icon="mdi:view-dashboard-outline"
                />
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  Quản Lý Dự Án
                </h5>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[65%,35%] mt-[-20px]" />
    </div>
  );
};

export default DashboardWidgets;
