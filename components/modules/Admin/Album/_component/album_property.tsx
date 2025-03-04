"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useGetPropritiesIDMutation } from "@/store/queries/proprities";
import {
  useCreateImgMutation,
  useCreateVideoMutation,
  useDeleteAlbumMutation,
} from "@/store/queries/album";

type AlbumPropertyProps = {
  property_id: number;
  onClose: () => void;
};

const AlbumProperty: React.FC<AlbumPropertyProps> = ({ property_id, onClose }) => {
  const [getProperty, { isLoading: isFetchingProperty, error: fetchError }] =
    useGetPropritiesIDMutation();
  const [createImg, { isLoading: isCreatingImg }] = useCreateImgMutation();
  const [createVideo, { isLoading: isCreatingVideo }] = useCreateVideoMutation();
  const [deleteAlbum, { isLoading: isDeleting }] = useDeleteAlbumMutation();
  const [property, setProperty] = useState<any | null>(null);
  const [imageFiles, setImageFiles] = useState<File[] | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  // Hàm fetch dữ liệu property
  const fetchProperty = async (id: number) => {
    try {
      const result = await getProperty(id).unwrap();
      setProperty(result);
    } catch (err) {
      console.error("Failed to fetch property:", err);
    }
  };

  // Gọi fetch khi component mount hoặc property_id thay đổi
  useEffect(() => {
    fetchProperty(property_id);
  }, [property_id]);

  // Xử lý upload nhiều ảnh
  const handleImageUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!imageFiles || imageFiles.length === 0) return;

    const formData = new FormData();
    formData.append("id", property_id.toString());
    imageFiles.forEach((file) => {
      formData.append("image[]", file); // Thêm từng file vào FormData với key "img"
    });

    try {
      await createImg(formData).unwrap();
      fetchProperty(property_id); // Refresh dữ liệu sau khi thêm ảnh
      setImageFiles(null);
    } catch (err) {
      console.error("Failed to upload images:", err);
    }
  };

  // Xử lý upload 1 video
  const handleVideoUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!videoFile) return;

    const formData = new FormData();
    formData.append("id", property_id.toString());
    formData.append("video", videoFile); // API yêu cầu key "video"

    try {
      await createVideo(formData).unwrap();
      fetchProperty(property_id); // Refresh dữ liệu sau khi thêm video
      setVideoFile(null);
    } catch (err) {
      console.error("Failed to upload video:", err);
    }
  };

  // Xử lý xóa toàn bộ album
  const handleDeleteAlbum = async () => {
    try {
      await deleteAlbum(property_id).unwrap();
      setProperty(null); // Xóa dữ liệu hiển thị sau khi xóa album
    } catch (err) {
      console.error("Failed to delete album:", err);
    }
  };

  console.log(property_id);
  console.log(property);

  if (isFetchingProperty || !property) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">Loading album...</div>
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
        <h2 className="text-2xl font-bold mb-4">Album Bất động sản: {detailProperty.name}</h2>

        {/* Upload ảnh */}
        <div className="mb-4">
          <label htmlFor="imageUpload" className="block mb-2 font-medium">
            Thêm ảnh:
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              setImageFiles(e.target.files ? Array.from(e.target.files) : null)
            }
            className="mb-2"
          />
          <button
            onClick={handleImageUpload}
            disabled={isCreatingImg || !imageFiles || imageFiles.length === 0}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            {isCreatingImg ? "Đang tải..." : "Tải ảnh lên"}
          </button>
        </div>

        {/* Upload video */}
        <div className="mb-4">
          <label htmlFor="videoUpload" className="block mb-2 font-medium">
            Thêm video:
          </label>
          <input
            id="videoUpload"
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            className="mb-2"
          />
          <button
            onClick={handleVideoUpload}
            disabled={isCreatingVideo || !videoFile}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            {isCreatingVideo ? "Đang tải..." : "Tải video lên"}
          </button>
        </div>

        {/* Xóa album */}
        <div className="mb-4">
          <button
            onClick={handleDeleteAlbum}
            disabled={isDeleting}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-400"
          >
            {isDeleting ? "Đang xóa..." : "Xóa toàn bộ album"}
          </button>
        </div>

        {/* Hiển thị danh sách ảnh/video */}
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
                    <track
                      kind="captions"
                      src="/captions.vtt" // Thay bằng đường dẫn thực tế nếu có phụ đề
                      label="Captions"
                      default
                    />
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
          <p className="text-gray-500 text-center">Không có ảnh hoặc video nào</p>
        )}

        {/* Nút Quay lại */}
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