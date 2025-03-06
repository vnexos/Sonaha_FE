"use client";

import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { cn } from "@heroui/theme";
import { Icon } from "@iconify/react";
import { useCallback, useEffect, useRef, useState } from "react";

export interface CarouselImage {
  id: number;
  url: string;
  name: string;
  title: string;
  des: string;
  fallbackUrl: string;
}

interface CarouselProps {
  images: CarouselImage[];
}

export default function Carousel({ images }: Readonly<CarouselProps>) {
  const [index, setIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState<NodeJS.Timeout>();
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const privateNextSlide = useCallback(
    () => setIndex((prev) => (prev + 1) % images.length),
    [index, autoSlide],
  );

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
    clearInterval(autoSlide);
    setAutoSlide(setInterval(privateNextSlide, 3500));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
    clearInterval(autoSlide);
    setAutoSlide(setInterval(privateNextSlide, 3500));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };

  useEffect(() => {
    const autoSlide = setInterval(privateNextSlide, 3500);

    setAutoSlide(autoSlide);

    return () => clearInterval(autoSlide);
  }, []);

  return (
    <div
      ref={carouselRef}
      className="relative w-full h-[40vh] sm:h-[75vh] overflow-hidden"
    >
      {images.map((img, i) => (
        <div
          key={img.id}
          className={`absolute inset-0 h-full transition-transform duration-700 ease-in-out z-0 ${
            i === index ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Image
            alt={img.name}
            classNames={{
              img: cn(
                "pointer-events-none !object-cover -mb-[100%] w-[100vw] h-[40vh] sm:h-[75vh] rounded-none z-0",
                { div: "rounded-none" },
              ),
              blurredImg: "rounded-none",
            }}
            fallbackSrc={img.fallbackUrl}
            src={img.url}
          />
          <div className="absolute bottom-10 left-10 bg-[#ffffff7f] bg-opacity-50 p-4 rounded-xl text-white sm:block hidden z-[1] backdrop-blur-md">
            <h2 className="text-xl font-bold text-black">{img.title}</h2>
            <p className="text-sm text-black">{img.des}</p>
          </div>
        </div>
      ))}

      <div
        className="absolute inset-0 flex justify-between items-center px-6 z-0"
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
      >
        <Button
          isIconOnly
          className="bg-white/30 hover:bg-white/50"
          variant="light"
          onPress={prevSlide}
        >
          <Icon icon="mdi:chevron-left" width={30} />
        </Button>
        <Button
          isIconOnly
          className="bg-white/30 hover:bg-white/50"
          variant="light"
          onPress={nextSlide}
        >
          <Icon icon="mdi:chevron-right" width={30} />
        </Button>
      </div>
    </div>
  );
}
