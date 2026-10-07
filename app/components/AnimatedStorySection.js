"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function AnimatedStorySection({
  id,
  image,
  imageAlt,
  badge,
  title,
  paragraphs,
  imageSide = "left",
}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const imageFromRight = imageSide === "right";

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`scroll-mt-24 overflow-hidden ${
        imageSide === "right" ? "bg-olive-100" : "bg-white"
      }`}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2 md:gap-16 lg:px-20 lg:py-28">
        {/* IMAGINE */}
        <div
          className={`relative mx-auto h-[500px] w-full max-w-[550px] overflow-hidden rounded-2xl transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]
            ${imageFromRight ? "md:order-2" : "md:order-1"}
            ${
              isVisible
                ? "translate-x-0 opacity-100"
                : imageFromRight
                  ? "translate-x-20 opacity-0"
                  : "-translate-x-20 opacity-0"
            }
          `}
        >
          <Image src={image} alt={imageAlt} fill className="object-cover" />
        </div>

        {/* TEXT */}
        <div
          className={`min-w-0 transition-all delay-150 duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]
            ${imageFromRight ? "md:order-1" : "md:order-2"}
            ${
              isVisible
                ? "translate-x-0 opacity-100"
                : imageFromRight
                  ? "-translate-x-20 opacity-0"
                  : "translate-x-20 opacity-0"
            }
          `}
        >
          <span className="mb-6 inline-block rounded-full border border-mieregri bg-mierelight px-3 uppercase py-1 text-[10px] font-semibold tracking-wide text-gray-800 md:text-sm">
            {badge}
          </span>

          <h2 className="mb-6 font-playfair text-4xl font-light leading-tight text-gray-800 lg:text-6xl">
            {title}
          </h2>

          <div className="space-y-5 font-roboto text-base leading-relaxed text-gray-700 lg:text-[18px]">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnimatedStorySection;
