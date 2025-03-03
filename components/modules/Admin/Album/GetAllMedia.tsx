"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";

import { useGetPropritiesQuery } from "@/store/queries/proprities";
import { PropertyType } from "@/types/admin/proprity-type";
import AlbumProperty from "@/components/modules/Admin/Album/_component/album_property"; // Import component mới

const GetAllMedia = () => {
  const { data: properties, isLoading, error } = useGetPropritiesQuery();
  const [selectedProperty, setSelectedProperty] = useState<PropertyType | null>(
    null,
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading properties</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách Bất động sản</h1>
        <Button color="primary">+ Thêm mới</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties?.map((property: PropertyType) => (
          <button
            key={property.property_id}
            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setSelectedProperty(property)}
          >
            <Image
              unoptimized
              alt={property.name}
              className="w-full h-48 object-cover"
              height={200}
              src={property.thumbnail_url}
              width={300}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{property.name}</h3>
              <p className="text-gray-500 text-sm">
                Địa chỉ: {property.house_number}, {property.ward},{" "}
                {property.district}, {property.province}
              </p>
              <p className="text-gray-500 text-sm">
                Giá: {property.public_price} VNĐ
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Hiển thị AlbumProperty nếu có property được chọn */}
      {selectedProperty && (
        <AlbumProperty
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
};

export default GetAllMedia;
