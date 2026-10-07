"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Page() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  // Se incarca sesiunea
  if (status === "loading") {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <p className="text-gray-500 font-lato">Se incarca...</p>
      </main>
    );
  }

  // User logat — aratam profilul
  if (session) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col items-center text-center">
            {session.user.image && (
              <img
                src={session.user.image}
                alt={session.user.name}
                className="w-24 h-24 rounded-full border-4 border-mierealbastru shadow-md"
              />
            )}

            <h1 className="mt-4 text-2xl font-bold font-averia text-gray-900">
              Salut, {session.user.name}!
            </h1>

            <p className="mt-1 text-sm text-gray-500 font-lato">
              {session.user.email}
            </p>

            <div className="mt-8 w-full space-y-3">
              <a
                href="/cont"
                className="block w-full text-center rounded-lg bg-mierealbastru px-4 py-3 font-semibold text-white transition hover:opacity-90"
              >
                Contul meu
              </a>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Deconectare
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // User nelogat — aratam butonul de Google
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-averia text-gray-900">
            Bine ai venit!
          </h1>
          <p className="mt-2 text-sm text-gray-500 font-lato">
            Intra in cont pentru a continua
          </p>
        </div>

        <button
          onClick={() => {
            setLoading(true);

            signIn("google", {
              callbackUrl: "/",
              prompt: "select_account",
            });
          }}
          disabled={loading}
          className="mt-8 w-full flex items-center justify-center gap-3 rounded-lg border-2 border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* Logo Google oficial (SVG) */}
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>

          {loading ? "Se conecteaza..." : "Continua cu Google"}
        </button>

        <p className="mt-6 text-center text-xs text-gray-400 font-lato">
          Prin continuare, esti de acord cu termenii si conditiile noastre.
        </p>
      </div>
    </main>
  );
}
