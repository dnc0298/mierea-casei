import Link from "next/link";
import CartItem from "../components/CartItem";

export default function CartItems({ items, onIncrease, onDecrease, onRemove }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
      {items.length > 0 ? (
        items.map((product) => (
          <CartItem
            key={product.id}
            product={product}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
          />
        ))
      ) : (
        <EmptyCart />
      )}
    </section>
  );
}

function EmptyCart() {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F5EE] text-mierealbastru">
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 7H6"
          />
          <circle cx="10" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
        </svg>
      </div>

      <p className="mt-6 font-playfair text-2xl font-bold text-mierealbastru">
        Coșul tău este gol
      </p>

      <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
        Nu ai adăugat încă niciun produs în coș.
      </p>

      <Link
        href="/produse"
        className="mt-6 flex h-12 items-center justify-center rounded-full bg-mierealbastru px-7 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#1F3967]"
      >
        Vezi produsele
      </Link>
    </div>
  );
}
