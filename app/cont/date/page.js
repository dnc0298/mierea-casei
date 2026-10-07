import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { createClient } from "@supabase/supabase-js";

import { authOptions } from "@/app/lib/auth";
import PhoneForm from "./PhoneForm";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
);

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("name, email, picture, phone_number")
    .eq("id", session.user.id)
    .maybeSingle();

  if (error) {
    console.error("MY DATA ERROR:", error);
  }

  if (!user) {
    redirect("/cont");
  }

  return (
    <main className="min-h-screen bg-[#F8F5EE] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/cont"
          className="font-roboto text-sm font-medium text-gray-500 transition hover:text-mierealbastru"
        >
          ← Înapoi la cont
        </Link>

        <div className="mb-8 mt-8">
          <p className="font-roboto text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
            Mierea Casei
          </p>

          <h1 className="mt-2 font-playfair text-3xl font-bold text-mierealbastru sm:text-4xl">
            Datele mele
          </h1>

          <p className="mt-2 font-roboto text-sm text-gray-500">
            Gestionează datele asociate contului tău.
          </p>
        </div>

        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
          {/* PROFIL GOOGLE */}

          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
            {user.picture ? (
              <img
                src={user.picture}
                alt=""
                className="h-14 w-14 rounded-full"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F8F5EE] font-playfair text-xl font-bold text-mierealbastru">
                {user.name?.charAt(0)?.toUpperCase()}
              </div>
            )}

            <div>
              <h2 className="font-playfair text-xl font-bold text-mierealbastru">
                {user.name}
              </h2>

              <p className="mt-1 font-roboto text-sm text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          {/* DATE */}

          <div className="mt-7 space-y-6">
            <div>
              <label className="mb-2 block font-roboto text-xs font-bold uppercase tracking-wide text-gray-400">
                Nume și prenume
              </label>

              <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-roboto text-sm text-gray-700">
                {user.name}
              </div>
            </div>

            <div>
              <label className="mb-2 block font-roboto text-xs font-bold uppercase tracking-wide text-gray-400">
                Email
              </label>

              <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-roboto text-sm text-gray-700">
                {user.email}
              </div>

              <p className="mt-2 font-roboto text-xs text-gray-400">
                Emailul este asociat contului Google și nu poate fi modificat
                aici.
              </p>
            </div>

            <PhoneForm initialPhone={user.phone_number || ""} />
          </div>
        </div>
      </div>
    </main>
  );
}
