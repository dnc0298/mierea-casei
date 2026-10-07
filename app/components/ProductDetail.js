import Link from "next/link";

import ProductGallery from "./ProductGallery";
import ProductActions from "./ProductActions";
import { ChevronRight, HomeIcon, CheckIcon } from "./ProductIcons";

// ======================================================
// FEATURES
// ======================================================

const defaultFeatures = [
  {
    label: "100% Natural",
    icon: "leaf",
  },
  {
    label: "Fără Aditivi",
    icon: "drop",
  },
  {
    label: "Ambalare Atentă",
    icon: "package",
  },
  {
    label: "Calitate Garantată",
    icon: "shield",
  },
];

// ======================================================
// FEATURE ICON
// ======================================================

function FeatureIcon({ type }) {
  const common = {
    className: "w-5 h-5 sm:w-6 sm:h-6",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    viewBox: "0 0 24 24",
  };

  switch (type) {
    case "leaf":
      return (
        <svg {...common}>
          <path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 2 17 2s1 6-2 9c-1.5 1.5-3 1.5-4 3.5" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9 14.63 11 13.5 11 13.5" />
        </svg>
      );

    case "drop":
      return (
        <svg {...common}>
          <path d="M12 2c4 5 7 8.5 7 12a7 7 0 11-14 0c0-3.5 3-7 7-12z" />
        </svg>
      );

    case "package":
      return (
        <svg {...common}>
          <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
          <path d="M3 8l9 5 9-5" />
          <path d="M12 13v8" />
        </svg>
      );

    case "shield":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );

    default:
      return null;
  }
}

// ======================================================
// PRODUCT DETAIL - SERVER COMPONENT
// ======================================================

export default function ProductDetail({
  id,
  title,
  category,
  description,
  largeDescription,
  price,
  weight,
  image,
  thumbnails,
  badge,
  features = defaultFeatures,
}) {
  return (
    <section className=" font-roboto relative min-h-screen overflow-hidden bg-olive-100 ">
      {/* ================================================== */}
      {/* BACKGROUND */}
      {/* ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          hidden
          md:block
         

        "
      />

      {/* ================================================== */}
      {/* CONTENT */}
      {/* ================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* ================================================== */}
        {/* BREADCRUMBS */}
        {/* ================================================== */}

        <nav className="mb-6 flex items-center gap-2 text-xs text-gray-500 sm:mb-8 sm:text-sm">
          <HomeIcon className="h-4 w-4" />

          <ChevronRight className="h-3 w-3" />

          <Link
            href="/produse"
            className="transition-colors hover:text-gray-800"
          >
            Produse
          </Link>

          <ChevronRight className="h-3 w-3" />

          <span className="font-medium text-amber-500">{title}</span>
        </nav>

        {/* MAIN CONTENT */}

        <div className="grid items-start gap-8 md:gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* LEFT - GALLERY */}

          <ProductGallery
            title={title}
            image={image}
            thumbnails={thumbnails}
            badge={badge}
          />

          {/* RIGHT - PRODUCT INFORMATION */}

          <div className="flex flex-col rounded-2xl bg-white/85 p-5 shadow-sm backdrop-blur-[2px] sm:p-7 lg:p-8">
            {/* CATEGORY */}

            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-500 sm:text-xs">
              {category}
            </p>

            {/* TITLE */}

            <h1 className="font-playfair text-3xl leading-[1.1] text-gray-800 sm:text-4xl md:text-5xl">
              {title}
            </h1>

            {/* PRICE */}

            <div className="mt-4 flex items-baseline gap-3 sm:mt-5">
              <span className="text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl">
                {price.toFixed(2).replace(".", ",")} lei
              </span>

              <span className="text-sm text-gray-400 sm:text-base">
                / {weight}
              </span>
            </div>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-600 sm:mt-5 sm:text-[15px]">
              {description}
            </p>

            <ProductActions
              product={{ id, title, category, price, weight, image }}
            />

            <div className="mt-7 grid grid-cols-4 border-y border-gray-200 py-5 sm:mt-8 sm:py-6">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <span className="text-mierealbastru">
                    <FeatureIcon type={feature.icon} />
                  </span>

                  <span className="text-[8px] font-medium leading-tight text-gray-600 sm:text-[10px]">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>

            {/* ================================================== */}
            {/* DETAILS */}
            {/* ================================================== */}

            <div className="mt-6 sm:mt-7">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-wider  text-stone-800 sm:text-sm">
                Detalii produs
              </h2>

              <p className="max-w-xl text-sm leading-relaxed text-gray-600">
                {largeDescription}
              </p>

              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-xs  text-stone-800 sm:text-sm">
                  <CheckIcon className="h-4 w-4 shrink-0 text-amber-500" />
                  Consistență fină și aromă naturală
                </li>

                <li className="flex items-center gap-2 text-xs  text-stone-800 sm:text-sm">
                  <CheckIcon className="h-4 w-4 shrink-0 text-amber-500" />
                  Obținută din ingrediente naturale
                </li>

                <li className="flex items-center gap-2 text-xs  text-stone-800 sm:text-sm">
                  <CheckIcon className="h-4 w-4 shrink-0 text-amber-500" />
                  Potrivită pentru consumul zilnic
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
