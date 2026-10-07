"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const statuses = [
  {
    value: "all",
    label: "Toate",
  },
  {
    value: "pending",
    label: "În așteptare",
  },
  {
    value: "processing",
    label: "În procesare",
  },
  {
    value: "shipped",
    label: "Expediate",
  },
  {
    value: "completed",
    label: "Finalizate",
  },
  {
    value: "cancelled",
    label: "Anulate",
  },
];

export default function Orderstable({ orders, page, totalPages }) {
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");

  const filteredOrders = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus =
        activeStatus === "all" || order.status === activeStatus;

      if (!matchesStatus) {
        return false;
      }

      if (!searchValue) {
        return true;
      }

      const orderId = String(order.id).toLowerCase();
      const customerName = order.customer_name?.toLowerCase() || "";
      const email = order.email?.toLowerCase() || "";

      return (
        orderId.includes(searchValue) ||
        customerName.includes(searchValue) ||
        email.includes(searchValue)
      );
    });
  }, [orders, search, activeStatus]);

  return (
    <>
      {/* FILTRARE */}

      <div className="border-b border-gray-100 px-6 py-5">
        <div className="flex flex-col gap-4">
          {/* SEARCH */}

          <div className="relative">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Caută după nume, email sau număr comandă..."
              className="w-full rounded-xl border border-gray-200 bg-[#FCFBF8] py-3 pl-11 pr-4 font-roboto text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-mierealbastru focus:bg-white focus:ring-2 focus:ring-mierealbastru/10"
            />
          </div>

          {/* STATUS FILTERS */}

          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => {
              const isActive = activeStatus === status.value;

              return (
                <button
                  key={status.value}
                  type="button"
                  onClick={() => setActiveStatus(status.value)}
                  className={`rounded-xl border px-4 py-2.5 font-roboto text-xs font-bold transition ${
                    isActive
                      ? "border-mierealbastru bg-mierealbastru text-white"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-mierealbastru"
                  }`}
                >
                  {status.label}
                </button>
              );
            })}
          </div>

          {/* RESULTS COUNT */}

          {(search || activeStatus !== "all") && (
            <div className="flex items-center justify-between">
              <p className="font-roboto text-xs text-gray-400">
                {filteredOrders.length}{" "}
                {filteredOrders.length === 1
                  ? "comandă găsită"
                  : "comenzi găsite"}
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveStatus("all");
                }}
                className="font-roboto text-xs font-bold text-mierealbastru transition hover:text-amber-600"
              >
                Resetează filtrele
              </button>
            </div>
          )}
        </div>
      </div>

      {/* TABEL */}

      {filteredOrders.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <p className="font-playfair text-lg font-bold text-mierealbastru">
            Nu am găsit nicio comandă
          </p>

          <p className="mt-2 font-roboto text-sm text-gray-400">
            Încearcă o altă căutare sau modifică filtrul.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead>
              <tr className="border-b border-gray-100 bg-[#FCFBF8] text-left">
                <TableHeader>Comandă</TableHeader>
                <TableHeader>Client</TableHeader>
                <TableHeader>Data</TableHeader>
                <TableHeader>Produse</TableHeader>
                <TableHeader>Plată</TableHeader>
                <TableHeader>Total</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Acțiuni</TableHeader>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => {
                const productCount =
                  order.order_items?.reduce(
                    (sum, item) => sum + Number(item.quantity),
                    0,
                  ) ?? 0;

                const formattedDate = new Date(
                  order.created_at,
                ).toLocaleDateString("ro-RO", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });

                const formattedTime = new Date(
                  order.created_at,
                ).toLocaleTimeString("ro-RO", {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <tr
                    key={order.id}
                    className="border-b border-gray-100 transition last:border-0 hover:bg-[#FCFBF8]"
                  >
                    {/* ID */}

                    <td className="px-6 py-5">
                      <span className="font-roboto text-sm font-bold text-mierealbastru">
                        #{order.id}
                      </span>
                    </td>

                    {/* CLIENT */}

                    <td className="px-6 py-5">
                      <p className="font-roboto text-sm font-semibold text-gray-800">
                        {order.customer_name}
                      </p>

                      <p className="mt-1 max-w-[180px] truncate font-roboto text-xs text-gray-400">
                        {order.email}
                      </p>
                    </td>

                    {/* DATA */}

                    <td className="px-6 py-5">
                      <p className="font-roboto text-xs font-medium text-gray-700">
                        {formattedDate}
                      </p>

                      <p className="mt-1 font-roboto text-[11px] text-gray-400">
                        {formattedTime}
                      </p>
                    </td>

                    {/* PRODUSE */}

                    <td className="px-6 py-5">
                      <span className="font-roboto text-sm text-gray-700">
                        {productCount}{" "}
                        {productCount === 1 ? "produs" : "produse"}
                      </span>
                    </td>

                    {/* PLATA */}

                    <td className="px-6 py-5">
                      <span className="font-roboto text-xs font-medium capitalize text-gray-700">
                        {order.payment_method === "ramburs"
                          ? "Ramburs"
                          : order.payment_method}
                      </span>
                    </td>

                    {/* TOTAL */}

                    <td className="px-6 py-5">
                      <span className="whitespace-nowrap font-roboto text-sm font-bold text-mierealbastru">
                        {Number(order.total).toFixed(2)} lei
                      </span>
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-5">
                      <StatusBadge status={order.status} />
                    </td>

                    {/* ACTIUNI */}

                    <td className="px-6 py-5">
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

      {/* PAGINARE */}

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-5">
          <p className="font-roboto text-xs text-gray-400">
            Pagina {page} din {totalPages}
          </p>

          <div className="flex items-center gap-2">
            {page > 1 ? (
              <Link
                href={`/admin/comenzi?page=${page - 1}`}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 font-roboto text-xs font-bold text-mierealbastru transition hover:border-gray-300 hover:bg-gray-50"
              >
                ← Anterioară
              </Link>
            ) : (
              <span className="cursor-not-allowed rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 font-roboto text-xs font-bold text-gray-300">
                ← Anterioară
              </span>
            )}

            <span className="rounded-xl bg-mierealbastru px-4 py-2.5 font-roboto text-xs font-bold text-white">
              {page}
            </span>

            {page < totalPages ? (
              <Link
                href={`/admin/comenzi?page=${page + 1}`}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 font-roboto text-xs font-bold text-mierealbastru transition hover:border-gray-300 hover:bg-gray-50"
              >
                Următoarea →
              </Link>
            ) : (
              <span className="cursor-not-allowed rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 font-roboto text-xs font-bold text-gray-300">
                Următoarea →
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function TableHeader({ children }) {
  return (
    <th className="px-6 py-4 font-roboto text-[10px] font-bold uppercase tracking-wider text-gray-400">
      {children}
    </th>
  );
}

function StatusBadge({ status }) {
  const labels = {
    pending: "În așteptare",
    processing: "În procesare",
    shipped: "Expediată",
    completed: "Finalizată",
    cancelled: "Anulată",
  };

  const styles = {
    pending: "bg-amber-100 text-amber-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    completed: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 font-roboto text-[10px] font-bold uppercase tracking-wide ${
        styles[status] ?? "bg-gray-100 text-gray-600"
      }`}
    >
      {labels[status] ?? status}
    </span>
  );
}
