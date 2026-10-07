"use client";

import { useCart } from "../context/CartContext";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";

const FREE_SHIPPING_THRESHOLD = 200;
const SHIPPING_COST = 19.99;

export default function CartClient() {
  const { items, isLoaded, updateQuantity, removeItem } = useCart();

  const subtotal = items.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

  const total = subtotal + shipping;

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F5EE] font-roboto">
        <div className="text-sm text-gray-500">Se încarcă coșul...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5EE] font-roboto">
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <CartHeader itemCount={items.length} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          <CartItems
            items={items}
            onIncrease={(id) => {
              const item = items.find((product) => product.id === id);

              if (item) {
                updateQuantity(id, item.quantity + 1);
              }
            }}
            onDecrease={(id) => {
              const item = items.find((product) => product.id === id);

              if (item) {
                updateQuantity(id, Math.max(1, item.quantity - 1));
              }
            }}
            onRemove={removeItem}
          />

          <CartSummary
            itemCount={items.length}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            freeShippingThreshold={FREE_SHIPPING_THRESHOLD}
          />
        </div>
      </section>
    </main>
  );
}

function CartHeader({ itemCount }) {
  return (
    <>
      <a
        href="/produse"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-500 transition-colors hover:text-mierealbastru"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 12H5m7 7-7-7 7-7"
          />
        </svg>
        Continuă cumpărăturile
      </a>

      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
          Coșul tău
        </p>

        <h1 className="mt-2 font-playfair text-3xl font-bold text-mierealbastru sm:text-4xl lg:text-5xl">
          Coșul tău
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          {itemCount === 1
            ? "Ai un produs în coș."
            : `Ai ${itemCount} produse în coș.`}
        </p>
      </div>
    </>
  );
}
