"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { useCart } from "../context/CartContext";

export const ProductCard = ({
  id,
  title,
  category,
  description,
  price,
  weight,
  image,
  badge,
}) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart(event) {
    event.preventDefault();
    event.stopPropagation();

    addItem({
      id,
      title,
      category,
      price,
      weight,
      image,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 500);
  }

  return (
    <article className="group relative flex h-full min-w-0 w-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)]">
      {/* =========================================
          ZONA CARE DESCHIDE PRODUSUL
      ========================================= */}

      <Link href={`/produse/${id}`} className="flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col p-2.5 sm:p-4 lg:p-5">
          {/* Badge + weight */}

          <div className="mb-2 flex min-h-[18px] shrink-0 items-center justify-between gap-2 sm:mb-3">
            <div className="min-w-0">
              {badge ? (
                <span className="inline-block rounded-full bg-mierealbastru px-2 py-1 text-[7px] font-bold uppercase tracking-[0.08em] text-white sm:px-2.5 sm:text-[9px]">
                  {badge}
                </span>
              ) : (
                <span className="block h-[18px]" />
              )}
            </div>

            {weight && (
              <span className="shrink-0 text-[12px] font-medium tracking-wide text-stone-400 sm:text-[14px]">
                {weight}
              </span>
            )}
          </div>

          {/* Product image */}

          <div className="relative mb-3 aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-[#F8F5EE] transition-colors duration-300 group-hover:bg-[#F3EBDD] sm:mb-4">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 25vw"
              className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.06] sm:p-5"
            />

            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/[0.03]" />
          </div>

          {/* Product information */}

          <div className="flex min-h-0 flex-1 flex-col">
            {category && (
              <p className="mb-1 shrink-0 text-[8px] font-bold uppercase tracking-[0.16em] text-amber-600 sm:text-[10px]">
                {category}
              </p>
            )}

            <h3 className="shrink-0 font-serif text-sm font-bold leading-tight text-stone-800 transition-colors duration-300 group-hover:text-mierealbastru sm:text-lg">
              {title}
            </h3>

            {description && (
              <p className="mt-1.5 line-clamp-2 min-h-[2.6em] text-[10px] leading-relaxed text-stone-500 sm:mt-2 sm:text-xs">
                {description}
              </p>
            )}
          </div>
        </div>
      </Link>

      {/* =========================================
          BOTTOM SECTION
          NU ESTE ÎN INTERIORUL LINK-ULUI
      ========================================= */}

      <div className="mt-auto shrink-0 mx-2.5 border-t border-stone-100 px-0 py-3 sm:mx-4 sm:py-4 lg:mx-5">
        <div className="flex min-w-0 items-end justify-between gap-2">
          {/* Price */}

          <div className="min-w-0 shrink-0">
            <p className="mb-0.5 text-[7px] font-semibold uppercase tracking-[0.12em] text-stone-400 sm:text-[9px]">
              Preț / borcan
            </p>

            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold tracking-tight text-stone-800 sm:text-xl">
                {typeof price === "number"
                  ? price.toFixed(2).replace(".", ",")
                  : price}
              </span>

              <span className="text-[9px] text-stone-500 sm:text-xs">lei</span>
            </div>
          </div>

          {/* Add to cart */}

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={added}
            aria-label={`Adaugă ${title} în coș`}
            className={`relative z-10 inline-flex h-9 w-[42px] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg text-white transition-colors duration-150 sm:h-auto sm:w-[145px] sm:rounded-xl sm:px-3.5 sm:py-2.5 sm:text-[11px] md:w-[120px] md:px-2 md:py-2.5 md:text-[10px] lg:w-[145px] lg:px-3.5 lg:text-[11px] disabled:cursor-not-allowed disabled:opacity-70 ${
              added
                ? "bg-amber-500"
                : "bg-mierealbastru hover:bg-[#1F3967] hover:shadow-md"
            }`}
          >
            <svg
              className="h-4 w-4 shrink-0 sm:h-[15px] sm:w-[15px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>

            <span className="hidden whitespace-nowrap font-medium sm:inline">
              {added ? "Adăugat în coș" : "Adaugă în coș"}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};
