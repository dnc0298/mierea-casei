"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AccountPage() {
  const { data: session, status } = useSession();

  const loading = status === "loading";
  const isLoggedIn = !!session?.user;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F5EE] px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="h-8 w-40 animate-pulse rounded-lg bg-black/5" />
          <div className="mt-8 h-72 animate-pulse rounded-3xl bg-white" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5EE] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}
        <div className="mb-8">
          <p className="font-roboto text-xs font-bold uppercase tracking-[0.18em] text-amber-600">
            Contul meu
          </p>

          <h1 className="mt-2 font-playfair text-3xl font-semibold text-mierealbastru sm:text-4xl">
            {isLoggedIn ? "Bun venit!" : "Contul tău"}
          </h1>

          <p className="mt-2 max-w-xl font-roboto text-sm leading-6 text-gray-500">
            {isLoggedIn
              ? "Gestionează datele contului și urmărește comenzile tale."
              : "Conectează-te pentru a avea acces rapid la comenzile și datele tale."}
          </p>
        </div>

        {!isLoggedIn ? <GuestAccount /> : <LoggedInAccount session={session} />}
      </div>
    </main>
  );
}

function GuestAccount() {
  return (
    <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
      <div className="grid lg:grid-cols-[1fr_0.8fr]">
        {/* LEFT */}
        <div className="p-7 sm:p-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8F5EE]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-7 w-7 text-mierealbastru"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M20 21a8 8 0 0 0-16 0" strokeLinecap="round" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          <h2 className="mt-6 font-playfair text-2xl font-semibold text-mierealbastru">
            Conectează-te cu Google
          </h2>

          <p className="mt-3 max-w-md font-roboto text-sm leading-6 text-gray-500">
            Folosește contul tău Google pentru a te conecta rapid și sigur. Nu
            trebuie să creezi sau să memorezi o parolă.
          </p>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/cont" })}
            className="mt-7 flex w-full max-w-md items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3.5 font-roboto text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.99]"
          >
            <GoogleIcon />
            Continuă cu Google
          </button>

          <p className="mt-4 max-w-md text-center font-roboto text-xs leading-5 text-gray-400">
            Te poți conecta doar dacă dorești. Comenzile pot fi plasate și fără
            cont.
          </p>
        </div>

        {/* RIGHT */}
        <div className="border-t border-black/5 bg-[#FCFBF8] p-7 lg:border-l lg:border-t-0 sm:p-10">
          <p className="font-roboto text-xs font-bold uppercase tracking-wider text-gray-400">
            Avantajele contului
          </p>

          <div className="mt-6 space-y-5">
            <Feature
              title="Comenzile tale"
              text="Vezi comenzile asociate contului tău într-un singur loc."
            />

            <Feature
              title="Date salvate"
              text="Accesează mai ușor informațiile asociate contului."
            />

            <Feature
              title="Conectare rapidă"
              text="Fără parole suplimentare. Folosești contul Google."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function LoggedInAccount({ session }) {
  const user = session.user;

  return (
    <div className="space-y-5">
      {/* PROFILE */}
      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {user.image ? (
              <img
                src={user.image}
                alt=""
                className="h-16 w-16 rounded-full object-cover ring-4 ring-[#F8F5EE]"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F5EE] font-playfair text-2xl text-mierealbastru">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}

            <div>
              <p className="font-roboto text-xs font-bold uppercase tracking-wider text-gray-400">
                Cont Google
              </p>

              <h2 className="mt-1 font-playfair text-2xl font-semibold text-mierealbastru">
                {user.name || "Utilizator"}
              </h2>

              <p className="mt-1 font-roboto text-sm text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-xl border border-gray-200 px-5 py-3 font-roboto text-sm font-bold text-gray-600 transition hover:bg-gray-50"
          >
            Deconectare
          </button>
        </div>
      </section>

      {/* MENU */}
      <section className="grid gap-5 sm:grid-cols-2">
        <AccountCard
          href="/cont/comenzi"
          title="Comenzile mele"
          description="Vezi comenzile plasate din contul tău."
          icon={<OrdersIcon />}
        />

        <AccountCard
          href="/cont/date"
          title="Datele mele"
          description="Gestionează informațiile asociate contului."
          icon={<UserIcon />}
        />
      </section>

      {/* GUEST CHECKOUT MESSAGE */}
      <div className="rounded-2xl border border-amber-200/70 bg-amber-50/40 px-5 py-4">
        <p className="font-roboto text-sm leading-6 text-gray-600">
          <span className="font-bold text-mierealbastru">
            Poți comanda și fără cont.
          </span>{" "}
          Autentificarea este opțională și este folosită doar pentru funcțiile
          contului.
        </p>
      </div>
    </div>
  );
}

function Feature({ title, text }) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-amber-600 shadow-sm">
        <CheckIcon />
      </div>

      <div>
        <h3 className="font-roboto text-sm font-bold text-mierealbastru">
          {title}
        </h3>

        <p className="mt-1 font-roboto text-xs leading-5 text-gray-500">
          {text}
        </p>
      </div>
    </div>
  );
}

function AccountCard({ href, title, description, icon }) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8F5EE] text-mierealbastru transition group-hover:bg-amber-50">
        {icon}
      </div>

      <h3 className="mt-5 font-playfair text-xl font-semibold text-mierealbastru">
        {title}
      </h3>

      <p className="mt-2 font-roboto text-sm leading-6 text-gray-500">
        {description}
      </p>

      <div className="mt-5 flex items-center gap-2 font-roboto text-xs font-bold text-amber-600">
        Vezi mai mult
        <span className="transition group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="#4285F4"
        d="M21.35 12.23c0-.79-.07-1.55-.22-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
      />
      <path
        fill="#34A853"
        d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5Z"
      />
      <path
        fill="#FBBC05"
        d="M6.54 13.6A5.86 5.86 0 0 1 6.23 12c0-.56.1-1.1.31-1.6V7.87H3.3A9.5 9.5 0 0 0 2.25 12c0 1.49.36 2.9 1.05 4.13l3.24-2.53Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.37c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.46 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.37l3.24 2.53C7.31 8.09 9.46 6.37 12 6.37Z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OrdersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M4 7h16v13H4z" />
      <path d="M8 7V5a4 4 0 0 1 8 0v2" />
      <path d="M8 11h8" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" strokeLinecap="round" />
    </svg>
  );
}
