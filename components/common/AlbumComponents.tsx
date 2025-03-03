import { PhotoIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface AlbumRendererProps {
  propertyImages: string[];
}

const AlbumRenderer = ({ propertyImages }: AlbumRendererProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);
  const videoRegex = /\.(mp4|webm|ogg)$/i;

  const isVideoFile = (fileName: string) => videoRegex.exec(fileName) !== null;

  if (
    !propertyImages ||
    !Array.isArray(propertyImages) ||
    propertyImages.length === 0
  ) {
    return (
      <div className="p-4 mb-4 text-yellow-700 bg-yellow-100 rounded-lg">
        <PhotoIcon className="w-6 h-6 inline mr-2" />
        Không có hình ảnh để hiển thị
      </div>
    );
  }

  const renderMedia = () => {
    const item = propertyImages[currentIndex];

    if (!item) return null;

    const isVideo = isVideoFile(item);

    return (
      <div className="relative w-full h-96 bg-black rounded-xl overflow-hidden shadow-lg">
        {isVideo ? (
          <>
            {!isPlaying && (
              <button
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                tabIndex={0}
                onClick={handleVideoPlay}
                onKeyDown={(e) => e.key === "Enter" && handleVideoPlay()}
              >
                <div className="absolute inset-0 bg-black opacity-90" />
                <PlayIcon className="relative w-20 h-20 text-white opacity-90 hover:opacity-100 transition-opacity" />
              </button>
            )}
            <video
              controls
              autoPlay={isPlaying}
              className="w-full h-full object-contain"
              onPause={handleVideoPause}
              onPlay={handleVideoPlay}
            >
              <source src={item} type="video/mp4" />
              <track default kind="captions" label="Vietnamese" srcLang="vi" />
              Trình duyệt của bạn không hỗ trợ thẻ video.
            </video>
          </>
        ) : (
          <img
            alt="Property"
            className="w-full h-full object-contain"
            loading="lazy"
            src={item}
          />
        )}
      </div>
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  return (
    <div className="text-center space-y-4 mt-32">
      {renderMedia()}
      <div className="flex justify-center gap-2 overflow-x-auto pb-4">
        {propertyImages.map((item, index) => (
          <button
            // đêm qua sửa chỗ này
            key={index}
            className={`relative shrink-0 cursor-pointer transition-all duration-200 ${
              index === currentIndex
                ? "ring-4 ring-blue-500"
                : "opacity-75 hover:opacity-100"
            }`}
            style={{ width: "80px", height: "80px" }}
            type="button"
            onClick={() => handleThumbnailClick(index)}
            onKeyDown={(e) => e.key === "Enter" && handleThumbnailClick(index)}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden bg-black">
              <img
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                src={item}
              />
              {isVideoFile(item) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <PlayIcon className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlbumRenderer;
