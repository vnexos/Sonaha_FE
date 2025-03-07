"use client";

import { Image } from "@heroui/image";
import { motion } from "framer-motion";
import { useState } from "react";

import AlbumProperty from "./_component/album_property";

import { useGetPropritiesQuery } from "@/store/queries/proprities";
import { PropertyType } from "@/types/admin/proprity-type";

const GetAllMedia = () => {
  const { data: properties, isLoading, error } = useGetPropritiesQuery();
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(
    null,
  );

  // Animation variants cho hover
  const cardVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const handleCardClick = (propertyId: number) => {
    setSelectedPropertyId(propertyId);
  };

  const handleCloseModal = () => {
    setSelectedPropertyId(null);
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4">Error loading properties</div>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties?.map((property: PropertyType) => (
          <motion.button
            key={property.property_id}
            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer focus:outline-none"
            initial="initial"
            variants={cardVariants}
            whileHover="hover"
            onClick={() => handleCardClick(property.property_id)}
          >
            <Image
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
          </motion.button>
        ))}
      </div>

      {selectedPropertyId && (
        <AlbumProperty
          property_id={selectedPropertyId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default GetAllMedia;
