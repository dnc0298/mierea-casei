"use client";

import Image from "next/image";
import { useState } from "react";

import { ChevronRight } from "./ProductIcons";

export default function ProductGallery({ title, image, thumbnails, badge }) {
  const [activeThumb, setActiveThumb] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const galleryImages =
    thumbnails && thumbnails.length > 0 ? thumbnails : [image];

  const hasMultipleImages = galleryImages.length > 1;

  // ======================================================
  // NAVIGATION
  // ======================================================

  const goToPreviousImage = () => {
    if (isTransitioning || !hasMultipleImages) return;

    setIsTransitioning(true);

    setActiveThumb((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1,
    );

    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  const goToNextImage = () => {
    if (isTransitioning || !hasMultipleImages) return;

    setIsTransitioning(true);

    setActiveThumb((current) =>
      current === galleryImages.length - 1 ? 0 : current + 1,
    );

    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  const selectThumbnail = (index) => {
    if (index === activeThumb || isTransitioning) return;

    setIsTransitioning(true);
    setActiveThumb(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  // ======================================================
  // SWIPE
  // ======================================================

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    const minSwipeDistance = 50;

    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) {
        goToNextImage();
      } else {
        goToPreviousImage();
      }
    }

    setTouchStart(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* ================================================== */}
      {/* MAIN IMAGE */}
      {/* ================================================== */}

      <div
        className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-[#F8F5EE] shadow-sm sm:rounded-3xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "pan-y" }}
      >
        {/* ================================================== */}
        {/* BADGE */}
        {/* ================================================== */}

        {badge && (
          <div className="absolute left-4 top-4 z-30 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[#1B2A4E] shadow-sm sm:left-5 sm:top-5 sm:text-[10px]">
            {badge}
          </div>
        )}

        {/* ================================================== */}
        {/* IMAGE TRACK */}
        {/* ================================================== */}

        <div
          className="absolute inset-0 flex"
          style={{
            width: `${galleryImages.length * 100}%`,
            transform: `translateX(-${
              (activeThumb * 100) / galleryImages.length
            }%)`,
            transition: isTransitioning
              ? "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
          }}
        >
          {galleryImages.map((galleryImage, index) => (
            <div
              key={`${galleryImage}-${index}`}
              className="relative h-full shrink-0"
              style={{
                width: `${100 / galleryImages.length}%`,
              }}
            >
              <Image
                src={galleryImage}
                alt={`${title} - imaginea ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-7 sm:p-10 lg:p-12"
              />
            </div>
          ))}
        </div>

        {/* ================================================== */}
        {/* COUNTER */}
        {/* ================================================== */}

        {hasMultipleImages && (
          <div className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium text-stone-500 shadow-sm backdrop-blur-sm">
            {activeThumb + 1} / {galleryImages.length}
          </div>
        )}

        {/* ================================================== */}
        {/* PREVIOUS */}
        {/* ================================================== */}

        {hasMultipleImages && (
          <button
            type="button"
            onClick={goToPreviousImage}
            aria-label="Imaginea precedentă"
            disabled={isTransitioning}
            className="absolute left-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-600 shadow-md transition-all duration-300 hover:scale-105 hover:text-[#1B2A4E] disabled:pointer-events-none sm:left-4 sm:h-10 sm:w-10"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
          </button>
        )}

        {/* ================================================== */}
        {/* NEXT */}
        {/* ================================================== */}

        {hasMultipleImages && (
          <button
            type="button"
            onClick={goToNextImage}
            aria-label="Imaginea următoare"
            disabled={isTransitioning}
            className="absolute right-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-600 shadow-md transition-all duration-300 hover:scale-105 hover:text-[#1B2A4E] disabled:pointer-events-none sm:right-4 sm:h-10 sm:w-10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* ================================================== */}
      {/* THUMBNAILS */}
      {/* ================================================== */}

      <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
        {galleryImages.map((thumb, idx) => (
          <button
            key={`${thumb}-${idx}`}
            type="button"
            onClick={() => selectThumbnail(idx)}
            aria-label={`Vezi imaginea ${idx + 1}`}
            className={`group relative aspect-square overflow-hidden rounded-xl bg-[#F5F1E9] transition-all duration-200 sm:rounded-2xl ${
              activeThumb === idx
                ? "ring-2 ring-[#1B2A4E] ring-offset-2"
                : "opacity-80 hover:opacity-100"
            }`}
          >
            <Image
              src={thumb}
              alt={`${title} - imaginea ${idx + 1}`}
              fill
              sizes="(max-width: 640px) 25vw, 160px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {activeThumb === idx && (
              <div className="absolute inset-0 bg-[#1B2A4E]/5" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
