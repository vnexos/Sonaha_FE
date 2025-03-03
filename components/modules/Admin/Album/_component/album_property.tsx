"use client";

import Image from "next/image";
import { Button } from "@heroui/button";

import { useGetPropritiesIDQuery } from "@/store/queries/proprities";
import { PropertyType } from "@/types/admin/proprity-type";

type AlbumPropertyProps = {
  property: PropertyType;
  onClose: () => void;
};

const AlbumProperty: React.FC<AlbumPropertyProps> = ({ property, onClose }) => {
  const { isLoading, error } = useGetPropritiesIDQuery(property.property_id);

  if (isLoading) return <div>Loading album...</div>;
  if (error) return <div>Error loading album</div>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold mb-4">Album Bất động sản</h2>

        {/* Kiểm tra nếu có ảnh hoặc video */}
        {property?.property_images?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {property.property_images.map((media: any) => (
              <div key={media.image_id} className="relative">
                <Image
                  unoptimized
                  alt="Property Image"
                  className="w-full h-40 object-cover rounded-lg"
                  height={150}
                  src={media.image_url}
                  width={200}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            Không có ảnh hoặc video nào
          </p>
        )}

        {/* Nút đóng */}
        <div className="mt-4 flex justify-end">
          <Button color="secondary" onPress={onClose}>
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlbumProperty;
