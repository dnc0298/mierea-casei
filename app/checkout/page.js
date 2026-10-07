"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  User,
  Truck,
} from "lucide-react";

import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { items, isLoaded, clearCart } = useCart();
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    county: "",
    city: "",
    address: "",
    paymentMethod: "ramburs",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(null);

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => {
      return total + Number(item.price) * Number(item.quantity);
    }, 0);
  }, [items]);

  const FREE_SHIPPING_THRESHOLD = 200;
  const SHIPPING_COST = 19.99;

  const shippingCost =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

  const total = subtotal + shippingCost;

  // Dacă cineva accesează direct /checkout fără produse,
  // îl trimitem înapoi la pagina de produse.
  useEffect(() => {
    if (!isLoaded) return;

    if (items.length === 0 && !orderSuccess) {
      router.replace("/produse");
    }
  }, [isLoaded, items.length, orderSuccess, router]);

  function handleChange(event) {
    const { name, value } = event.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  useEffect(() => {
    async function loadUserData() {
      if (sessionStatus !== "authenticated" || !session?.user?.id) {
        return;
      }

      try {
        const response = await fetch("/api/users/me");

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (!data.user) {
          return;
        }

        setCustomer((prev) => ({
          ...prev,
          name: data.user.name || "",
          email: data.user.email || "",
          phone: data.user.phone_number || "",
        }));
      } catch (error) {
        console.error("LOAD USER DATA ERROR:", error);
      }
    }

    loadUserData();
  }, [session, sessionStatus]);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer,
          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        console.error("RĂSPUNS API:", responseText);

        throw new Error(
          "Serverul a returnat un răspuns invalid. Verifică terminalul Next.js.",
        );
      }

      if (!response.ok) {
        throw new Error(data.error || "Comanda nu a putut fi trimisă.");
      }

      console.log("COMANDĂ CREATĂ:", data);

      // Golim coșul după ce comanda a fost salvată cu succes.
      clearCart();

      // Salvăm informațiile pentru modalul de succes.
      setOrderSuccess({
        orderId: data.orderId,
        total: data.total,
      });
    } catch (error) {
      console.error("CHECKOUT ERROR:", error);

      setError(
        error.message || "A apărut o eroare. Te rugăm să încerci din nou.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // Așteptăm încărcarea coșului din localStorage.
  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F5EE] font-roboto">
        <div className="text-sm text-gray-500">Se încarcă...</div>
      </main>
    );
  }

  // În timpul redirectului nu afișăm checkout-ul gol.
  if (items.length === 0 && !orderSuccess) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#F8F5EE] font-roboto">
      {/* =====================================================
          MODAL COMANDĂ FINALIZATĂ
      ====================================================== */}

      {orderSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-[2rem] bg-white p-6 sm:p-8">
            {/* ICON SUCCES */}

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-500 text-white">
                <Check className="h-6 w-6" />
              </div>
            </div>

            {/* TITLU */}

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
              Comandă finalizată
            </p>

            <h2 className="mt-2 font-playfair text-3xl font-bold text-mierealbastru">
              Vă mulțumim pentru comandă!
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              Comanda dumneavoastră a fost înregistrată cu succes și va fi
              pregătită pentru livrare.
            </p>

            {/* DETALII COMANDĂ */}

            <div className="mt-6 rounded-2xl bg-[#F8F5EE] px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Număr comandă</span>

                <span className="font-bold text-mierealbastru">
                  #{orderSuccess.orderId}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-gray-500">Total comandă</span>

                <span className="font-bold text-mierealbastru">
                  {Number(orderSuccess.total).toFixed(2)} lei
                </span>
              </div>
            </div>

            <p className="mt-5 text-xs leading-5 text-gray-400">
              Vă mulțumim că ați ales Mierea Casei.
            </p>

            {/* BUTON ÎNAPOI LA PRODUSE */}

            <button
              type="button"
              onClick={() => router.push("/produse")}
              className="mt-7 flex h-12 w-full items-center justify-center rounded-full bg-mierealbastru px-5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#1F3967]"
            >
              Înapoi la produse
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/cos"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-500 transition-colors hover:text-mierealbastru"
          >
            <ArrowLeft className="h-4 w-4" />
            Înapoi la coș
          </Link>

          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
              Finalizare comandă
            </p>

            <h1 className="mt-2 font-playfair text-3xl font-bold text-mierealbastru sm:text-4xl lg:text-5xl">
              Finalizează comanda
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
              Completează datele de mai jos pentru a finaliza comanda.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <form
          onSubmit={handleSubmit}
          className="grid gap-6 lg:grid-cols-[1fr_400px]"
        >
          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="space-y-6">
            {/* DATE PERSONALE */}

            <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F8F5EE] text-mierealbastru">
                  <User className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-playfair text-xl font-bold text-mierealbastru">
                    Date personale
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Datele necesare pentru procesarea comenzii.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <InputField
                  label="Nume și prenume"
                  name="name"
                  value={customer.name}
                  onChange={handleChange}
                  placeholder="Nume și prenume"
                  icon={User}
                  required
                />

                <InputField
                  label="Telefon"
                  name="phone"
                  type="tel"
                  value={customer.phone}
                  onChange={handleChange}
                  placeholder="07xx xxx xxx"
                  icon={Phone}
                  required
                />

                <div className="sm:col-span-2">
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={customer.email}
                    onChange={handleChange}
                    placeholder="exemplu@email.com"
                    icon={Mail}
                    required
                  />
                </div>
              </div>
            </div>

            {/* ADRESA */}

            <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F8F5EE] text-mierealbastru">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-playfair text-xl font-bold text-mierealbastru">
                    Adresa de livrare
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Unde dorești să primești comanda?
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <InputField
                  label="Județ"
                  name="county"
                  value={customer.county}
                  onChange={handleChange}
                  placeholder="Ex. Vrancea"
                  required
                />

                <InputField
                  label="Localitate"
                  name="city"
                  value={customer.city}
                  onChange={handleChange}
                  placeholder="Ex. Focșani"
                  required
                />

                <div className="sm:col-span-2">
                  <InputField
                    label="Adresă"
                    name="address"
                    value={customer.address}
                    onChange={handleChange}
                    placeholder="Stradă, număr, bloc, apartament..."
                    required
                  />
                </div>
              </div>
            </div>

            {/* PLATA */}

            <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F8F5EE] text-mierealbastru">
                  <CreditCard className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-playfair text-xl font-bold text-mierealbastru">
                    Metoda de plată
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Alege metoda de plată pentru comandă.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-colors ${
                    customer.paymentMethod === "ramburs"
                      ? "border-amber-500 bg-amber-50/60"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ramburs"
                    checked={customer.paymentMethod === "ramburs"}
                    onChange={handleChange}
                    className="h-4 w-4 accent-amber-500"
                  />

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F8F5EE] text-mierealbastru">
                    <Truck className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">
                      Plata la livrare
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Plătești curierului la primirea coletului.
                    </p>
                  </div>

                  {customer.paymentMethod === "ramburs" && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT COLUMN - SUMAR
          ================================================= */}

          <aside className="lg:sticky lg:top-[104px] lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
                <h2 className="font-playfair text-xl font-bold text-mierealbastru">
                  Sumar comandă
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {items.length} {items.length === 1 ? "produs" : "produse"} în
                  coș
                </p>
              </div>

              {/* PRODUSE */}

              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 px-5 py-4 sm:px-6">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[#F8F5EE]">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-contain p-2"
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-bold text-gray-800">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        {item.weight}
                      </p>

                      <div className="mt-2 flex items-center justify-between gap-3">
                        <span className="text-xs text-gray-500">
                          Cantitate: {item.quantity}
                        </span>

                        <span className="text-sm font-bold text-mierealbastru">
                          {(Number(item.price) * Number(item.quantity)).toFixed(
                            2,
                          )}{" "}
                          lei
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* TOTALURI */}

              <div className="border-t border-gray-100 px-5 py-5 sm:px-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>

                  <span className="font-medium text-gray-800">
                    {subtotal.toFixed(2)} lei
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-gray-500">Livrare</span>

                  <span className="font-medium text-gray-800">
                    {shippingCost.toFixed(2)} lei
                  </span>
                </div>

                <div className="my-5 border-t border-dashed border-gray-200" />

                <div className="flex items-end justify-between">
                  <span className="text-sm font-bold text-gray-700">Total</span>

                  <span className="font-playfair text-2xl font-bold text-mierealbastru">
                    {total.toFixed(2)} lei
                  </span>
                </div>

                {/* EROARE */}

                {error && (
                  <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {/* BUTON COMANDĂ */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-mierealbastru px-5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#1F3967] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Check className="h-4 w-4" />

                  {isSubmitting ? "Se procesează..." : "Finalizează comanda"}
                </button>

                <p className="mt-4 text-center text-[11px] leading-5 text-gray-400">
                  Prin finalizarea comenzii confirmi că datele introduse sunt
                  corecte.
                </p>
              </div>
            </div>
          </aside>
        </form>
      </section>
    </main>
  );
}

/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-600"
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`h-12 w-full rounded-2xl border border-gray-200 bg-[#FCFBF8] text-sm text-gray-800 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 ${
            Icon ? "pl-11 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}
