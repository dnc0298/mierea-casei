"use client";

import { useState } from "react";
import { CartIcon } from "./ProductIcons";
import { useCart } from "../context/CartContext";

export default function ProductActions({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  function handleAddToCart() {
    addItem(product, quantity);
    setAdded(true);

    setTimeout(() => setAdded(false), 700);
  }

  return (
    <div className="mt-6 flex gap-2 sm:mt-7 sm:gap-3">
      <div className="flex h-11 shrink-0 items-center overflow-hidden rounded-full border border-gray-200 bg-white sm:h-12">
        <button
          type="button"
          aria-label="Scade cantitatea"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="flex h-full w-9 items-center justify-center text-gray-700 hover:bg-gray-50 sm:w-10"
        >
          −
        </button>

        <span className="w-8 text-center text-sm font-medium text-gray-700">
          {quantity}
        </span>

        <button
          type="button"
          aria-label="Crește cantitatea"
          onClick={() => setQuantity((q) => q + 1)}
          className="flex h-full w-9 items-center justify-center text-gray-700 hover:bg-gray-50 sm:w-10"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={added}
        className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-full px-4 text-[11px] font-bold uppercase tracking-wide text-white transition-colors duration-200 sm:h-12 sm:text-xs disabled:cursor-not-allowed disabled:opacity-70 ${
          added ? "bg-amber-500" : "bg-mierealbastru hover:bg-[#1F3967]"
        }`}
      >
        <CartIcon className="h-4 w-4" />

        <span>{added ? "Adăugat în coș!" : "Adaugă în coș"}</span>
      </button>
    </div>
  );
}
