import { useState } from "react";
import { Button } from "@heroui/button";

import {
  useCreateImgMutation,
  useCreateVideoMutation,
} from "@/store/queries/album";

const CreateAlbum = ({
  propertyId,
  onComplete,
}: {
  propertyId: number;
  onComplete: () => void;
}) => {
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const [createImg, { isLoading: isUploadingImages }] = useCreateImgMutation();
  const [createVideo, { isLoading: isUploadingVideo }] =
    useCreateVideoMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImages(e.target.files);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedVideo(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    try {
      if (selectedImages) {
        const formData = new FormData();

        formData.append("propertyId", propertyId.toString());
        Array.from(selectedImages).forEach((file) =>
          formData.append("images", file),
        );
        await createImg(formData).unwrap();
      }

      if (selectedVideo) {
        const formData = new FormData();

        formData.append("propertyId", propertyId.toString());
        formData.append("video", selectedVideo);
        await createVideo(formData).unwrap();
      }

      alert("Upload thành công!");
      onComplete();
    } catch (error: any) {
      throw new Error(`có lỗi xảy ra ${error.message}`);
      alert("Có lỗi xảy ra khi upload!");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Tải lên Album</h2>
      <input
        multiple
        accept="image/*"
        type="file"
        onChange={handleImageChange}
      />
      <input accept="video/*" type="file" onChange={handleVideoChange} />
      <Button
        disabled={isUploadingImages || isUploadingVideo}
        onClick={handleUpload}
      >
        {isUploadingImages || isUploadingVideo ? "Đang tải lên..." : "Tải lên"}
      </Button>
    </div>
  );
};

export default CreateAlbum;
