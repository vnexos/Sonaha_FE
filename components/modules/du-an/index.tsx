"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import SidebarNav from "@/components/common/SidebarNav";
import { type_properties_typePropertiesName } from "@/constants";
import { useGetFilterApiQuery } from "@/store/queries/filterduan";
import "../../../styles/globals.css";

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }

    return text;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2 md:p-4 lg:p-6">
      {/* Header/Search Area */}
      <header className="mb-4 flex flex-col items-center md:flex-row md:justify-between">
        <h1 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-0">
          SONHA - GIỚI THIỆU DỰ ÁN TIN TỨC
        </h1>
        <div className="relative w-full max-w-md md:max-w-xs">
          <select
            className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={params.get("province") || "Hà Tĩnh"}
            onChange={(e) => router.push(`?province=${e.target.value}`)}
          >
            <option value="Hà Tĩnh">Hà Tĩnh</option>
            {/* Add more provinces as needed */}
          </select>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar - Hidden on mobile, visible on desktop/tablet */}
        <div className="hidden md:block md:w-64 flex-shrink-0">
          <SidebarNav />
        </div>

        {/* Content Area - Full width on mobile, flexible on desktop */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filterData?.data?.paginatedResults?.map((item: any) => (
              <Card
                key={item.propertyId}
                className="cursor-pointer border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                onMouseUp={() => {
                  router.push(`/chi-tiet?id=${item.propertyId}`);
                }}
              >
                <CardBody className="p-0 overflow-hidden">
                  <div className="w-full h-48 md:h-56 relative">
                    <img
                      alt={item.properties.name}
                      className="absolute inset-0 object-cover w-full h-full"
                      src={
                        item.properties.thumbnail_url || "/fallback-image.jpg"
                      }
                    />
                  </div>
                </CardBody>
                <CardHeader className="p-2 flex-col items-start bg-white">
                  <h2 className="text-sm font-medium break-words whitespace-normal w-full">
                    <Popover>
                      <PopoverTrigger>
                        <span className="w-full cursor-pointer text-sm hover:underline">
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
                  <p className="text-xs text-gray-600">
                    Loại:
                    {
                      type_properties_typePropertiesName[
                        item.properties
                          .typePropertiesName as keyof typeof type_properties_typePropertiesName
                      ]
                    }
                  </p>
                  <small className="text-xs text-gray-500">
                    Tỉnh/Thành phố: {item.properties.province}
                  </small>
                  <h4 className="text-base font-bold text-red-500 mt-1">
                    {item.properties.public_price?.toLocaleString() ??
                      "Liên hệ"}
                    đ
                  </h4>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Pagination - Centered and responsive */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2">
            <button
              aria-label="Previous page"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white transition-colors hover:bg-blue-600 disabled:bg-gray-300 disabled:hover:bg-gray-300"
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

            <div className="flex items-center gap-1 text-gray-700">
              <span className="font-medium">{currentPage}</span>
              <span className="mx-1">/</span>
              <span className="text-gray-500">
                {filterData?.data?.totalPages || 1}
              </span>
            </div>

            <button
              aria-label="Next page"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white transition-colors hover:bg-blue-600 disabled:bg-gray-300 disabled:hover:bg-gray-300"
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

      {/* Mobile Sidebar Toggle (Optional) - You can add a button or hamburger menu here */}
      <div className="md:hidden fixed bottom-4 left-4">
        <button className="p-2 bg-blue-500 text-white rounded-full">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6h16M4 12h16m-7 6h7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
