import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { notFound } from "next/navigation";

import StatusSelect from "./status";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
);

export default async function OrderDetailsPage({ params }) {
  const { idComanda } = await params;

  const orderId = Number(idComanda);

  if (!Number.isInteger(orderId)) {
    notFound();
  }

  const { data: order, error } = await supabase
    .from("orders")
    .select(
      `
  id,
  created_at,
  user_id,
  customer_name,
  email,
  phone,
  county,
  city,
  address,
  payment_method,
  subtotal,
  shipping_cost,
  total,
  status,
  awb,
  order_items (
    id,
    product_id,
    product_name,
    price,
    weight,
    quantity
  )
  `,
    )
    .eq("id", orderId)
    .single();

  if (error || !order) {
    notFound();
  }

  const formattedDate = new Date(order.created_at).toLocaleDateString("ro-RO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formattedTime = new Date(order.created_at).toLocaleTimeString("ro-RO", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="min-h-screen bg-[#F8F5EE] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        {/* HEADER */}
        <div className="mb-8">
          <Link
            href="/admin/comenzi"
            className="inline-flex items-center font-roboto text-sm font-medium text-gray-500 transition hover:text-mierealbastru"
          >
            ← Înapoi la comenzi
          </Link>

          <div className="mt-6">
            <p className="mb-2 font-roboto text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
              Detalii comandă
            </p>

            <h1 className="font-playfair text-3xl font-bold text-mierealbastru sm:text-4xl">
              Comanda #{order.id}
            </h1>

            <p className="mt-2 font-roboto text-sm text-gray-500">
              {formattedDate} · {formattedTime}
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* PRODUSE */}
            <section className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-6 py-5">
                <h2 className="font-playfair text-xl font-bold text-mierealbastru">
                  Produse comandate
                </h2>
              </div>

              <div className="divide-y divide-gray-100">
                {order.order_items?.map((item) => {
                  const itemTotal = Number(item.price) * Number(item.quantity);

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 px-6 py-5"
                    >
                      <div className="min-w-0">
                        <h3 className="font-roboto text-sm font-semibold text-gray-800">
                          {item.product_name}
                        </h3>

                        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 font-roboto text-xs text-gray-400">
                          <span>{item.weight}</span>

                          <span>
                            {Number(item.price).toFixed(2)} lei / buc.
                          </span>

                          <span>Cantitate: {item.quantity}</span>
                        </div>
                      </div>

                      <p className="shrink-0 font-roboto text-sm font-bold text-mierealbastru">
                        {itemTotal.toFixed(2)} lei
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* CLIENT */}
            <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
              <h2 className="font-playfair text-xl font-bold text-mierealbastru">
                Date client
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <InfoItem label="Nume" value={order.customer_name} />

                <InfoItem label="Email" value={order.email} />

                <InfoItem label="Telefon" value={order.phone} />

                <InfoItem label="Județ" value={order.county} />

                <InfoItem label="Localitate" value={order.city} />

                <InfoItem label="Adresă" value={order.address} full />
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <aside className="space-y-6">
            {/* SUMAR */}
            <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
              <h2 className="font-playfair text-xl font-bold text-mierealbastru">
                Sumar comandă
              </h2>

              <div className="mt-6 space-y-4">
                <SummaryRow
                  label="Subtotal"
                  value={`${Number(order.subtotal).toFixed(2)} lei`}
                />

                <SummaryRow
                  label="Transport"
                  value={
                    Number(order.shipping_cost) === 0
                      ? "Gratuit"
                      : `${Number(order.shipping_cost).toFixed(2)} lei`
                  }
                />

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-end justify-between gap-4">
                    <span className="font-roboto text-sm font-bold text-gray-700">
                      Total
                    </span>

                    <span className="font-playfair text-2xl font-bold text-mierealbastru">
                      {Number(order.total).toFixed(2)} lei
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* PLATA */}
            <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
              <h2 className="font-playfair text-xl font-bold text-mierealbastru">
                Plata
              </h2>

              <div className="mt-5 rounded-2xl bg-[#FCFBF8] p-4">
                <p className="font-roboto text-xs font-bold uppercase tracking-wide text-gray-400">
                  Metodă de plată
                </p>

                <p className="mt-2 font-roboto text-sm font-semibold capitalize text-gray-800">
                  {order.payment_method}
                </p>
              </div>
            </section>

            {/* STATUS */}
            <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h2 className="font-playfair text-xl font-bold text-mierealbastru">
                  Status comandă
                </h2>

                <p className="mt-1 font-roboto text-sm text-gray-500">
                  Actualizează starea comenzii.
                </p>
              </div>

              <StatusSelect
                orderId={order.id}
                initialStatus={order.status}
                initialAwb={order.awb}
              />
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

function InfoItem({ label, value, full = false }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <p className="font-roboto text-[10px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="mt-1.5 break-words font-roboto text-sm text-gray-800">
        {value || "—"}
      </p>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-roboto text-sm text-gray-500">{label}</span>

      <span className="font-roboto text-sm font-semibold text-gray-800">
        {value}
      </span>
    </div>
  );
}
