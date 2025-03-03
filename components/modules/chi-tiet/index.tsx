"use client";

import {
  Button,
  Card,
  CardBody,
  Menu,
  MenuItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import AlbumRenderer from "@/components/common/AlbumComponents";
import { useGetDetailPropertiesQuery } from "@/store/queries/detailProperties";

export default function DetailProperties() {
  const params = useSearchParams();
  const id = params.get("id");

  const {
    data: responseData,
    isLoading,
    isError,
  } = useGetDetailPropertiesQuery(Number(id));
  const detailProperties = responseData?.detailProperty;

  // State để quản lý hiển thị
  const [activeSection, setActiveSection] = useState<"card" | "description">(
    "card",
  );

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 p-8">
        Error: Failed to fetch property details
      </div>
    );
  }

  const detailItems = [
    {
      icon: "",
      label: "Diện tích",
      value:
        detailProperties?.area !== null && detailProperties?.area !== undefined
          ? `${detailProperties.area} m²` // Hiển thị giá trị số với đơn vị m², ngay cả khi là 0
          : "N/A",
    },
    {
      icon: "",
      label: "Giá",
      value:
        detailProperties?.public_price !== null &&
        detailProperties?.public_price !== undefined
          ? `${new Intl.NumberFormat("vi-VN").format(detailProperties.public_price)} đ` // Hiển thị giá với đơn vị đ, ngay cả khi là 0
          : "N/A",
    },
    {
      icon: "",
      label: "Pháp lý",
      value: detailProperties?.legal_status || "N/A",
    },

    {
      icon: "",
      label: "Nội thất",
      value: detailProperties?.furniture || "N/A",
    },
    {
      icon: "",
      label: "Địa chỉ",
      value: detailProperties?.address || "Không rõ",
    },
    {
      icon: "",
      label: "Số phòng ngủ",
      value: detailProperties?.number_of_bedrooms || "Không rõ",
    },
    {
      icon: "",
      label: "Hướng nhà",
      value: detailProperties?.house_direction || "N/A",
    },
    {
      icon: "",
      label: "Hướng ban công",
      value: detailProperties?.balcony_direction || "N/A",
    },
  ];

  return (
    <div className="space-y-8 p-4 md:p-8 lg:p-12">
      <AlbumRenderer
        propertyImages={
          detailProperties?.property_images?.map(
            (item: any) => item.image_url,
          ) || []
        }
      />
      {/* Nút chuyển đổi giữa card và mô tả chi tiết */}
      <div className="flex gap-4">
        <div
          className={`cursor-pointer text-lg font-medium ${
            activeSection === "card"
              ? "text-red-500 border-b-4 border-orange-500 pb-2"
              : "text-gray-500"
          }`}
          role="button"
          tabIndex={0}
          onClick={() => setActiveSection("card")}
          onKeyDown={(e) => e.key === "Enter" && setActiveSection("card")}
        >
          Thông tin chi tiết
        </div>
        <div
          className={`cursor-pointer text-lg font-medium ${
            activeSection === "description"
              ? "text-red-500 border-b-4 border-orange-500 pb-2"
              : "text-gray-500"
          }`}
          role="button"
          tabIndex={0}
          onClick={() => setActiveSection("description")}
          onKeyDown={(e) =>
            e.key === "Enter" && setActiveSection("description")
          }
        >
          Mô tả chi tiết
        </div>
      </div>

      {/* Hiển thị phần card hoặc mô tả chi tiết dựa trên state */}
      {activeSection === "card" && (
        <Card className="bg-white shadow-lg rounded-lg p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-6 border-b border-gray-300 pb-4">
            {detailProperties?.name || "Property Name"}
          </h1>
          <CardBody>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Thumbnail Section */}
              <div className="flex-1 space-y-6">
                {/* Detail Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
                  {/* Dấu | giữa cột trái và cột phải khi trên màn hình lớn */}
                  <div className="hidden sm:block absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-px bg-gray-300" />
                  {detailItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col gap-2 p-3 border-b border-gray-300" // Thêm đường gạch ngang ở dưới mỗi item
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            {item.label}
                          </p>
                          <p className="text-base text-gray-800">
                            {item.value || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Agents Popover */}
                <Popover placement="bottom">
                  <PopoverTrigger>
                    <Button
                      fullWidth
                      className="py-2 text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 w-48"
                      startContent={
                        <Icon
                          className="h-4 w-4 text-gray-600"
                          icon="mdi:account"
                        />
                      }
                    >
                      Giao dịch viên
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="max-w-[400px]">
                    <Menu aria-label="Agents menu">
                      {(detailProperties?.transactions ?? []).map(
                        (transaction: any, index: number) => (
                          <MenuItem
                            key={transaction?.id || index}
                            className="hover:bg-gray-100"
                          >
                            <div className="flex items-center gap-3 p-2">
                              <Icon
                                className="h-5 w-5 text-green-600" // Giữ nguyên kích thước icon trong menu để dễ đọc
                                icon="mdi:phone"
                              />
                              <div>
                                <p className="font-medium text-gray-800">
                                  Giao dịch viên {index + 1}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {
                                    transaction
                                      ?.users_transactions_moderator_idTousers
                                      ?.phone
                                  }
                                </p>
                              </div>
                            </div>
                          </MenuItem>
                        ),
                      )}
                    </Menu>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {activeSection === "description" && (
        <div className="p-4 md:p-6 bg-white rounded-lg shadow-lg">
          <div className="text-gray-700 text-base break-words font-sans">
            <p className="font-bold inline">{detailProperties?.name}: </p>
            <span className="inline">
              {detailProperties?.description || "Chưa có mô tả chi tiết"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
