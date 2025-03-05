"use client";
import { addToast } from "@heroui/toast";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  useCreateImgMutation,
  useCreateVideoMutation,
  useDeleteAlbumMutation,
} from "@/store/queries/album";
import { useGetPropritiesIDMutation } from "@/store/queries/proprities";

type AlbumPropertyProps = {
  property_id: number;
  onClose: () => void;
};

const AlbumProperty: React.FC<AlbumPropertyProps> = ({
  property_id,
  onClose,
}) => {
  const [getProperty, { isLoading: isFetchingProperty, error: fetchError }] =
    useGetPropritiesIDMutation();
  const [createImg, { isLoading: isCreatingImg }] = useCreateImgMutation();
  const [createVideo, { isLoading: isCreatingVideo }] =
    useCreateVideoMutation();
  const [deleteAlbum, { isLoading: isDeleting }] = useDeleteAlbumMutation();
  const [property, setProperty] = useState<any | null>(null);
  const [imageFiles, setImageFiles] = useState<File[] | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const fetchProperty = async (id: number) => {
    try {
      const result = await getProperty(id).unwrap();

      setProperty(result);
    } catch {
      addToast({
        title: "Lỗi",
        description: "Có lỗi xảy ra",
        color: "danger",
      });
    }
  };

  useEffect(() => {
    fetchProperty(property_id);
  }, [property_id]);

  const handleImageUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!imageFiles || !Array.isArray(imageFiles) || imageFiles.length === 0) {
      addToast({
        title: "Cảnh Báo",
        description: "Chưa có Album nào được chọn",
        color: "warning",
      });

      return;
    }

    const formData = new FormData();

    formData.append("id", property_id.toString());
    imageFiles.forEach((file) => {
      formData.append("img", file); // Đúng key "img"
    });

    try {
      await createImg(formData).unwrap();

      addToast({
        title: "Thông Báo",
        description: "Tạo Album ảnh thành công",
        color: "success",
      });
      fetchProperty(property_id);
      setImageFiles(null);
    } catch {
      addToast({
        title: "Lỗi",
        description: "Lỗi khi tạo Album nào được chọn",
        color: "danger",
      });
    }
  };

  const handleVideoUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!videoFile) return;

    const formData = new FormData();

    formData.append("id", property_id.toString());
    formData.append("video", videoFile);

    try {
      await createVideo(formData).unwrap();
      fetchProperty(property_id);
      setVideoFile(null);

      addToast({
        title: "Thông Báo",
        description: "Tạo Album ảnh thành công",
        color: "success",
      });
    } catch {
      addToast({
        title: "Lỗi",
        description: "Lỗi khi tạo Album nào được chọn",
        color: "danger",
      });
    }
  };

  const handleDeleteAlbum = async () => {
    try {
      await deleteAlbum(property_id).unwrap();
      setProperty(null);
      addToast({
        title: "Thông Báo",
        description: "Tạo Album ảnh thành công",
        color: "success",
      });
    } catch {
      addToast({
        title: "Lỗi",
        description: "Lỗi khi tạo Album nào được chọn",
        color: "danger",
      });
    }
  };

  if (isFetchingProperty || !property) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          Loading album...
        </div>
      </div>
    );
  }

  if (fetchError && !property) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          Error loading album or property not found
          <div className="mt-4 flex justify-end">
            <button
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={onClose}
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  const detailProperty = property.detailProperty || property;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">
          Album Bất động sản: {detailProperty.name}
        </h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium" htmlFor="imageUpload">
            Thêm ảnh:
          </label>
          <input
            multiple
            accept="image/*"
            className="mb-2"
            id="imageUpload"
            type="file"
            onChange={(e) =>
              setImageFiles(e.target.files ? Array.from(e.target.files) : null)
            }
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            disabled={isCreatingImg || !imageFiles || imageFiles.length === 0}
            onClick={handleImageUpload}
          >
            {isCreatingImg ? "Đang tải..." : "Tải ảnh lên"}
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium" htmlFor="videoUpload">
            Thêm video:
          </label>
          <input
            accept="video/*"
            className="mb-2"
            id="videoUpload"
            type="file"
            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            disabled={isCreatingVideo || !videoFile}
            onClick={handleVideoUpload}
          >
            {isCreatingVideo ? "Đang tải..." : "Tải video lên"}
          </button>
        </div>

        <div className="mb-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-400"
            disabled={isDeleting}
            onClick={handleDeleteAlbum}
          >
            {isDeleting ? "Đang xóa..." : "Xóa toàn bộ album"}
          </button>
        </div>

        {detailProperty.property_images?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {detailProperty.property_images.map((media: any) => (
              <div key={media.image_id} className="relative">
                {media.image_url.includes("video") ? (
                  <video
                    controls
                    className="w-full h-40 object-cover rounded-lg"
                    src={media.image_url}
                  >
                    <track default kind="captions" label="Captions" />
                  </video>
                ) : (
                  <Image
                    unoptimized
                    alt={`Property Media ${media.image_id}`}
                    className="w-full h-40 object-cover rounded-lg"
                    height={150}
                    src={media.image_url}
                    width={200}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            Không có ảnh hoặc video nào
          </p>
        )}

        <div className="mt-4 flex justify-end">
          <button
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={onClose}
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlbumProperty;
