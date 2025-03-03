"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PhotoIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";

interface AlbumRendererProps {
  propertyImages: string[];
}

const AlbumRenderer = ({ propertyImages }: AlbumRendererProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Xử lý click ngoài để đóng carousel
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

  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);
  const videoRegex = /\.(mp4|webm|ogg)$/i;
  const isVideoFile = (fileName: string) => videoRegex.exec(fileName) !== null;

  const renderMedia = (index: number) => {
    const item = propertyImages[index];

    if (!item) return null;
    const isVideo = isVideoFile(item);

    return (
      <div className="relative w-full h-full bg-black rounded-xl overflow-hidden shadow-lg">
        {isVideo ? (
          <>
            {!isPlaying && (
              <button
                aria-label="Play video"
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={handleVideoPlay}
                onKeyDown={(e) => e.key === "Enter" && handleVideoPlay()}
              >
                <div className="absolute inset-0 bg-black opacity-50" />
                <PlayIcon className="relative w-12 h-12 text-white opacity-90 hover:opacity-100 transition-opacity" />
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
            alt={`Property ${index + 1}`}
            className="w-full h-full object-contain"
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
    return (
      <div className="flex flex-col md:flex-row gap-1">
        {/* Hình ảnh lớn bên trái */}
        <button
          aria-label="View large image"
          className="w-full md:w-2/3 h-[500px] relative cursor-pointer"
          onClick={() => handleImageClick(0)}
          onKeyDown={(e) => e.key === "Enter" && handleImageClick(0)}
        >
          {renderMedia(0)}
          {/* Nút Đăng bán */}
          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-md">
            Đăng bán
          </div>
          <div className="absolute bottom-6 right-6 bg-black/50 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2">
            <PhotoIcon className="w-5 h-5" />
            <span>{propertyImages.length}</span>
          </div>
        </button>
        {/* Hai hình ảnh nhỏ bên phải */}
        <div className="w-full md:w-1/3 h-[500px] flex flex-col gap-1">
          <button
            aria-label="View second image"
            className="w-full h-1/2 relative cursor-pointer"
            onClick={() => handleImageClick(1)}
            onKeyDown={(e) => e.key === "Enter" && handleImageClick(1)}
          >
            {renderMedia(1)}
          </button>
          <button
            aria-label="View third image"
            className="w-full h-1/2 relative cursor-pointer"
            onClick={() => handleImageClick(2)}
            onKeyDown={(e) => e.key === "Enter" && handleImageClick(2)}
          >
            {renderMedia(2)}
          </button>
        </div>
      </div>
    );
  };

  const renderCarousel = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div
          ref={carouselRef}
          className="relative w-full max-w-4xl h-[80vh] bg-white rounded-xl p-4 shadow-lg"
        >
          <button
            aria-label="Close carousel"
            className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-gray-300"
            onClick={() => setIsCarouselOpen(false)}
          >
            ×
          </button>
          <button
            aria-label="Close carousel"
            className="absolute top-4 left-4 bg-gray-200 text-gray-800 px-3 py-1 rounded-lg text-sm font-medium shadow-md hover:bg-gray-300"
            onClick={() => setIsCarouselOpen(false)}
          >
            Đóng
          </button>
          <button
            aria-label="Previous image"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition-colors z-10"
            onClick={() =>
              setCurrentIndex(
                (prev) =>
                  (prev - 1 + propertyImages.length) % propertyImages.length,
              )
            }
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
          </button>
          <button
            aria-label="Next image"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition-colors z-10"
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % propertyImages.length)
            }
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-800" />
          </button>
          <div className="relative w-full h-full">
            {renderMedia(currentIndex)}
            {/* Thumbnail ở dưới */}
            <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-4">
              {propertyImages.map((item, index) => (
                <button
                  key={item}
                  aria-label={`View thumbnail ${index + 1}`}
                  className={`relative shrink-0 cursor-pointer transition-all duration-200 ${
                    index === currentIndex
                      ? "ring-4 ring-blue-500"
                      : "opacity-75 hover:opacity-100"
                  }`}
                  style={{ width: "80px", height: "80px" }}
                  onClick={() => setCurrentIndex(index)}
                  onKeyDown={(e) => e.key === "Enter" && setCurrentIndex(index)}
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
        </div>
      </div>
    );
  };

  return (
    <div className="text-center space-y-4 w-full max-w-6xl mx-auto p-4">
      {isCarouselOpen ? renderCarousel() : renderInitialLayout()}
    </div>
  );
};

export default AlbumRenderer;
