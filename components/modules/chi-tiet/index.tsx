"use client";
import {
  Button,
  Card,
  CardBody,
  Image,
  Menu,
  MenuItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useSearchParams } from "next/navigation";

import AlbumRenderer from "@/components/common/AlbumComponents";
import { useGetDetailPropertiesQuery } from "@/store/queries/detailProperties";

interface Property {
  // ... (keep the property interface as is)
}

export default function DetailProperties() {
  const params = useSearchParams();
  const id = params.get("id");

  const {
    data: responseData,
    isLoading,
    isError,
  } = useGetDetailPropertiesQuery(Number(id));

  const detailProperties = responseData?.detailProperty;

  if (isLoading)
    return (
      <div className="flex justify-center p-8">
        <Spinner size="lg" />
      </div>
    );

  if (isError)
    return (
      <div className="text-red-500 p-8">
        Error: Failed to fetch property details
      </div>
    );

  return (
    <div className="space-y-8">
      {/* lỗi chỗ */}
      <AlbumRenderer
        propertyImages={
          detailProperties?.property_images?.map(
            (item: any) => item.image_url,
          ) || []
        }
      />

      <Card className="mt-6 bg-white shadow-lg rounded-lg">
        <CardBody>
          {/* Property Name */}
          <h1 className="text-4xl font-semibold text-gray-900 mb-6">
            {detailProperties?.name || "Property Name"}
          </h1>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Thumbnail Image */}
            <Image
              alt={detailProperties?.name || "Property Thumbnail"}
              className="w-full md:w-1/2 rounded-lg"
              src={
                detailProperties?.thumbnail_url ||
                "https://via.placeholder.com/400"
              }
            />

            {/* Property Details */}
            <div className="flex-1 space-y-6">
              {/* Description */}
              <div className="flex items-center gap-2 text-lg">
                <Icon
                  className="text-blue-600 h-6 w-6"
                  icon="mdi:text-box-outline"
                />
                <p className="text-gray-700">
                  {detailProperties?.description || "No description available"}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 text-xl font-semibold">
                <Icon className="text-green-600 h-6 w-6" icon="mdi:cash" />
                <p className="text-gray-800">
                  {detailProperties?.public_price &&
                    `${new Intl.NumberFormat("vi-VN").format(detailProperties.public_price)} đ`}
                </p>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    icon: "",
                    label: "Diện tích",
                    value: `${detailProperties?.area} m²`,
                  },
                  {
                    icon: "",
                    label: "Hướng nhà",
                    value: detailProperties?.house_direction,
                  },
                  {
                    icon: "",
                    label: "Hướng ban công",
                    value: detailProperties?.balcony_direction,
                  },
                  {
                    icon: "",
                    label: "Nội thất",
                    value: detailProperties?.furniture || "N/A",
                  },
                  {
                    icon: "",
                    label: "Pháp lý",
                    value: detailProperties?.legal_status || "Không rõ",
                  },
                  {
                    icon: "",
                    label: "Địa chỉ",
                    value: detailProperties?.address || "Không rõ",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <Icon
                      className="h-5 w-5 text-purple-600"
                      icon={item.icon}
                    />
                    <span>
                      <strong>{item.label}:</strong> {item.value || "N/A"}
                    </span>
                  </div>
                ))}
              </div>

              {/* View Agents Button */}
              <Popover placement="bottom">
                <PopoverTrigger>
                  <Button
                    className="w-full py-3 text-lg"
                    startContent={
                      <Icon className="h-5 w-5" icon="mdi:account" />
                    }
                  >
                    Giao dịch viên
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Menu aria-label="Agents menu">
                    {(detailProperties?.transactions ?? []).map(
                      (transaction: any, index: any) => (
                        <MenuItem
                        key={transaction?.users_transactions_moderator_idTousers?.phone}
                          className="hover:bg-gray-200"
                          onClick={() => {}}
                        >
                          <div className="flex items-center gap-3 p-3">
                            <Icon
                              className="h-5 w-5 text-green-600"
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
    </div>
  );
}
