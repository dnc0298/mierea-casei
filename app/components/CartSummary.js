import Link from "next/link";

export default function CartSummary({
  itemCount,
  subtotal,
  shipping,
  total,
  freeShippingThreshold,
}) {
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
        {/* HEADER */}

        <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
          <h2 className="font-playfair text-xl font-bold text-mierealbastru">
            Sumar comandă
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            {itemCount === 1
              ? "1 produs în coș"
              : `${itemCount} produse în coș`}
          </p>
        </div>

        {/* TOTALURI */}

        <div className="px-5 py-5 sm:px-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>

            <span className="font-medium text-gray-800">
              {subtotal.toFixed(2)} lei
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-gray-500">Livrare</span>

            <span
              className={`font-medium ${
                shipping === 0 ? "text-amber-600" : "text-gray-800"
              }`}
            >
              {shipping === 0 ? "Gratuit" : `${shipping.toFixed(2)} lei`}
            </span>
          </div>

          {/* TRANSPORT GRATUIT */}

          {subtotal > 0 && !isFreeShipping && (
            <div className="mt-5 rounded-2xl bg-[#F8F5EE] px-4 py-3">
              <p className="text-xs leading-5 text-gray-500">
                Mai adaugă{" "}
                <span className="font-bold text-mierealbastru">
                  {remainingForFreeShipping.toFixed(2)} lei
                </span>{" "}
                pentru transport gratuit.
              </p>
            </div>
          )}

          {isFreeShipping && (
            <div className="mt-5 rounded-2xl bg-amber-50 px-4 py-3">
              <p className="text-xs font-medium text-amber-700">
                Ai transport gratuit pentru această comandă.
              </p>
            </div>
          )}

          <div className="my-5 border-t border-dashed border-gray-200" />

          {/* TOTAL */}

          <div className="flex items-end justify-between">
            <span className="text-sm font-bold text-gray-700">Total</span>

            <span className="font-playfair text-2xl font-bold text-mierealbastru">
              {total.toFixed(2)} lei
            </span>
          </div>

          {/* CHECKOUT */}

          <Link
            href="/checkout"
            className={`mt-6 flex h-12 w-full items-center justify-center rounded-full px-5 text-xs font-bold uppercase tracking-wide text-white transition-colors ${
              itemCount === 0
                ? "pointer-events-none cursor-not-allowed bg-mierealbastru opacity-50"
                : "bg-mierealbastru hover:bg-[#1F3967]"
            }`}
            aria-disabled={itemCount === 0}
          >
            Continuă către checkout
          </Link>

          <p className="mt-4 text-center text-[11px] leading-5 text-gray-400">
            Poți modifica produsele și cantitățile înainte de finalizarea
            comenzii.
          </p>
        </div>
      </div>
    </aside>
  );
}
