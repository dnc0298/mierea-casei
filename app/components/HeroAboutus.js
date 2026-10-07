"use client";

import Image from "next/image";

function HeroAboutus() {
  return (
    <div className="relative min-h-[72dvh] lg:min-h-[78dvh]">
      <Image
        src="/despre-noi.png"
        alt="Albine și miere naturală"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 mx-auto flex h-full min-h-[72dvh] max-w-[1400px] flex-col justify-end px-5 pb-16 lg:min-h-[78dvh] lg:px-16 lg:pb-20">
        <div>
          <p className="mb-2 font-roboto text-xs font-medium text-white">
            DESPRE MIEREA CASEI
          </p>

          <h1 className="max-w-2xl font-playfair text-4xl font-extralight leading-tight text-white md:text-5xl lg:text-6xl">
            Povestea noastră începe în stup
          </h1>

          <p className="mt-4 max-w-xl font-roboto text-base leading-7 text-white/90 lg:text-lg">
            Descoperă pasiunea din spatele fiecărui borcan de miere și legătura
            dintre albine, natură și oameni.
          </p>

          <div className="mt-6 flex w-fit items-center gap-4 rounded-full bg-white p-2.5">
            <p className="hidden pl-3 font-roboto text-xs font-bold text-mierealbastru sm:block">
              DIN NATURĂ, CU GRIJĂ
            </p>

            <a
              href="#povestea-noastra"
              onClick={(e) => {
                e.preventDefault();

                document.getElementById("povestea-noastra")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="rounded-full bg-mierealbastru px-6 py-2.5 font-roboto text-sm font-semibold text-white transition-colors hover:bg-[#1F3967]"
            >
              Povestea noastră
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroAboutus;
