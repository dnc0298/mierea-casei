import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { createClient } from "@supabase/supabase-js";

import { authOptions } from "@/app/lib/auth";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
);

const statusLabels = {
  pending: "În așteptare",
  processing: "În procesare",
  shipped: "Expediată",
  completed: "Finalizată",
  cancelled: "Anulată",
};

const statusStyles = {
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  processing: "border-blue-200 bg-blue-50 text-blue-700",
  shipped: "border-green-200 bg-green-50 text-green-700",
  completed: "border-green-200 bg-green-50 text-green-700",
  cancelled: "border-red-200 bg-red-50 text-red-700",
};

export default async function MyOrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      created_at,
      subtotal,
      shipping_cost,
      total,
      status,
      awb,
      order_items (
        id,
        product_name,
        price,
        weight,
        quantity
      )
    `,
    )
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("MY ORDERS ERROR:", error);
  }

  const safeOrders = orders ?? [];

  return (
    <main className="min-h-screen bg-[#F8F5EE] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}

        <div className="mb-8">
          <Link
            href="/cont"
            className="font-roboto text-sm font-medium text-gray-500 transition hover:text-mierealbastru"
          >
            ← Înapoi la cont
          </Link>

          <p className="mt-8 font-roboto text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
            Mierea Casei
          </p>

          <h1 className="mt-2 font-playfair text-3xl font-bold text-mierealbastru sm:text-4xl">
            Comenzile mele
          </h1>

          <p className="mt-2 font-roboto text-sm text-gray-500">
            Aici găsești comenzile plasate din contul tău.
          </p>
        </div>

        {/* FĂRĂ COMENZI */}

        {safeOrders.length === 0 ? (
          <div className="rounded-3xl border border-black/5 bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="font-playfair text-xl font-bold text-mierealbastru">
              Nu ai încă nicio comandă
            </h2>

            <p className="mx-auto mt-2 max-w-md font-roboto text-sm text-gray-500">
              Comenzile plasate după autentificarea cu Google vor apărea aici.
            </p>

            <Link
              href="/produse"
              className="mt-6 inline-flex rounded-xl bg-mierealbastru px-5 py-3 font-roboto text-sm font-bold text-white transition hover:opacity-90"
            >
              Vezi produsele
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {safeOrders.map((order) => {
              const status = statusLabels[order.status] || order.status;

              const statusClass =
                statusStyles[order.status] ||
                "border-gray-200 bg-gray-50 text-gray-600";

              const formattedDate = new Date(
                order.created_at,
              ).toLocaleDateString("ro-RO", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              });

              return (
                <div
                  key={order.id}
                  className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm"
                >
                  {/* ORDER HEADER */}

                  <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-roboto text-xs font-bold uppercase tracking-wide text-gray-400">
                        Comanda #{order.id}
                      </p>

                      <p className="mt-1 font-roboto text-sm text-gray-500">
                        {formattedDate}
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full border px-3 py-1.5 font-roboto text-xs font-bold ${statusClass}`}
                    >
                      {status}
                    </span>
                  </div>

                  {/* PRODUCTS */}

                  <div className="divide-y divide-gray-100 px-6">
                    {order.order_items?.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 py-4"
                      >
                        <div>
                          <p className="font-roboto text-sm font-semibold text-gray-800">
                            {item.product_name}
                          </p>

                          <p className="mt-1 font-roboto text-xs text-gray-400">
                            {item.weight} · {item.quantity} buc.
                          </p>
                        </div>

                        <p className="whitespace-nowrap font-roboto text-sm font-semibold text-gray-700">
                          {(Number(item.price) * Number(item.quantity)).toFixed(
                            2,
                          )}{" "}
                          lei
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* TOTAL */}

                  <div className="border-t border-gray-100 bg-[#FCFBF8] px-6 py-5">
                    <div className="flex items-center justify-between">
                      <span className="font-roboto text-sm text-gray-500">
                        Subtotal
                      </span>

                      <span className="font-roboto text-sm text-gray-700">
                        {Number(order.subtotal).toFixed(2)} lei
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-roboto text-sm text-gray-500">
                        Transport
                      </span>

                      <span className="font-roboto text-sm text-gray-700">
                        {Number(order.shipping_cost) === 0
                          ? "Gratuit"
                          : `${Number(order.shipping_cost).toFixed(2)} lei`}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                      <span className="font-roboto text-sm font-bold text-mierealbastru">
                        Total
                      </span>

                      <span className="font-playfair text-xl font-bold text-mierealbastru">
                        {Number(order.total).toFixed(2)} lei
                      </span>
                    </div>
                  </div>

                  {/* AWB */}

                  {order.awb && (
                    <div className="border-t border-gray-100 px-6 py-4">
                      <p className="font-roboto text-xs font-bold uppercase tracking-wide text-gray-400">
                        AWB
                      </p>

                      <p className="mt-1 font-roboto text-sm font-semibold text-mierealbastru">
                        {order.awb}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
