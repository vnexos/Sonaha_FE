"use client";
import { Image } from "@heroui/image";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

interface AlbumRendererProps {
  propertyImages: string[];
}

const ThumbnailGrid = ({
  items,
  currentIndex,
  onSelect,
  isVideoFile,
}: {
  items: string[];
  currentIndex: number;
  onSelect: (index: number) => void;
  isVideoFile: (fileName: string) => boolean;
}) => (
  <div className="flex justify-center gap-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
    {items.map((item, index) => (
      <button
        key={`${item}-${index}`}
        aria-label={`Select thumbnail ${index + 1}`}
        className={`relative shrink-0 cursor-pointer transition-all duration-300 rounded-lg shadow-md ${
          index === currentIndex
            ? "ring-4 ring-blue-500"
            : "opacity-80 hover:opacity-100 hover:ring-2 hover:ring-blue-300 hover:scale-105"
        }`}
        style={{ width: "130px", height: "130px" }}
        onClick={() => onSelect(index)}
      >
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
            alt={`Thumbnail ${index + 1}`}
            className="w-full h-full object-cover"
            classNames={{ wrapper: "h-full" }}
            loading="lazy"
            src={item}
          />
          {isVideoFile(item) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Icon
                className="w-6 h-6 text-white"
                icon="material-symbols:play-arrow-rounded"
              />
            </div>
          )}
        </div>
      </button>
    ))}
  </div>
);

const AlbumRenderer = ({ propertyImages }: AlbumRendererProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        carouselRef.current &&
        !carouselRef.current.contains(event.target as Node)
      ) {
        setIsCarouselOpen(false);
      }
    };

    if (isCarouselOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCarouselOpen]);

  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);
  const videoRegex = /\.(mp4|webm|ogg)$/i;
  const isVideoFile = (fileName: string) => videoRegex.exec(fileName) !== null;

  const renderMedia = (index: number) => {
    const item = propertyImages[index];

    if (!item) return null;

    return (
      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg transition-transform duration-300">
        {isVideoFile(item) ? (
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
        ) : (
          <Image
            alt={`Property ${index + 1}`}
            className="w-full h-full object-cover"
            classNames={{ wrapper: "h-full" }}
            loading="lazy"
            src={item}
          />
        )}
      </div>
    );
  };

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setIsCarouselOpen(true);
  };

  const renderInitialLayout = () => {
    const currentItem = propertyImages[currentIndex];
    const isVideo = isVideoFile(currentItem);

    return (
      <div className="flex flex-col gap-4">
        <div className="relative">
          <button
            aria-label="View large image"
            className="w-full relative cursor-pointer overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02]"
            style={{ aspectRatio: "9/16", maxHeight: "80vh" }}
            onClick={() => handleImageClick(currentIndex)}
          >
            {renderMedia(currentIndex)}
            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-md">
              Đăng bán
            </div>
            <div className="absolute bottom-6 right-6 bg-black/50 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2">
              <Icon className="w-5 h-5" icon="material-symbols:image-rounded" />
              <span>{propertyImages.length}</span>
            </div>
          </button>

          {isVideo && !isPlaying && (
            <button
              aria-label="Play video"
              className="absolute inset-0 flex items-center justify-center cursor-pointer bg-transparent border-none"
              onClick={handleVideoPlay}
            >
              <div className="absolute inset-0 bg-black opacity-50" />
              <Icon
                className="relative w-12 h-12 text-white opacity-90 hover:opacity-100 transition-opacity"
                icon="material-symbols:play-arrow-rounded"
              />
            </button>
          )}
        </div>

        <ThumbnailGrid
          currentIndex={currentIndex}
          isVideoFile={isVideoFile}
          items={propertyImages}
          onSelect={setCurrentIndex}
        />
      </div>
    );
  };

  const renderCarousel = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div
        ref={carouselRef}
        className="relative w-full max-w-4xl overflow-hidden rounded-xl p-6 shadow-xl bg-white"
        style={{ aspectRatio: "9/16", maxHeight: "85vh" }}
      >
        <button
          aria-label="Close carousel"
          className="absolute top-4 right-4 text-gray-800 text-2xl font-bold hover:text-gray-600 transition-colors"
          onClick={() => setIsCarouselOpen(false)}
        >
          ×
        </button>
        <button
          aria-label="Previous image"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-gray-200 transition-colors z-10"
          onClick={() =>
            setCurrentIndex(
              (prev) =>
                (prev - 1 + propertyImages.length) % propertyImages.length,
            )
          }
        >
          <Icon
            className="w-6 h-6 text-gray-800"
            icon="material-symbols:arrow-circle-left-rounded"
          />
        </button>
        <button
          aria-label="Next image"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-gray-200 transition-colors z-10"
          onClick={() =>
            setCurrentIndex((prev) => (prev + 1) % propertyImages.length)
          }
        >
          <Icon
            className="w-6 h-6 text-gray-800"
            icon="material-symbols:arrow-circle-right-rounded"
          />
        </button>
        <div className="relative w-full h-full">
          {renderMedia(currentIndex)}
          <ThumbnailGrid
            currentIndex={currentIndex}
            isVideoFile={isVideoFile}
            items={propertyImages}
            onSelect={setCurrentIndex}
          />
        </div>
      </div>
    </div>
  );

  if (!propertyImages?.length) {
    return (
      <div className="p-4 mb-4 text-yellow-700 bg-yellow-100 rounded-lg">
        <Icon
          className="w-6 h-6 inline mr-2"
          icon="material-symbols:image-rounded"
        />
        Không có hình ảnh để hiển thị
      </div>
    );
  }

  return (
    <div className="text-center space-y-4 w-full max-w-6xl mx-auto p-4">
      {isCarouselOpen ? renderCarousel() : renderInitialLayout()}
    </div>
  );
};

export default AlbumRenderer;
