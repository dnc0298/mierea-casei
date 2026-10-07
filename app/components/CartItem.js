import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItem({
  product,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const { title, image, price, quantity, weight, category } = product;

  return (
    <div className="flex gap-4 border-b border-gray-100 px-4 py-5 last:border-none sm:gap-5 sm:px-5 sm:py-6">
      {/* Imagine */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#FFF8F0] sm:h-28 sm:w-28">
        <Image src={image} alt={title} fill className="object-contain p-3" />
      </div>

      {/* Detalii */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Categorie + titlu + ștergere */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="mb-1 text-[10px] font-medium uppercase leading-tight tracking-wider text-amber-500 sm:text-xs">
              {category}
            </p>

            <h3 className="text-base font-semibold leading-snug text-gray-900 sm:text-lg">
              {title}
            </h3>

            <p className="mt-1 text-sm text-gray-400">{weight}</p>
          </div>

          <button
            type="button"
            onClick={() => onRemove(product.id)}
            className="shrink-0 rounded-full p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500 sm:p-2"
            aria-label="Șterge produsul"
          >
            <Trash2 size={17} />
          </button>
        </div>

        {/* Cantitate + preț */}
        <div className="mt-4 flex items-end justify-between gap-2 sm:mt-5">
          {/* Quantity */}
          <div className="flex shrink-0 items-center rounded-full border border-gray-200 p-1">
            <button
              type="button"
              onClick={() => onDecrease(product.id)}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-gray-500 transition hover:bg-gray-300 sm:h-8 sm:w-8"
              aria-label="Scade cantitatea"
            >
              <Minus size={14} />
            </button>

            <span className="w-7 text-center text-sm font-semibold text-gray-500 sm:w-8">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() => onIncrease(product.id)}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-mierealbastru text-white transition hover:bg-[#1F3967] sm:h-8 sm:w-8"
              aria-label="Crește cantitatea"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Price */}
          <div className="min-w-0 text-right">
            <p className="text-[10px] leading-tight text-gray-400 sm:text-xs">
              {price.toFixed(2)} lei / buc.
            </p>

            <p className="mt-0.5 whitespace-nowrap text-base font-bold text-gray-900 sm:text-xl">
              {(price * quantity).toFixed(2)} lei
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
