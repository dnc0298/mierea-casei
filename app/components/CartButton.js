"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartButton({ className = "" }) {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cos"
      className={`relative flex h-8 w-8 items-center justify-center text-gray-700 ${className}`}
      aria-label={`Coș: ${totalItems} produse`}
    >
      <ShoppingCart className="h-6 w-6 transition-colors hover:text-[#2F4F86]" />

      {totalItems > 0 && (
        <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  );
}
