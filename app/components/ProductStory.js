import Image from "next/image";
import Link from "next/link";

function ProductStory({
  image,
  imageAlt,
  badge,
  title,
  description,
  imageSide = "left",
}) {
  return (
    <div className={imageSide === "right" ? "bg-olive-100" : ""}>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-15 lg:gap-16 max-w-[1400px] mx-auto px-6 lg:px-20 py-16`}
      >
        <div
          className={`relative min-w-0 w-full max-w-[420px] h-[430px] md:max-w-[400px] md:h-[400px] lg:max-w-[550px] lg:h-[600px] mx-auto rounded-2xl overflow-hidden ${
            imageSide === "right" ? "md:order-2" : ""
          }`}
        >
          <Image
            src={image}
            fill
            sizes="(max-width: 768px) min(420px, calc(100vw - 48px)), 50vw"
            alt={imageAlt}
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <span className="inline-block bg-mierelight md:text-sm text-gray-800 text-[10px] font-semibold tracking-wide px-3 py-1 border-1 border-mieregri rounded-full mb-8">
            {badge}
          </span>

          <h2 className="font-playfair text-4xl font-light lg:text-6xl text-gray-800 mb-6">
            {title}
          </h2>

          <p className="text-gray-700 text-base lg:text-[20px] leading-relaxed mb-8">
            {description}
          </p>

          <Link
            href="/produse"
            className="group inline-flex items-center gap-2 bg-mierealbastru text-white font-semibold px-5 py-3 rounded-full hover:bg-[#1F3967] transition-colors no-underline"
          >
            Cumpara acum
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductStory;
