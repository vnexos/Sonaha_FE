"use client";
import { Card, CardBody, CardHeader, Image } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import SidebarNav from "@/components/common/SidebarNav";
import { useGetFilterApiQuery } from "@/store/queries/filterduan";

enum type_properties_typePropertiesName {
  Apartment = "Căn hộ",
  OfficeBuilding = "Tòa nhà văn phòng",
  ShoppingCenter = "Trung tâm mua sắm",
  NewUrbanArea = "Khu đô thị mới",
  MixedUseDevelopment = "Phát triển đa chức năng",
  SocialHousing = "Nhà ở xã hội",
  EcoResort = "Khu nghỉ dưỡng sinh thái",
  IndustrialPark = "Khu công nghiệp",
  SemiDetachedVilla = "Biệt thự song lập",
  Shophouse = "Nhà phố thương mại",
  Townhouse = "Nhà phố",
  OtherProject = "Dự án khác",
  BeachLand = "Đất ven biển",
  PerennialCropLand = "Đất trồng cây lâu năm",
  Villa = "Biệt thự",
  ResidentialPlot = "Đất ở",
  StreetHouse = "Nhà mặt phố",
  LuxuryApartment = "Căn hộ cao cấp",
}

export default function DuAn() {
  const params = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  // Lấy các tham số filter
  const filterParams = {
    type: params.get("type") || undefined,
    province: params.get("province") || undefined,
    district: params.get("district") || undefined,
    price: params.get("price") || undefined,
    page: currentPage,
    limit: limit,
  };

  <div suppressHydrationWarning>{new Date().toLocaleString()}</div>;

  // Sử dụng RTK Query hook
  const {
    data: filterData,
    isLoading,
    isError,
  } = useGetFilterApiQuery(filterParams);
  const router = useRouter();

  console.log(filterData);
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

  return (
    <div className="mt-36">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar - Cố định bên trái */}
        <div className="w-full md:w-64 flex-shrink-0">
          <SidebarNav />
        </div>

        {/* Content Area - Chiếm không gian còn lại */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filterData?.data?.paginatedResults?.map((item: any) => (
              <Card
                key={item.propertyId}
                className="py-4 cursor-pointer"
                onMouseUp={() => {
                  console.log("Navigating to /chi-tiet?id=" + item.propertyId);
                  router.push(`/chi-tiet?id=${item.propertyId}`);
                }}
              >
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <p className="text-tiny uppercase font-bold">
                    {item.properties.name}
                  </p>
                  <p className="text-tiny uppercase font-bold">
                    Loại:
                    {
                      type_properties_typePropertiesName[
                        item.typePropertiesName as keyof typeof type_properties_typePropertiesName
                      ]
                    }
                  </p>
                  <small className="text-default-500">
                    Tỉnh/Thành phố: {item.properties.province}
                  </small>
                  <h4 className="font-bold text-medium">
                    Giá:
                    {item.properties.public_price?.toLocaleString() ??
                      "Liên hệ"}
                    vnđ
                  </h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <Image
                    alt={item.properties.name}
                    className="object-cover rounded-xl"
                    height={180}
                    src={item.properties.thumbnail_url || "/fallback-image.jpg"}
                    width={270}
                  />
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-center gap-2">
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
    </div>
  );
}
