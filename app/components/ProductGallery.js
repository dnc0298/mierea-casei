"use client";

import Image from "next/image";
import { useState } from "react";

import { ChevronRight } from "./ProductIcons";

export default function ProductGallery({ title, image, thumbnails, badge }) {
  const [activeThumb, setActiveThumb] = useState(0);

  const galleryImages =
    thumbnails && thumbnails.length > 0 ? thumbnails : [image];

  const currentImage = galleryImages[activeThumb] || galleryImages[0] || image;

  const goToPreviousImage = () => {
    setActiveThumb((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1,
    );
  };

  const goToNextImage = () => {
    setActiveThumb((current) =>
      current === galleryImages.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* MAIN IMAGE */}
      <div className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-[#F8F5EE] shadow-sm sm:rounded-3xl">
        {badge && (
          <div className="absolute left-4 top-4 z-20 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[#1B2A4E] shadow-sm sm:left-5 sm:top-5 sm:text-[10px]">
            {badge}
          </div>
        )}

        {galleryImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium text-stone-500 shadow-sm backdrop-blur-sm">
            {activeThumb + 1} / {galleryImages.length}
          </div>
        )}

        {galleryImages.length > 1 && (
          <button
            type="button"
            onClick={goToPreviousImage}
            aria-label="Imaginea precedentă"
            className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-600 shadow-md transition-all duration-300 hover:scale-105 hover:text-[#1B2A4E] sm:left-4 sm:h-10 sm:w-10"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
          </button>
        )}

        {galleryImages.length > 1 && (
          <button
            type="button"
            onClick={goToNextImage}
            aria-label="Imaginea următoare"
            className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-600 shadow-md transition-all duration-300 hover:scale-105 hover:text-[#1B2A4E] sm:right-4 sm:h-10 sm:w-10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        <Image
          src={currentImage}
          alt={`${title} - imaginea ${activeThumb + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-7 transition-opacity duration-300 sm:p-10 lg:p-12"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
        {galleryImages.map((thumb, idx) => (
          <button
            key={`${thumb}-${idx}`}
            type="button"
            onClick={() => setActiveThumb(idx)}
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
