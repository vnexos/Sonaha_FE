"use client";

import React, { FC, useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation"; // Import useRouter để điều hướng

type Props = {
    open?: boolean;
    value?: number;
};

const DashboardWidgets: FC<Props> = ({ open }) => {
    const [hoveredWidget, setHoveredWidget] = useState<string | null>(null);
    const router = useRouter(); // Khởi tạo useRouter để điều hướng

    // Hàm xử lý sự kiện click để điều hướng đến các trang tương ứng
    const handleWidgetClick = (path: string) => {
        router.push(path);
    };

    return (
        <div className="mt-[30px] min-h-screen">
            <div className="grid grid-cols-[75%,25%]">
                <div className="pt-[80px] pr-8">
                    {/* Quản Lý Tin Tức */}
                    <div
                        className={`w-full dark:bg-[#111C43] rounded-sm shadow transition-transform ${hoveredWidget === "news" ? "scale-105" : "scale-100"
                            } cursor-pointer`}
                        onMouseEnter={() => setHoveredWidget("news")}
                        onMouseLeave={() => setHoveredWidget(null)}
                        onClick={() => handleWidgetClick("/admin/newnews")}
                    >
                        <div className="flex items-center p-5 justify-between">
                            <div>
                                <Icon
                                    icon="fluent:news-20-regular"
                                    className="dark:text-[#45CBA0] text-[#000] text-[30px]"
                                />
                                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                                    Quản Lý Tin Tức
                                </h5>
                            </div>
                        </div>
                    </div>

                    {/* Quản Lý Banner */}
                    <div
                        className={`w-full dark:bg-[#111C43] rounded-sm shadow my-8 transition-transform ${hoveredWidget === "banner" ? "scale-105" : "scale-100"
                            } cursor-pointer`}
                        onMouseEnter={() => setHoveredWidget("banner")}
                        onMouseLeave={() => setHoveredWidget(null)}
                        onClick={() => handleWidgetClick("/admin/banner")}
                    >
                        <div className="flex items-center p-5 justify-between">
                            <div>
                                <Icon
                                    icon="mdi:image-area"
                                    className="dark:text-[#45CBA0] text-[#000] text-[30px]"
                                />
                                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                                    Quản Lý Banner
                                </h5>
                            </div>
                        </div>
                    </div>

                    {/* Quản Lý Dự Án */}
                    <div
                        className={`w-full dark:bg-[#111C43] rounded-sm shadow my-8 transition-transform ${hoveredWidget === "project" ? "scale-105" : "scale-100"
                            } cursor-pointer`}
                        onMouseEnter={() => setHoveredWidget("project")}
                        onMouseLeave={() => setHoveredWidget(null)}
                        onClick={() => handleWidgetClick("/admin/proprities")}
                    >
                        <div className="flex items-center p-5 justify-between">
                            <div>
                                <Icon
                                    icon="mdi:view-dashboard-outline"
                                    className="dark:text-[#45CBA0] text-[#000] text-[30px]"
                                />
                                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                                    Quản Lý Dự Án
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-[65%,35%] mt-[-20px]"></div>
        </div>
    );
};

export default DashboardWidgets;
