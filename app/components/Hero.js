"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("loadeddata", playVideo, { once: true });
    }

    return () => {
      video.removeEventListener("loadeddata", playVideo);
    };
  }, []);

  return (
    <div className="relative min-h-[72dvh] xl:min-h-[100dvh]">
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        fetchPriority="high"
        src="/Herovideo4.mp4"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Gradient foarte gradual pentru lizibilitatea textului */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 via-45% to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full min-h-[60dvh] max-w-[1400px] flex-col justify-end px-5 pb-5 xl:min-h-[80dvh] xl:px-16 xl:pb-20">
        <div className="max-w-2xl">
          <p className="mb-2 font-roboto text-xs font-medium text-white">
            MIERE NATURALĂ • 100% AUTENTICĂ
          </p>

          <h1 className="max-w-xl font-playfair text-[2.35rem] leading-[1.05] font-extralight text-white md:text-5xl xl:text-6xl">
            Natură pură în fiecare produs
          </h1>

          <h2 className="mt-4 max-w-md font-roboto text-base leading-relaxed text-white/90 md:text-lg xl:text-2xl">
            Descoperă selecția noastră de produse naturale, realizate cu grijă
            și tradiție.
          </h2>

          <div className="mt-6 flex w-full max-w-[340px] items-center justify-between rounded-full bg-white p-2 sm:max-w-[380px] xl:w-fit xl:max-w-none xl:gap-15 xl:px-2.5 xl:py-2.5">
            <p className="whitespace-nowrap pl-4 font-roboto text-xs font-bold leading-tight text-mierealbastru sm:text-sm">
              NATURALĂ 100%
            </p>

            <Link
              href="/produse"
              className="cursor-pointer rounded-full bg-mierealbastru px-6 py-3 font-roboto text-sm font-semibold text-white transition-colors hover:bg-[#1F3967] sm:px-7 sm:text-[15px]"
            >
              Descoperă acum
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
