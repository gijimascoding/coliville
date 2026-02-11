"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 400);
    },
    [isTransitioning, currentIndex]
  );

  const goPrev = useCallback(() => {
    const nextIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    goTo(nextIndex);
  }, [currentIndex, images.length, goTo]);

  const goNext = useCallback(() => {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    goTo(nextIndex);
  }, [currentIndex, images.length, goTo]);

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
        <Image
          src={images[0]}
          alt={alt}
          fill
          unoptimized
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="group/carousel relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-secondary/5">
      {/* Images */}
      {images.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-400 ease-in-out"
          style={{
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 1 : 0,
          }}
        >
          <Image
            src={src}
            alt={`${alt} - ${index + 1}`}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          goPrev();
        }}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/40 text-secondary/70 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/80 hover:text-secondary hover:shadow-md opacity-0 group-hover/carousel:opacity-100"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          goNext();
        }}
        aria-label="Next image"
        className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/40 text-secondary/70 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/80 hover:text-secondary hover:shadow-md opacity-0 group-hover/carousel:opacity-100"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goTo(index);
            }}
            aria-label={`Go to image ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "h-2 w-5 bg-white shadow-sm"
                : "h-2 w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
