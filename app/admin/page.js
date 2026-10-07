import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY,
  );

  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      created_at,
      customer_name,
      email,
      total,
      status,
      order_items (
        id,
        product_name,
        quantity
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("ADMIN ORDERS ERROR:", error);
  }

  const allOrders = orders || [];

  const totalOrders = allOrders.length;

  const pendingOrders = allOrders.filter(
    (order) => order.status === "pending",
  ).length;

  const shippedOrders = allOrders.filter(
    (order) => order.status === "shipped",
  ).length;

  const totalSales = allOrders.reduce(
    (total, order) => total + Number(order.total || 0),
    0,
  );

  const recentOrders = allOrders.slice(0, 6);

  function formatDate(date) {
    return new Date(date).toLocaleDateString("ro-RO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  function formatPrice(price) {
    return `${Number(price).toFixed(2)} lei`;
  }

  function getStatusLabel(status) {
    const statuses = {
      pending: "În așteptare",
      processing: "În procesare",
      shipped: "Expediată",
      completed: "Finalizată",
      cancelled: "Anulată",
    };

    return statuses[status] || status;
  }

  function getStatusClass(status) {
    const statuses = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      processing: "bg-blue-50 text-blue-700 border-blue-200",
      shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
      completed: "bg-gray-100 text-gray-700 border-gray-200",
      cancelled: "bg-red-50 text-red-700 border-red-200",
    };

    return statuses[status] || "bg-gray-50 text-gray-600 border-gray-200";
  }

  return (
    <main className="min-h-screen bg-[#F8F5EE] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 font-roboto text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
              Mierea Casei
            </p>

            <h1 className="font-playfair text-3xl font-bold text-mierealbastru sm:text-4xl">
              Dashboard
            </h1>

            <p className="mt-2 font-roboto text-sm text-gray-500">
              Gestionează comenzile și activitatea magazinului.
            </p>
          </div>

          <Link
            href="/admin/comenzi"
            className="inline-flex items-center justify-center rounded-xl bg-mierealbastru px-5 py-3 font-roboto text-sm font-bold text-white transition hover:bg-[#1F3967]"
          >
            Vezi toate comenzile →
          </Link>
        </div>

        {/* STATISTICS */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* TOTAL COMENZI */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <p className="font-roboto text-xs font-medium uppercase tracking-wide text-gray-400">
              Total comenzi
            </p>

            <p className="mt-3 font-playfair text-3xl font-bold text-mierealbastru">
              {totalOrders}
            </p>

            <p className="mt-2 font-roboto text-xs text-gray-400">
              Toate comenzile magazinului
            </p>
          </div>

          {/* PENDING */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <p className="font-roboto text-xs font-medium uppercase tracking-wide text-gray-400">
              În așteptare
            </p>

            <p className="mt-3 font-playfair text-3xl font-bold text-mierealbastru">
              {pendingOrders}
            </p>

            <p className="mt-2 font-roboto text-xs text-gray-400">
              Comenzi care necesită atenție
            </p>
          </div>

          {/* SHIPPED */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <p className="font-roboto text-xs font-medium uppercase tracking-wide text-gray-400">
              Expediate
            </p>

            <p className="mt-3 font-playfair text-3xl font-bold text-mierealbastru">
              {shippedOrders}
            </p>

            <p className="mt-2 font-roboto text-xs text-gray-400">
              Comenzi trimise către clienți
            </p>
          </div>

          {/* SALES */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <p className="font-roboto text-xs font-medium uppercase tracking-wide text-gray-400">
              Vânzări totale
            </p>

            <p className="mt-3 font-playfair text-3xl font-bold text-mierealbastru">
              {formatPrice(totalSales)}
            </p>

            <p className="mt-2 font-roboto text-xs text-gray-400">
              Valoarea tuturor comenzilor
            </p>
          </div>
        </div>

        {/* RECENT ORDERS */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
          {/* SECTION HEADER */}
          <div className="flex flex-col gap-4 border-b border-gray-100 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-playfair text-xl font-bold text-mierealbastru">
                Comenzi recente
              </h2>

              <p className="mt-1 font-roboto text-sm text-gray-500">
                Ultimele comenzi primite în magazin.
              </p>
            </div>

            <Link
              href="/admin/comenzi"
              className="font-roboto text-sm font-bold text-mierealbastru transition hover:text-amber-600"
            >
              Vezi toate →
            </Link>
          </div>

          {/* EMPTY STATE */}
          {recentOrders.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="font-playfair text-lg font-bold text-mierealbastru">
                Nu există încă comenzi
              </p>

              <p className="mt-2 font-roboto text-sm text-gray-400">
                Comenzile plasate de clienți vor apărea aici.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#FCFBF8]">
                    <th className="px-6 py-4 text-left font-roboto text-[11px] font-bold uppercase tracking-wide text-gray-400">
                      Comandă
                    </th>

                    <th className="px-6 py-4 text-left font-roboto text-[11px] font-bold uppercase tracking-wide text-gray-400">
                      Client
                    </th>

                    <th className="px-6 py-4 text-left font-roboto text-[11px] font-bold uppercase tracking-wide text-gray-400">
                      Data
                    </th>

                    <th className="px-6 py-4 text-left font-roboto text-[11px] font-bold uppercase tracking-wide text-gray-400">
                      Produse
                    </th>

                    <th className="px-6 py-4 text-left font-roboto text-[11px] font-bold uppercase tracking-wide text-gray-400">
                      Total
                    </th>

                    <th className="px-6 py-4 text-left font-roboto text-[11px] font-bold uppercase tracking-wide text-gray-400">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right font-roboto text-[11px] font-bold uppercase tracking-wide text-gray-400">
                      Acțiuni
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => {
                    const productsCount = (order.order_items || []).reduce(
                      (total, item) => total + Number(item.quantity || 0),
                      0,
                    );

                    return (
                      <tr
                        key={order.id}
                        className="border-b border-gray-100 last:border-b-0 transition hover:bg-[#FCFBF8]"
                      >
                        {/* ORDER */}
                        <td className="px-6 py-5">
                          <span className="font-roboto text-sm font-bold text-mierealbastru">
                            #{order.id}
                          </span>
                        </td>

                        {/* CUSTOMER */}
                        <td className="px-6 py-5">
                          <div>
                            <p className="font-roboto text-sm font-semibold text-gray-800">
                              {order.customer_name}
                            </p>

                            <p className="mt-1 font-roboto text-xs text-gray-400">
                              {order.email}
                            </p>
                          </div>
                        </td>

                        {/* DATE */}
                        <td className="px-6 py-5">
                          <span className="font-roboto text-sm text-gray-600">
                            {formatDate(order.created_at)}
                          </span>
                        </td>

                        {/* PRODUCTS */}
                        <td className="px-6 py-5">
                          <span className="font-roboto text-sm text-gray-600">
                            {productsCount}{" "}
                            {productsCount === 1 ? "produs" : "produse"}
                          </span>
                        </td>

                        {/* TOTAL */}
                        <td className="px-6 py-5">
                          <span className="font-roboto text-sm font-bold text-mierealbastru">
                            {formatPrice(order.total)}
                          </span>
                        </td>

                        {/* STATUS */}
                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex whitespace-nowrap rounded-full border px-3 py-1.5 font-roboto text-[11px] font-bold ${getStatusClass(
                              order.status,
                            )}`}
                          >
                            {getStatusLabel(order.status)}
                          </span>
                        </td>

                        {/* ACTION */}
                        <td className="px-6 py-5 text-right">
                          <Link
                            href={`/admin/comenzi/${order.id}`}
                            className="inline-flex whitespace-nowrap rounded-xl bg-mierealbastru px-4 py-2.5 font-roboto text-[11px] font-bold text-white transition hover:bg-[#1F3967] hover:shadow-md"
                          >
                            Vezi comanda →
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
