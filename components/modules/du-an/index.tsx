"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import SidebarNav from "@/components/common/sidebar-nav";
import { type_properties_typePropertiesName } from "@/constants";
import { useGetFilterApiQuery } from "@/store/queries/proprities";

export default function DuAn() {
  const params = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  // Lấy các tham số filter
  const filterParams = {
    type: params.get("type") || undefined,
    province: params.get("province") || undefined,
    district: params.get("district") || undefined,
    price: params.get("price") || undefined,
    page: currentPage,
    limit: limit,
  };

  // Sử dụng RTK Query hook
  const {
    data: filterData,
    isLoading,
    isError,
  } = useGetFilterApiQuery(filterParams);
  const router = useRouter();

  // Reset trang khi filter thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [params]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= (filterData?.data?.totalPages || 1)) {
      setCurrentPage(page);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">Error loading data</div>
    );

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }

    return text;
  };

  return (
    <div className="px-4 py-8 md:px-8 md:py-12 lg:px-28 lg:py-16">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar - Ẩn trên mobile, hiển thị trên md trở lên */}
        <div className="hidden md:block md:w-64 flex-shrink-0">
          <SidebarNav />
        </div>
        {/* Content Area */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-1">
            {filterData?.data?.paginatedResults?.map((item: any) => (
              <Card
                key={item.propertyId}
                className="cursor-pointer w-full max-w-[350px] mx-auto border border-gray-200 rounded-none shadow-sm transition-transform hover:scale-105"
                onMouseUp={() => {
                  router.push(`/chi-tiet/${item.propertyId}`);
                }}
              >
                <CardBody className="p-0">
                  <Image
                    alt={item.properties.name}
                    className="object-cover w-full h-56 rounded-none"
                    height={210}
                    src={item.properties.thumbnail_url || "/fallback-image.jpg"}
                    width={350}
                  />
                </CardBody>
                <CardHeader className="p-4 flex-col items-start">
                  <h2 className="uppercase text-sm md:text-lg break-words whitespace-normal w-full">
                    <Popover>
                      <PopoverTrigger>
                        <span className="w-full cursor-pointer hover:underline">
                          {truncateText(item.properties.name, 20)}
                        </span>
                      </PopoverTrigger>
                      <PopoverContent className="bg-white border border-gray-300 rounded-lg shadow-md p-2 max-w-xs z-50">
                        <div className="px-1 py-2">
                          <div className="text-sm font-bold">
                            {item.properties.name}
                          </div>
                          <div className="text-xs text-gray-600">
                            {item.properties.details}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </h2>
                  <p className="text-xs md:text-sm text-gray-600 uppercase mt-1">
                    Loại:
                    {
                      type_properties_typePropertiesName[
                        item.typePropertiesName as keyof typeof type_properties_typePropertiesName
                      ]
                    }
                  </p>
                  <small className="text-xs md:text-sm text-gray-500">
                    Tỉnh/Thành phố: {item.properties.province}
                  </small>
                  <h4 className="text-base md:text-xl font-bold text-red-500 mt-2">
                    {item.properties.public_price?.toLocaleString() ??
                      "Liên hệ"}
                    đ
                  </h4>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              aria-label="Previous page"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white transition-colors hover:bg-blue-600 disabled:bg-gray-300 disabled:hover:bg-gray-300"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 19l-7-7 7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </button>

            <div className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
              <span className="font-medium">{currentPage}</span>
              <span className="mx-1">/</span>
              <span className="text-gray-500">
                {filterData?.data?.totalPages || 1}
              </span>
            </div>

            <button
              aria-label="Next page"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white transition-colors hover:bg-blue-600 disabled:bg-gray-300 disabled:hover:bg-gray-300"
              disabled={currentPage === (filterData?.data?.totalPages || 1)}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
