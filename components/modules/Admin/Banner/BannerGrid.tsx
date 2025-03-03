"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";

import { BannerType } from "./_type/banner_type";

import { useGetBannerQuery } from "@/store/queries/banner";

const BannerGrid = () => {
  const { data: banners, isLoading, error } = useGetBannerQuery({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading banners</div>;

  return (
    <div className="p-4">
      {/* Nút Thêm Mới */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách Banner</h1>
        <Button color="primary" onPress={() => setIsCreateModalOpen(true)}>
          + Thêm mới
        </Button>
      </div>

      {/* Hiển thị danh sách banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {banners?.map((banner: BannerType) => (
          <div
            key={banner.banner_id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Image
              alt={banner.title}
              className="w-full h-48 object-cover"
              height={200}
              src={banner.image_url}
              width={300}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{banner.title}</h3>
              <p className="text-gray-500 text-sm">
                Bắt đầu: {new Date(banner.start_date).toLocaleDateString()}
              </p>
              <a
                className="text-blue-500 text-sm mt-2 block"
                href={banner.link_url}
              >
                Xem chi tiết →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal thêm mới (Chưa có logic xử lý) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Thêm mới Banner</h2>
            <Button
              color="secondary"
              onPress={() => setIsCreateModalOpen(false)}
            >
              Đóng
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerGrid;
