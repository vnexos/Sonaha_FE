"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState } from "react";

import { BannerType } from "./_type/banner_type";

import {
  useCreateBannerMutation,
  useDeleteBannerMutation,
  useGetBannerQuery,
} from "@/store/queries/banner";

const BannerGrid = () => {
  const { data: banners, isLoading, error, refetch } = useGetBannerQuery({});
  const [deleteBanner] = useDeleteBannerMutation();
  const [createBanner] = useCreateBannerMutation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [pausedBanners, setPausedBanners] = useState<Record<number, boolean>>(
    {},
  );

  // State cho form trong modal
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [endDate, setEndDate] = useState("");

  const toggleBannerStatus = (bannerId: number) => {
    setPausedBanners((prev) => ({
      ...prev,
      [bannerId]: !prev[bannerId],
    }));
  };

  const handleDelete = async (bannerID: number) => {
    try {
      await deleteBanner(bannerID).unwrap();
      addToast({
        title: "Thông Báo",
        description: "Đã xóa banner thành công",
        color: "success",
      });
      refetch();
    } catch {
      addToast({
        title: "Lỗi",
        description: "Xóa banner không thành công",
        color: "danger",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("tittle", title || "");
    if (imageFile) formData.append("img", imageFile);
    formData.append("link_url", linkUrl || "");
    if (endDate) formData.append("end_date", endDate);

    try {
      await createBanner(formData).unwrap();
      addToast({
        title: "Thông Báo",
        description: "Tạo banner thành công",
        color: "success",
      });
      refetch();
      setIsCreateModalOpen(false);
      resetForm();
    } catch (error: any) {
      addToast({
        title: "Lỗi",
        description: error.data?.message || "Tạo banner không thành công",
        color: "danger",
      });
    }
  };

  const resetForm = () => {
    setTitle("");
    setImageFile(null);
    setLinkUrl("");
    setEndDate("");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách Banner</h1>
        <Button color="primary" onPress={() => setIsCreateModalOpen(true)}>
          + Thêm mới
        </Button>
      </div>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading properties</div>}

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
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{banner.title}</h3>
                <p className="text-gray-500 text-sm">
                  Bắt đầu: {new Date(banner.start_date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(banner.banner_id)}
                >
                  <Icon icon="mdi:trash-can" width={20} />
                </button>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => toggleBannerStatus(banner.banner_id)}
                >
                  <Icon
                    icon={
                      pausedBanners[banner.banner_id]
                        ? "mdi:play-circle"
                        : "mdi:pause-circle"
                    }
                    width={20}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal tạo banner */}
      <Modal
        className="overflow-y-auto max-h-[80vh]"
        isOpen={isCreateModalOpen}
        size="4xl"
        onClose={() => setIsCreateModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Create New Banner</ModalHeader>
          <ModalBody>
            <form className="space-y-4" id="bannerForm" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1" htmlFor="title">
                  Title
                </label>
                <Input
                  required
                  id="title"
                  placeholder="Enter title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor="img">
                  Image
                </label>
                <input
                  className="w-full p-2 border rounded-md"
                  id="img"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor="linkUrl">
                  URL
                </label>
                <Input
                  id="linkUrl"
                  placeholder="Enter link URL"
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor="endDate">
                  End Date
                </label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onPress={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button color="primary" form="bannerForm" type="submit">
              Create Banner
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BannerGrid;
