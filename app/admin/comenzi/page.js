import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

import Orderstable from "./Orderstable";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
);

export default async function AdminOrdersPage({ searchParams }) {
  const params = await searchParams;

  const page = Math.max(Number(params?.page) || 1, 1);

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const {
    data: orders,
    error,
    count,
  } = await supabase
    .from("orders")
    .select(
      `
      id,
      created_at,
      customer_name,
      email,
      payment_method,
      total,
      status,
      order_items (
        quantity
      )
    `,
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("ADMIN ORDERS ERROR:", error);

    return (
      <main className="min-h-screen bg-[#F8F5EE] px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm">
            <h1 className="font-playfair text-2xl font-bold text-mierealbastru">
              Comenzi
            </h1>

            <p className="mt-3 font-roboto text-sm text-red-600">
              Comenzile nu au putut fi încărcate.
            </p>

            <p className="mt-1 font-roboto text-xs text-gray-500">
              {error.message}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const totalOrders = count ?? 0;

  // IMPORTANT:
  // Aceste statistici sunt calculate doar din comenzile încărcate
  // pe pagina curentă. Le vom muta ulterior în DB.
  const pendingOrders =
    orders?.filter((order) => order.status === "pending").length ?? 0;

  const totalValue = (orders ?? []).reduce(
    (sum, order) => sum + Number(order.total || 0),
    0,
  );

  const totalPages = Math.max(Math.ceil(totalOrders / PAGE_SIZE), 1);

  return (
    <main className="min-h-screen bg-[#F8F5EE] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 font-roboto text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
              Mierea Casei
            </p>

            <h1 className="font-playfair text-3xl font-bold text-mierealbastru sm:text-4xl">
              Comenzi
            </h1>

            <p className="mt-2 font-roboto text-sm text-gray-500">
              Gestionează comenzile primite din magazin.
            </p>
          </div>

          <Link
            href="/admin"
            className="inline-flex w-fit items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 font-roboto text-xs font-bold text-mierealbastru transition hover:border-gray-300 hover:bg-gray-50"
          >
            ← Dashboard
          </Link>
        </div>

        {/* STATISTICI */}

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          {/* TOTAL COMENZI */}

          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <p className="font-roboto text-xs font-bold uppercase tracking-wide text-gray-400">
              Total comenzi
            </p>

            <p className="mt-2 font-playfair text-3xl font-bold text-mierealbastru">
              {totalOrders}
            </p>
          </div>

          {/* PENDING */}

          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <p className="font-roboto text-xs font-bold uppercase tracking-wide text-gray-400">
              În așteptare
            </p>

            <p className="mt-2 font-playfair text-3xl font-bold text-mierealbastru">
              {pendingOrders}
            </p>
          </div>

          {/* VALOARE */}

          <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <p className="font-roboto text-xs font-bold uppercase tracking-wide text-gray-400">
              Valoare totală
            </p>

            <p className="mt-2 font-playfair text-3xl font-bold text-mierealbastru">
              {totalValue.toFixed(2)} lei
            </p>
          </div>
        </div>

        {/* COMENZI */}

        <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="font-playfair text-xl font-bold text-mierealbastru">
              Toate comenzile
            </h2>

            <p className="mt-1 font-roboto text-xs text-gray-400">
              {totalOrders}{" "}
              {totalOrders === 1
                ? "comandă înregistrată"
                : "comenzi înregistrate"}
            </p>
          </div>

          <Orderstable
            orders={orders ?? []}
            page={page}
            totalPages={totalPages}
          />
        </div>
      </div>
    </main>
  );
}
